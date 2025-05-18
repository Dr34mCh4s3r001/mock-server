import { cn } from "@/lib/utils";
import { Editor } from "@monaco-editor/react";

interface EndpointCodeEditorProps {
  editorMargin: string;
}

const JSON_EXAMPLE = {
  $schema: "../schema/flow-schema.json",
  info: {
    name: "Example Flow",
  },
  nodes: [
    {
      id: "GetOTPRequest",
      node: "httpRequest",
      type: "start",
      path: "/otp/new",
      next: "ShowStart",
    },
    {
      id: "ShowStart",
      node: "messageNode",
      type: "action",
      message: "Test Json flow",
      next: "NextStep",
    },
    {
      id: "NextStep",
      node: "messageNode",
      type: "action",
      message: "Second Action",
    },
  ],
};

export default function EndpointCodeEditor({
  editorMargin,
}: EndpointCodeEditorProps) {
  return (
    <div className="h-screen bg-white">
      <div className="h-full w-full" style={{ marginTop: editorMargin }}>
        <Editor
          defaultLanguage="json"
          defaultValue={JSON.stringify(JSON_EXAMPLE, null, 2)}
        />
      </div>
    </div>
  );
}
