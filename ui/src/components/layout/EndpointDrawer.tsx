interface EndpointDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function EndpointDrawer({ isOpen }: EndpointDrawerProps) {
  return (
    <aside
      className={`drawer ${isOpen ? "drawer-open" : ""}
    `}
    >
      {/* Drawer content */}
      {isOpen && (
        <div className="p-4">
          <p>Drawer content here</p>
        </div>
      )}
    </aside>
  );
}
