import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";
import outputSchema from "./getCommit.json" with { type: "json" };

export const getCommit = defineGitHubBlock({
  name: "Get commit",
  description: "Get a specific commit by its SHA",
  category: "Commits",
  url: "GET /repos/{owner}/{repo}/commits/{ref}",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    ref: {
      name: "Reference",
      description:
        "The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`).",
      type: "string",
      required: true,
      apiRequestFieldKey: "ref",
    },
  },
});
