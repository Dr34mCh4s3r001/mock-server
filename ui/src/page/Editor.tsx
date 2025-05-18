import EndpointCodeEditor from "@/components/endpoint/EndpointCodeEditor";
import EndpointVisual from "@/components/endpoint/EndpointVisual";
import EditorNavigator from "@/components/layout/EditorNavigator";
import EndpointDrawer from "@/components/layout/EndpointDrawer";
import NodeToolboxDrawer from "@/components/layout/NodeToolbarDrawer";
import { useState } from "react";

export type LayoutType = "visual" | "code";

export default function Editor() {
  const [isEndpointDrawerOpen, setIsEndpointDrawerOpen] =
    useState<boolean>(false);

  const [isNodeToolBoxDrawerOpen, setIsNodeToolBoxDrawer] =
    useState<boolean>(false);

  const [selectedLayoutType, setSelectedLayoutType] =
    useState<LayoutType>("visual");

  const toggleEndpointDrawer = () => {
    setIsEndpointDrawerOpen(!isEndpointDrawerOpen);
  };

  const toggleNodeToolBoxDrawer = () => {
    setIsNodeToolBoxDrawer(!isNodeToolBoxDrawerOpen);
  };

  const renderLayout = () => {
    switch (selectedLayoutType) {
      case "visual":
        return <EndpointVisual />;
      case "code":
        return <EndpointCodeEditor editorMargin="25" />;
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Endpoint */}
      <EndpointDrawer
        isOpen={isEndpointDrawerOpen}
        toggle={toggleEndpointDrawer}
      />

      {/* Main Content */}
      <div className="main-container relative">
        <EditorNavigator
          className="absolute top-0 left-0 z-50 w-full h-25"
          isEndpointDrawerOpen={isEndpointDrawerOpen}
          toggleEndpointDrawer={toggleEndpointDrawer}
          isNodeToolBoxDrawerOpen={isNodeToolBoxDrawerOpen}
          toggleNodeToolBoxDrawer={toggleNodeToolBoxDrawer}
          selectedLayoutType={selectedLayoutType}
          setSelectedLayoutType={setSelectedLayoutType}
        />
        {renderLayout()}
        {/* Your editor content here */}
      </div>

      {/* Tool box */}
      <NodeToolboxDrawer
        isOpen={isNodeToolBoxDrawerOpen}
        toggle={toggleNodeToolBoxDrawer}
      />
    </div>
  );
}
