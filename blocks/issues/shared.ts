import { defineGitHubInputConfig } from "../../utils/defineGitHubBlock.ts";

export const commentBody = defineGitHubInputConfig({
  name: "Comment body",
  description: "The contents of the comment",
  type: "string",
  required: true,
  apiRequestFieldKey: "body",
});

export const title = defineGitHubInputConfig({
  name: "Issue title",
  description: "The title of the issue",
  type: "string",
  required: true,
  apiRequestFieldKey: "title",
});

export const body = defineGitHubInputConfig({
  name: "Issue body",
  description: "The contents of the issue",
  type: "string",
  required: false,
  apiRequestFieldKey: "body",
});
