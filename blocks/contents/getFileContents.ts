import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";
import outputSchema from "./getFileContents.json" with { type: "json" };
import { path } from "./shared.ts";

export const getFileContents = defineGitHubBlock({
  name: "Get file contents",
  description: "Get contents of a file from a repository",
  category: "Contents",
  url: "GET /repos/{owner}/{repo}/contents/{path}",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    path,
    ref: {
      name: "Reference",
      description:
        "The name of the commit/branch/tag. Default: the repository's default branch.",
      type: "string",
      required: false,
      apiRequestFieldKey: "ref",
    },
  },
});
