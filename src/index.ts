import { ActionNode } from "./node/action-node";
import { FlowExecutor } from "./node/flow-executor";
import { IfNode } from "./node/if-node";
import { WorkFlowNode } from "./node/node";

const nodes: Record<string, WorkFlowNode> = {
  start: new ActionNode("start", "action", "checkAge"),
  checkAge: new IfNode(
    "checkAge",
    ["adultAction", "kidAction"],
    (ctx) => ctx.age >= 18
  ),
  adultAction: new ActionNode("adultAction", "action", "end", async (ctx) => {
    console.log("You are an adult");
  }),
  kidAction: new ActionNode("kidAction", "action", "end", async (ctx) => {
    console.log("You are a kid");
  }),
  end: new ActionNode("end", "end", undefined, async (ctx) => {
    console.log("End of flow");
  }),
};

async function bootstrap() {
  const flow = new FlowExecutor(nodes, "start");
  await flow.run({ age: 20 });

  const flow2 = new FlowExecutor(nodes, "start");
  await flow2.run({ age: 10 });
}

bootstrap();
