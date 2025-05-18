import { NODE_TOOL } from "@/data";
import NodeItem from "../node/NodeItem";

interface NodeToolboxDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function NodeToolboxDrawer({ isOpen }: NodeToolboxDrawerProps) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      className={`drawer ${isOpen ? "drawer-open" : ""}
    `}
    >
      <div className="p-4">
        <h2 className="font-semibold">Node toolbox</h2>
      </div>

      {NODE_TOOL.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          <NodeItem
            title={node.title}
            description={node.description}
            icon={node.icon}
          ></NodeItem>
        </div>
      ))}
    </aside>
  );
}
