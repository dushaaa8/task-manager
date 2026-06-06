import {
  TASK_PRIORITY_FILTER_OPTIONS,
  TASK_SORT_OPTIONS,
  TASK_TAB_COUNT_KEYS,
  TASK_TABS,
  type TaskTabCounts,
  type TaskTabId,
} from "../../constants/taskConfig";
import Selector from "../ui/Selector";

interface Props {
  activeTab: TaskTabId;
  counts: TaskTabCounts;
  sortValue: string;
  selectedPriority: string;
  onTabChange: (tab: TaskTabId) => void;
  onSortChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function TasksToolbar({
  activeTab,
  counts,
  sortValue,
  selectedPriority,
  onTabChange,
  onSortChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="mb-8 pt-40 flex h-20 w-full gap-10 lg:pt-0 lg:items-end flex-col-reverse lg:gap-0 lg:justify-between lg:flex-row">
      <div className="flex gap-7 lg:gap-8 border-b border-gray-200">
        {TASK_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts[TASK_TAB_COUNT_KEYS[tab.id]];

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex cursor-pointer items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                isActive
                  ? "border-primary-blue text-primary-blue"
                  : "border-transparent text-secondary-gray"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs ${
                  isActive
                    ? "bg-blue-50 text-primary-blue"
                    : "bg-gray-100 text-secondary-gray"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex w-100 gap-10">
        <div className="w-1/2">
          <Selector
            label="Choose sort option"
            options={[...TASK_SORT_OPTIONS]}
            value={sortValue}
            onChange={onSortChange}
          />
        </div>
        <div className="w-1/2">
          <Selector
            label="Filter by Priority"
            placeholder="Select priority"
            options={TASK_PRIORITY_FILTER_OPTIONS}
            value={selectedPriority}
            onChange={onPriorityChange}
          />
        </div>
      </div>
    </div>
  );
}
