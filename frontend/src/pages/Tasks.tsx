import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyTasksPlaceholder from "../components/layout/EmptyTasksPlaceholder";
import TasksNotFound from "../components/tasks/TasksNotFound";
import TasksPageHeader from "../components/tasks/TasksPageHeader";
import TasksToolbar from "../components/tasks/TasksToolbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { TaskFormModal } from "../components/ui/TaskFormModal";
import TaskItem from "../components/ui/TaskItem";
import { TASK_PRIORITY_FILTER_OPTIONS } from "../constants/taskConfig";
import { useCreateTask } from "../hooks/useTaskMutation";
import { useTasksList } from "../hooks/useTasks";
import type { TaskFormData } from "../types";

export const Tasks = () => {
  const {
    activeTab,
    setActiveTab,
    sortValue,
    setSortValue,
    counts,
    displayedTasks,
    isLoading,
    isAbsolutelyEmpty,
  } = useTasksList();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedPriority, setSelectedPriority] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createMutation = useCreateTask();

  const priorityLabel = useMemo(
    () =>
      TASK_PRIORITY_FILTER_OPTIONS.find(
        (option) => option.value === selectedPriority,
      )?.label,
    [selectedPriority],
  );

  const filteredTasks = useMemo(
    () =>
      displayedTasks.filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesPriority = selectedPriority
          ? task.priority === selectedPriority
          : true;

        return matchesSearch && matchesPriority;
      }),
    [displayedTasks, searchQuery, selectedPriority],
  );

  const handleFormSubmit = (data: TaskFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const taskFormModal = (
    <TaskFormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleFormSubmit}
      isLoading={createMutation.isPending}
    />
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAbsolutelyEmpty) {
    return (
      <>
        <EmptyTasksPlaceholder modalFunction={setIsModalOpen} />
        {taskFormModal}
      </>
    );
  }

  const showEmptyCategory = displayedTasks.length === 0;
  const showEmptyFilters = !showEmptyCategory && filteredTasks.length === 0;

  return (
    <div className="min-h-screen p-6 lg:p-12">
      <TasksPageHeader onCreateClick={() => setIsModalOpen(true)} />
      {taskFormModal}

      <TasksToolbar
        activeTab={activeTab}
        counts={counts}
        sortValue={sortValue}
        selectedPriority={selectedPriority}
        onTabChange={setActiveTab}
        onSortChange={setSortValue}
        onPriorityChange={setSelectedPriority}
      />

      {showEmptyCategory || showEmptyFilters ? (
        <TasksNotFound
          searchQuery={showEmptyFilters ? searchQuery : undefined}
          priorityLabel={showEmptyFilters ? priorityLabel : undefined}
        />
      ) : (
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-5">
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              id={task.id}
              index={index + 1}
              title={task.title}
              status={task.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};
