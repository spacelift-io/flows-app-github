import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, issueNumber } from "../shared.ts";
import outputSchema from "./createIssueComment.json" with { type: "json" };
import { commentBody } from "./shared.ts";

export const createIssueComment = defineGitHubBlock({
  name: "Create issue comment",
  description: "Creates a comment on an issue or pull request",
  category: "Issues",
  url: "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    issueNumber,
    body: commentBody,
  },
});
