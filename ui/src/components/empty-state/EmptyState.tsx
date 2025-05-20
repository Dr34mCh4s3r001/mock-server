interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-full">
      <img src={icon} width="300px" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
    </div>
  );
}
