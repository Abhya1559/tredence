export const mockAutomation = [
  { id: "send_email", label: "Send Email", params: ["to", "subject", "body"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
];

export const getAutomation = () => Promise.resolve(mockAutomation);
