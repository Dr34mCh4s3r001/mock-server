import type { HttpMethod } from '@/data';
import EndpointItemLabel from './EndpointItemLabel';
import { cn } from '@/lib/utils';

interface EndpointItemProps {
  method: HttpMethod;
  path: string;
  onSelect: () => void;
  active: boolean;
}

export default function EndpointItem({
  method,
  path,
  onSelect,
  active = false,
}: EndpointItemProps) {
  return (
    <div
      className={cn(
        'flex px-4 py-2 space-x-2 cursor-pointer hover:bg-gray-50',
        active && 'bg-blue-100 font-semibold',
      )}
      onClick={onSelect}
    >
      <EndpointItemLabel method={method} path={path}></EndpointItemLabel>
    </div>
  );
}
