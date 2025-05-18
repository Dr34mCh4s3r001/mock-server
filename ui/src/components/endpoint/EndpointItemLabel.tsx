import type { HttpMethod } from "@/data";
import { cn } from "@/lib/utils";

interface EndpointItemLabelProps {
  method: HttpMethod;
  path: string;
}

export const methodColorMap: Record<HttpMethod, string> = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-yellow-500",
  DELETE: "text-red-500",
};

export default function EndpointItemLabel({
  method,
  path,
}: EndpointItemLabelProps) {
  return (
    <>
      <p
        className={cn(
          methodColorMap[method],
          "text-sm",
          "font-semibold",
          "me-2"
        )}
      >
        {method}
      </p>
      <p className="text-sm text-muted-foreground">{path}</p>
    </>
  );
}
