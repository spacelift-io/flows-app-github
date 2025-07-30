import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, issueNumber, stateUpdate } from "../shared.ts";
import outputSchema from "./updateIssue.json" with { type: "json" };
import { title, body } from "./shared.ts";

export const updateIssue = defineGitHubBlock({
  name: "Update issue",
  description: "Update an existing issue",
  category: "Issues",
  url: "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    issueNumber,
    title,
    body,
    state: stateUpdate,
    assignees: {
      name: "Assignees",
      description:
        "Usernames to assign to this issue. Pass one or more user logins to replace the set of assignees on this issue. Send an empty array to clear all assignees from the issue",
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
      description:
        "Labels to associate with this issue. Pass one or more labels to replace the set of labels on this issue. Send an empty array to clear all labels from the issue.",
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
      description:
        "The number of the milestone to associate this issue with or use `null` to remove the current milestone",
      type: {
        anyOf: [
          {
            type: "number",
          },
          {
            type: "null",
          },
        ],
      },
      required: false,
      apiRequestFieldKey: "milestone",
    },
  },
});
