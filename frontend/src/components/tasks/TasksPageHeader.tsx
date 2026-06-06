import Button from "../ui/Button";

interface Props {
  onCreateClick: () => void;
}

export default function TasksPageHeader({ onCreateClick }: Props) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-primary-dark-blue">Tasks</h1>
        <p className="text-secondary-gray">Your tasks in your space.</p>
      </div>
      <Button onClick={onCreateClick}>Create Task</Button>
    </div>
  );
}
