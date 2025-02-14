export const configTaskDeleteMod = {
  match: /pravovaporada\.keycrm\.app/,
  observedNodeSelector: "body",
  checkTrigger: (node: HTMLElement) => {
    return node instanceof HTMLElement && node.id === "tab-task-comments";
  },
};

export const config = {
  globalMatches: ["*://pravovaporada.keycrm.app/*"],
};
