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

  // Wrap the data in Promise.resolve() to mimic an API response
  return Promise.resolve(mockActions);
};

// NOTE: You do not need the 'getAutomation' export if you use the structure above.
