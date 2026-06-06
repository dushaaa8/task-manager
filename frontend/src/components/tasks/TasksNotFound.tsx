import NoTasksFoundIcon from "../ui/icons/NoTasksFoundIcon";

interface Props {
  searchQuery?: string;
  priorityLabel?: string;
}

export default function TasksNotFound({ searchQuery, priorityLabel }: Props) {
  const hasFilters = Boolean(searchQuery || priorityLabel);

  return (
    <div className="flex flex-col items-center justify-center pt-12 text-center">
      <NoTasksFoundIcon />
      <h2 className="mb-2 text-2xl font-bold text-primary-dark-blue">
        No tasks found
      </h2>
      <p className="text-secondary-gray">
        {hasFilters ? (
          <>
            We couldn&apos;t find any tasks matching your filters
            {searchQuery && (
              <>
                {" "}
                for <strong className="text-primary-dark-blue">&quot;{searchQuery}&quot;</strong>
              </>
            )}
            {priorityLabel && (
              <>
                {searchQuery ? " and" : " with"} priority{" "}
                <strong className="text-primary-dark-blue">{priorityLabel}</strong>
              </>
            )}
            .
          </>
        ) : (
          "No tasks found in this category."
        )}
      </p>
    </div>
  );
}
