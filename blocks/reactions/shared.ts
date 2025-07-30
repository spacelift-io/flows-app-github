import { defineGitHubInputConfig } from "../../utils/defineGitHubBlock";

export const contentType = defineGitHubInputConfig({
  name: "Content type",
  description:
    "The type of content to delete reaction from: `issue` (includes pull requests) or `issue-comment` (includes pull-request comments).",
  type: {
    enum: ["issue", "issue-comment"],
  },
  required: true,
});

export const contentId = defineGitHubInputConfig({
  name: "Content ID",
  description:
    "The numeric ID of the issue/pull request or issue/pull-request comment.",
  type: "number",
  required: true,
});
