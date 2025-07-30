import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, page, perPage, repo } from "../shared.ts";
import outputSchema from "./listBranches.json" with { type: "json" };

export const listBranches = defineGitHubBlock({
  name: "List branches",
  description: "Lists branches from a repository with paginated results",
  category: "Branches",
  url: "GET /repos/{owner}/{repo}/branches",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    page,
    perPage,
  },
});
