import { defineGitHubInputConfig } from "../../utils/defineGitHubBlock";

export const message = defineGitHubInputConfig({
  name: "Commit message",
  description: "The commit message",
  type: "string",
  required: true,
});

export const branch = defineGitHubInputConfig({
  name: "Branch",
  description: "The branch to commit to (default: repository's default branch)",
  type: "string",
  required: false,
});

export const committerName = defineGitHubInputConfig({
  name: "Committer name",
  description: "The name of the person that pushed the commit",
  type: "string",
  required: false,
});

export const committerEmail = defineGitHubInputConfig({
  name: "Committer email",
  description: "The email of the person that pushed the commit",
  type: "string",
  required: false,
});

export const authorName = defineGitHubInputConfig({
  name: "Author name",
  description: "The name of the author of the commit",
  type: "string",
  required: false,
});

export const authorEmail = defineGitHubInputConfig({
  name: "Author email",
  description: "The email of the author of the commit",
  type: "string",
  required: false,
});

export const path = defineGitHubInputConfig({
  name: "Path",
  description: "The path to the file within the repository",
  type: "string",
  required: true,
  apiRequestFieldKey: "path",
});
