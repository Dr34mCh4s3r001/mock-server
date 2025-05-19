import { exampleJson, generateFromJson, generateNodes } from "./generator/json-flow-spec";
import { router as httpReqFlowRouter } from "./http-req-flow-routes";
import { ActionNode } from "./node/action-node";
import { FlowExecutor } from "./node/flow-executor";
import { HttpRequestNode } from "./node/http-request-node";
import { HttpResponseNode } from "./node/http-response-node";
import { IfNode } from "./node/if-node";
import { WorkFlowNode } from "./node/node";

// const nodes: Record<string, WorkFlowNode> = {
//   start: new ActionNode("start", "action", "checkAge"),
//   checkAge: new IfNode(
//     "checkAge",
//     ["adultAction", "kidAction"],
//     (ctx) => ctx.age >= 18
//   ),
//   adultAction: new ActionNode("adultAction", "action", "end", async (ctx) => {
//     console.log("You are an adult");
//   }),
//   kidAction: new ActionNode("kidAction", "action", "end", async (ctx) => {
//     console.log("You are a kid");
//   }),
//   end: new HttpResponseNode("end", {
//     status: 200,
//     test: 700,
//   }),
// };

// async function bootstrap() {
//   const flow = new FlowExecutor(nodes, "start");
//   const result = await flow.run({ age: 20 });
//   console.log(result);

//   const flow2 = new FlowExecutor(nodes, "start");
//   const result2 = await flow2.run({ age: 10 });
//   console.log(result2);
// }

// bootstrap();

function createTestHttpNodes(req: Request): Record<string, WorkFlowNode> {
  return {
    start: new HttpRequestNode("start", "checkAge", req),
    checkAge: new IfNode(
      "checkAge",
      ["adultAction", "kidAction"],
      (ctx) => ctx.http.request.params.age >= 18
    ),
    adultAction: new ActionNode("adultAction", "action", "end", async (ctx) => {
      ctx.message = "You are an adult";
    }),
    kidAction: new ActionNode("kidAction", "action", "end", async (ctx) => {
      ctx.message = "You are a kid";
    }),
    end: new HttpResponseNode("end", (ctx) => {
      return {
        message: ctx.message,
      } as any;
    }),
  };
}
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// middleware
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/mock/age/:age", async (req: Request, res: Response) => {
  const age = req.params.age;
  const nodes = createTestHttpNodes(req);
  const flow = new FlowExecutor(nodes, "start");
  const result = await flow.run();
  res.send(result);
});

app.get("/test", async (req: Request, res: Response) => {
  const nodes = generateNodes(exampleJson)(req)
  const flow = new FlowExecutor(nodes, exampleJson.nodes.find(n => n.type === 'start')!.id);
  const result = await flow.run();
  res.send('ok')
})

app.get("/test_json", async (req: Request, res: Response) => {
  const nodes = generateFromJson("./flow/example.json")(req)
  const flow = new FlowExecutor(nodes, exampleJson.nodes.find(n => n.type === 'start')!.id);
  const result = await flow.run();
  res.send('ok')
})

app.use("/", httpReqFlowRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
