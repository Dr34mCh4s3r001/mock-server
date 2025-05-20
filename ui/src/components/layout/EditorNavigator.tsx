import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, Puzzle, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import type { LayoutType } from "@/page/Editor";
import type { Endpoint } from "@/data";
import EndpointItemLabel from "../endpoint/EndpointItemLabel";

interface EditorNavigatorProps {
  className?: string;
  isEndpointDrawerOpen: boolean;
  toggleEndpointDrawer: () => void;
  isNodeToolBoxDrawerOpen: boolean;
  toggleNodeToolBoxDrawer: () => void;
  selectedLayoutType: LayoutType;
  setSelectedLayoutType: (layoutType: LayoutType) => void;
  selectedEndpoint: Endpoint | null;
}

export default function EditorNavigator({
  className,
  isEndpointDrawerOpen,
  toggleEndpointDrawer,
  isNodeToolBoxDrawerOpen,
  toggleNodeToolBoxDrawer,
  selectedLayoutType,
  setSelectedLayoutType,
  selectedEndpoint,
}: EditorNavigatorProps) {
  return (
    <nav className={cn("bg-transparent text-white p-4", className)}>
      <div className="flex justify-between items-center">
        {/* Endpoint bar */}
        <div className="menu-bar">
          <Button variant="outline" size="icon" onClick={toggleEndpointDrawer}>
            {isEndpointDrawerOpen ? <X /> : <Menu />}
          </Button>
          {selectedEndpoint && (
            <EndpointItemLabel
              method={selectedEndpoint.method}
              path={selectedEndpoint.path}
            />
          )}
        </div>

        <div className="flex-1"></div>

        {/* Layout selector */}
        {selectedEndpoint && (
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
        )}

        <div className="flex-1"></div>

        {/* Menu bar */}
        {selectedEndpoint && (
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
        )}
      </div>
    </nav>
  );
}
