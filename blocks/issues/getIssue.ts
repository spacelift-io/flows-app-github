import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, issueNumber } from "../shared.ts";
import outputSchema from "./getIssue.json" with { type: "json" };

export const getIssue = defineGitHubBlock({
  name: "Get issue",
  description: "Get a specific issue by its number",
  category: "Issues",
  url: "GET /repos/{owner}/{repo}/issues/{issue_number}",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    issueNumber,
  },
});
