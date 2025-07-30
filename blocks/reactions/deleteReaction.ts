import { getGitHubInstallation } from "../../github.ts";
import { events } from "@slflows/sdk/v1";
import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";
import { contentId, contentType } from "./shared.ts";

export const deleteReaction = defineGitHubBlock({
  name: "Delete reaction",
  description: "Delete a reaction from an issue, pull request, or comment",
  category: "Reactions",
  outputJsonSchema: {
    type: "object",
    properties: {
      reactionId: {
        type: "number",
      },
    },
    required: ["reactionId"],
  },
  inputConfig: {
    owner,
    repo,
    contentType,
    contentId,
    reactionId: {
      name: "Reaction ID",
      description: "The ID of the reaction to delete",
      type: "number",
      required: true,
    },
  },
  onEvent: async ({ event }) => {
    const octokit = await getGitHubInstallation();
    const { owner, repo, contentType, contentId, reactionId } =
      event.inputConfig;

    switch (contentType) {
      case "issue": {
        await octokit.request(
          "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}",
          {
            owner,
            repo,
            issue_number: contentId,
            reaction_id: reactionId,
          },
        );
        break;
      }

      case "issue-comment": {
        await octokit.request(
          "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}",
          {
            owner,
            repo,
            comment_id: contentId,
            reaction_id: reactionId,
          },
        );
        break;
      }

      default:
        throw new Error(`Invalid content type: ${contentType}`);
    }

    await events.emit({ reactionId });
  },
});
