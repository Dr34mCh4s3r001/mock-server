import { Puzzle } from "lucide-react";
import NodeItem from "../node/NodeItem";

interface NodeToolboxDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

interface NodeTool {
  icon: React.ReactNode;
  title: string;
  type: string;
  description: string;
}

const NODE_TOOL: NodeTool[] = [
  {
    icon: <Puzzle />,
    title: "Input",
    type: "input",
    description: "Data received for processing in this node",
  },
  {
    icon: <Puzzle />,
    title: "Output",
    type: "output",
    description: "Data produced after processing by this node",
  },
];

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

      {/* Drawer content */}
      {NODE_TOOL.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          <NodeItem
            // key={type}
            title={node.title}
            description={node.description}
            icon={node.icon} // Pass the Puzzle icon as a prop
          ></NodeItem>
        </div>
      ))}
    </aside>
  );
}
