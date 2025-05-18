import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, Puzzle, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import type { LayoutType } from "@/page/Editor";

interface EditorNavigatorProps {
  className?: string;
  isEndpointDrawerOpen: boolean;
  toggleEndpointDrawer: () => void;
  isNodeToolBoxDrawerOpen: boolean;
  toggleNodeToolBoxDrawer: () => void;
  selectedLayoutType: LayoutType;
  setSelectedLayoutType: (layoutType: LayoutType) => void;
}

export default function EditorNavigator({
  className,
  isEndpointDrawerOpen,
  toggleEndpointDrawer,
  isNodeToolBoxDrawerOpen,
  toggleNodeToolBoxDrawer,
  selectedLayoutType,
  setSelectedLayoutType,
}: EditorNavigatorProps) {
  return (
    <nav className={cn("bg-transparent text-white p-4", className)}>
      <div className="flex justify-between items-center">
        {/* Endpoint bar */}
        <div className="menu-bar">
          <Button variant="outline" size="icon" onClick={toggleEndpointDrawer}>
            {isEndpointDrawerOpen ? <X /> : <Menu />}
          </Button>
          <div className="space-x-2 flex text-sm">
            <p className="text-green-300">GET</p>
            <p>title</p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Layout selector */}
        <div className="menu-bar">
          <Tabs
            defaultValue={selectedLayoutType}
            onValueChange={(value) =>
              setSelectedLayoutType(value as LayoutType)
            }
          >
            <TabsList>
              <TabsTrigger value="visual">Visual</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1"></div>

        {/* Menu bar */}
        <div className="menu-bar">
          <Button>Save</Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleNodeToolBoxDrawer}
          >
            {isNodeToolBoxDrawerOpen ? <X /> : <Puzzle />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
