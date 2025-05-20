import React from 'react';

interface NodeItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function NodeItem({ icon, title, description }: NodeItemProps) {
  return (
    <div className="flex px-4 py-2 cursor-pointer hover:bg-gray-50">
      <div className="flex items-center mr-4">{icon}</div>
      <div className="flex-1 flex flex-col">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
