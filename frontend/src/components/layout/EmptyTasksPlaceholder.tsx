import Button from "../ui/Button";
import NoTasksFoundIcon from "../ui/icons/NoTasksFoundIcon";

export default function EmptyTasksPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col bg-main-background-gray p-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-primary-dark-blue">
          Tasks
        </h1>
        <p className="text-secondary-gray">Your tasks in your space.</p>
      </div>
      <div className="flex flex-1 flex-col items-center pt-20 text-center">
        <NoTasksFoundIcon />
        <h2 className="mb-3 mt-10 text-2xl font-bold text-primary-dark-blue">
          No Tasks Yet
        </h2>
        <p className="mb-8 max-w-sm text-secondary-gray">
          You have no task created in your workspace yet. Get productive. Create
          a Task Now.
        </p>
      </div>
      <Button size="xl">Create task</Button>
    </div>
  );
}
