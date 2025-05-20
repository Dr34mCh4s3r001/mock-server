import EmptyState from './EmptyState';

export default function NoEndpointSelect() {
  return (
    <EmptyState
      icon="empty-state/no-endpoint-select.svg"
      title="No endpoint selected"
      description="Please select an endpoint from the sidebar to get started with your API exploration."
    />
  );
}
