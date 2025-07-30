import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";
import outputSchema from "./createIssue.json" with { type: "json" };
import { body, title } from "./shared.ts";

export const createIssue = defineGitHubBlock({
  name: "Create issue",
  description: "Creates a new issue in a repository",
  category: "Issues",
  url: "POST /repos/{owner}/{repo}/issues",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    title,
    body,
    assignees: {
      name: "Assignees",
      description: "The GitHub usernames to assign to the issue",
      type: {
        type: "array",
        items: {
          type: "string",
        },
      },
      required: false,
      apiRequestFieldKey: "assignees",
    },
    labels: {
      name: "Labels",
      description: "The labels to add to the issue",
      type: {
        type: "array",
        items: {
          type: "string",
        },
      },
      required: false,
      apiRequestFieldKey: "labels",
    },
    milestone: {
      name: "Milestone",
      description: "Milestone number to associate with the issue",
      type: "number",
      required: false,
      apiRequestFieldKey: "milestone",
    },
  },
});
