import { getGitHubInstallation } from "../../github.ts";
import { events } from "@slflows/sdk/v1";
import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";

export const deleteIssueComment = defineGitHubBlock({
  name: "Delete issue comment",
  description: "Deletes a comment from an issue or pull request",
  category: "Issues",
  outputJsonSchema: {
    type: "object",
    properties: {
      commentId: {
        type: "number",
      },
    },
    required: ["commentId"],
  },
  inputConfig: {
    owner,
    repo,
    commentId: {
      name: "Comment ID",
      description: "The ID of the comment to delete",
      type: "number",
      required: true,
    },
  },

  onEvent: async ({ event }) => {
    const octokit = await getGitHubInstallation();
    const { owner, repo, commentId } = event.inputConfig;

    await octokit.request(
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}",
      {
        owner,
        repo,
        comment_id: commentId,
      },
    );

    await events.emit({
      commentId,
    });
  },
});
