import { MOCK_ENDPOINT, type Endpoint } from "@/data";
import EndpointItem from "../endpoint/EndpointItem";

interface EndpointDrawerProps {
  isOpen: boolean;
  toggle: () => void;
  selectedEndpoint: Endpoint | null;
  setSelectedEndpoint: (endpoint: Endpoint | null) => void;
}

export default function EndpointDrawer({
  isOpen,
  selectedEndpoint,
  setSelectedEndpoint,
}: EndpointDrawerProps) {
  const isSelect = (selected: Endpoint | null, target: Endpoint) => {
    if (!selected) {
      return false;
    }

    const selectedPath = selected.method + selected.path;
    const targetPath = target.method + target.path;

    return selectedPath === targetPath;
  };

  return (
    <aside
      className={`drawer ${isOpen ? "drawer-open" : ""}
    `}
    >
      <div className="p-4">
        <h2 className="font-semibold">Endpoint</h2>
      </div>

      {MOCK_ENDPOINT.map((endpoint) => (
        <div key={endpoint.path}>
          <EndpointItem
            method={endpoint.method}
            path={endpoint.path}
            onSelect={() => setSelectedEndpoint(endpoint)}
            active={isSelect(selectedEndpoint, endpoint)}
          ></EndpointItem>
        </div>
      ))}
    </aside>
  );
}
