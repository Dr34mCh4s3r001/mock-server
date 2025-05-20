// import { NodeType, WorkFlowNode } from "../node";

// export class IfNode implements WorkFlowNode {
//   public readonly type: NodeType = "if";

//   constructor(
//     public id: string,
//     public next: [string, string], // [trueBranch, falseBranch]
//     private condition: (context: any) => boolean
//   ) {}

//   async evaluate(context: any): Promise<void> {
//     context.__branch = this.condition(context) ? 0 : 1;
//   }
// }
