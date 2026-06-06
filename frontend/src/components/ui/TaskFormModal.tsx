import { useEffect, useState } from "react";
import { TASK_FORM_PRIORITY_OPTIONS } from "../../constants/taskConfig";
import type { TaskFormData, TaskPriority } from "../../types";
import { formatDate } from "../../utils/formatDate";
import Button from "./Button";
import Calendar from "./Calendar";
import CalendarIcon from "./icons/CalendarIcon";
import ModalMenu from "./ModalMenu";
import Selector from "./Selector";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: TaskFormData;
  isLoading?: boolean;
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: Props) {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("low");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "");
      setPriority(initialData?.priority || "low");
      setDueDate(initialData?.dueDate || new Date().toISOString());
      setDescription(initialData?.description || "");
      setIsCalendarOpen(false);
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, priority, dueDate, description });
  };

  return (
    <ModalMenu
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit This Task." : "Create Task"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm text-secondary-gray">
            Task Name
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-primary-dark-blue outline-none transition-colors focus:border-primary-blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Selector
            onChange={setPriority}
            options={TASK_FORM_PRIORITY_OPTIONS}
            value={priority}
            label="Task Priority"
          />

          <div className="relative">
            <label className="mb-2 block text-sm text-secondary-gray">
              Due Date
            </label>

            <button
              type="button"
              onClick={() => setIsCalendarOpen((open) => !open)}
              className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary-dark-blue transition-colors hover:border-primary-blue"
            >
              <span className="font-semibold">{formatDate(dueDate)}</span>
              <CalendarIcon />
            </button>

            {isCalendarOpen && (
              <div className="absolute top-full -right-5 z-50 mt-2 w-max rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Calendar
                  onDateSelect={(date: Date) => {
                    setDueDate(date.toISOString());
                    setIsCalendarOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-secondary-gray">
            Task Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type your content here..."
            className="h-32 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-primary-dark-blue outline-none transition-colors focus:border-primary-blue"
          />
        </div>

        <div className="mt-2">
          <Button type="submit" disabled={isLoading} className="w-1/2">
            {isLoading ? "Saving..." : isEditMode ? "Save Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </ModalMenu>
  );
}

export type { TaskFormData };
