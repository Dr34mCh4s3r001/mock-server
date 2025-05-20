"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmptyState;
function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-full">
      <img src={icon} width="300px" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
    </div>
  );
}
