import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import {
  owner,
  repo,
  stateFilter,
  since,
  sort,
  direction,
  page,
  perPage,
} from "../shared.ts";
import outputSchema from "./listIssues.json" with { type: "json" };

export const listIssues = defineGitHubBlock({
  name: "List issues",
  description: "Lists issues from a repository with pagination support",
  category: "Issues",
  outputJsonSchema: outputSchema as any,
  url: "GET /repos/{owner}/{repo}/issues",
  inputConfig: {
    owner,
    repo,
    state: stateFilter,
    labels: {
      name: "Labels",
      description:
        "A list of comma separated label names. Example: `bug,ui,@high`.",
      type: "string",
      required: false,
    },
    assignee: {
      name: "Assignee",
      description:
        "Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user.",
      type: "string",
      required: false,
    },
    creator: {
      name: "Creator",
      description: "The user that created the issue.",
      type: "string",
      required: false,
    },
    mentioned: {
      name: "Mentioned",
      description: "A user that's mentioned in the issue",
      type: "string",
      required: false,
    },
    since,
    sort,
    direction,
    page,
    perPage,
  },
});
