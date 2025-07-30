import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, pullNumber } from "../shared.ts";

export const getPullRequestDiff = defineGitHubBlock({
  name: "Get pull request diff",
  description: "Get the diff for a specific pull request",
  category: "Pull requests",
  url: "GET /repos/{owner}/{repo}/pulls/{pull_number}",
  headers: {
    accept: "application/vnd.github.diff",
  },
  outputJsonSchema: {
    type: "string",
    description: "The diff content as a string",
  },
  inputConfig: {
    owner,
    repo,
    pullNumber,
  },
});
