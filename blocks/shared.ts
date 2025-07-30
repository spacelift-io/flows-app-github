import { defineGitHubInputConfig } from "../utils/defineGitHubBlock";

export const repo = defineGitHubInputConfig({
  name: "Repository",
  description:
    "The name of the repository without the `.git` extension. The name is not case sensitive.",
  type: "string",
  required: true,
  apiRequestFieldKey: "repo",
});

export const owner = defineGitHubInputConfig({
  name: "Owner",
  description:
    "The account owner of the repository. The name is not case sensitive.",
  type: "string",
  required: true,
  apiRequestFieldKey: "owner",
});

export const page = defineGitHubInputConfig({
  name: "Page",
  description: "The page number of the results to fetch (default: 1)",
  type: "number",
  required: false,
  apiRequestFieldKey: "page",
});

export const perPage = defineGitHubInputConfig({
  name: "Per page",
  description: "Number of results per page (default: 30, max: 100)",
  type: "number",
  required: false,
  apiRequestFieldKey: "per_page",
});

export const pullNumber = defineGitHubInputConfig({
  name: "Pull request number",
  description: "The number of the pull request",
  type: "number",
  required: true,
  apiRequestFieldKey: "pull_number",
});

export const issueNumber = defineGitHubInputConfig({
  name: "Issue number",
  description: "The number of the issue",
  type: "number",
  required: true,
  apiRequestFieldKey: "issue_number",
});

export const since = defineGitHubInputConfig({
  name: "Since",
  description: "Only items after this date will be returned (ISO 8601 format).",
  type: "string",
  required: false,
  apiRequestFieldKey: "since",
});

export const until = defineGitHubInputConfig({
  name: "Until",
  description:
    "Only items before this date will be returned (ISO 8601 format).",
  type: "string",
  required: false,
  apiRequestFieldKey: "until",
});

export const stateFilter = defineGitHubInputConfig({
  name: "State",
  description: "State to filter by (open, closed, all)",
  type: {
    enum: ["open", "closed", "all"],
  },
  required: false,
  apiRequestFieldKey: "state",
});

export const stateUpdate = defineGitHubInputConfig({
  name: "State",
  description: "State to set (open, closed)",
  type: {
    enum: ["open", "closed"],
  },
  required: false,
  apiRequestFieldKey: "state",
});

export const sort = defineGitHubInputConfig({
  name: "Sort",
  description:
    "What to sort results by (created, updated, comments; default: created).",
  type: {
    enum: ["created", "updated", "comments"],
  },
  required: false,
  apiRequestFieldKey: "sort",
});

export const direction = defineGitHubInputConfig({
  name: "Direction",
  description:
    "The direction to sort the results by (asc or desc; default: desc).",
  type: {
    enum: ["asc", "desc"],
  },
  required: false,
  apiRequestFieldKey: "direction",
});
