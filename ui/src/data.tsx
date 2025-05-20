import { CircleSmall, Play } from 'lucide-react';

export interface NodeTool {
  icon: React.ReactNode;
  title: string;
  type: string;
  description: string;
}

export const NODE_TOOL: NodeTool[] = [
  {
    icon: <Play />,
    title: 'Input',
    type: 'input',
    description: 'Data received for processing in this node',
  },
  {
    icon: <CircleSmall />,
    title: 'Output',
    type: 'output',
    description: 'Data produced after processing by this node',
  },
];

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Endpoint {
  method: HttpMethod;
  path: string;
}

export const MOCK_ENDPOINT: Endpoint[] = [
  {
    method: HttpMethod.GET,
    path: '/api/data',
  },
  {
    method: HttpMethod.POST,
    path: '/api/data',
  },
  {
    method: HttpMethod.DELETE,
    path: '/api/data/:id',
  },
];
