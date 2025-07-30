import { defineGitHubBlockConfig } from "../../utils/defineGitHubBlock";

export const owner = defineGitHubBlockConfig({
  name: "Owner",
  description:
    "The account owner of the repository. The name is not case sensitive. Leave empty for all repositories.",
  type: "string",
  required: false,
});

export const repo = defineGitHubBlockConfig({
  name: "Repository",
  description:
    "The name of the repository without the `.git` extension. The name is not case sensitive. Leave empty for all repositories.",
  type: "string",
  required: false,
});

export const labels = defineGitHubBlockConfig({
  name: "Labels",
  description:
    "List of labels to filter by. Leave empty for all PRs regardless of labels.",
  type: {
    type: "array",
    items: {
      type: "string",
    },
  },
  required: false,
});
