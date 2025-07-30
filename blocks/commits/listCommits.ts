import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, page, perPage, since, until } from "../shared.ts";
import outputSchema from "./listCommits.json" with { type: "json" };

export const listCommits = defineGitHubBlock({
  name: "List commits",
  description: "Lists commits from a repository with pagination support",
  category: "Commits",
  url: "GET /repos/{owner}/{repo}/commits",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    sha: {
      name: "SHA",
      description:
        "SHA or branch to start listing commits from. Default: the repository's default branch (usually `main`).",
      type: "string",
      required: false,
      apiRequestFieldKey: "sha",
    },
    path: {
      name: "Path",
      description: "Only commits containing this file path will be returned.",
      type: "string",
      required: false,
      apiRequestFieldKey: "path",
    },
    author: {
      name: "Author",
      description:
        "GitHub username or email address to filter by commit author.",
      type: "string",
      required: false,
      apiRequestFieldKey: "author",
    },
    since,
    until,
    page,
    perPage,
  },
});
