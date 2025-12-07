export const simulateWorkFlow = (workflowGraph: {
  nodes: any[];
  edges: any[];
}) => {
  const log = [
    {
      step: 1,
      type: "Start",
      message: `Workflow started: ${
        workflowGraph.nodes.find((n) => n.type === "StartNode")?.data.title
      }`,
    },
    {
      step: 2,
      type: "Task",
      message: `Task 'Collect Documents' assigned to HR Admin.`,
    },
    {
      step: 3,
      type: "Approval",
      message: `Awaiting approval from Manager role.`,
    },
    { step: 4, type: "System", message: `Automated step: Email sent to user.` },
    { step: 5, type: "End", message: `Workflow completed successfully.` },
  ];
  return Promise.resolve({ success: true, log });
};
