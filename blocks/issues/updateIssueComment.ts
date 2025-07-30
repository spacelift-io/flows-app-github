import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";
import outputSchema from "./updateIssueComment.json" with { type: "json" };
import { commentBody } from "./shared.ts";

const commentId = {
  name: "Comment ID",
  description: "The unique identifier of the comment",
  type: "number",
  required: true,
  apiRequestFieldKey: "comment_id",
} as const;

export const updateIssueComment = defineGitHubBlock({
  name: "Update issue comment",
  description: "Updates a comment on an issue or pull request",
  category: "Issues",
  url: "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}",
  outputJsonSchema: outputSchema as any,
  inputConfig: {
    owner,
    repo,
    commentId,
    body: commentBody,
  },
});
