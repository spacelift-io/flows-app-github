import { defineGitHubInputConfig } from "../../utils/defineGitHubBlock.ts";

export const title = defineGitHubInputConfig({
  name: "Title",
  description: "The title of the pull request",
  type: "string",
  required: true,
  apiRequestFieldKey: "title",
});

export const body = defineGitHubInputConfig({
  name: "Body",
  description: "The contents of the pull request",
  type: "string",
  required: false,
  apiRequestFieldKey: "body",
});

export const base = defineGitHubInputConfig({
  name: "Base",
  description:
    "The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.",
  type: "string",
  required: false,
  apiRequestFieldKey: "base",
});
