interface AutomationAction {
  id: string;
  label: string;
  params: string[]; // List of parameter names (e.g., "to", "subject")
}

export const getMockAutomations = (): Promise<AutomationAction[]> => {
  const mockActions: AutomationAction[] = [
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject", "body"],
    },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"],
    },
  ];

  return Promise.resolve(mockActions);
};
