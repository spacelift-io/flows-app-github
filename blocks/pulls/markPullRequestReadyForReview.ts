import { getGitHubInstallation } from "../../github.ts";
import { events } from "@slflows/sdk/v1";
import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo, pullNumber } from "../shared.ts";

export const markPullRequestReadyForReview = defineGitHubBlock({
  name: "Mark pull request ready for review",
  description: "Marks a draft pull request as ready for review",
  category: "Pull requests",
  outputJsonSchema: {
    type: "object",
    properties: {
      pullNumber: {
        type: "string",
      },
    },
    required: ["pullNumber"],
  },
  inputConfig: {
    owner,
    repo,
    pullNumber,
  },
  onEvent: async ({ event }) => {
    const octokit = await getGitHubInstallation();
    const { owner, repo, pullNumber } = event.inputConfig;

    const graphqlQuery = `
      mutation MarkPullRequestReadyForReview($input: MarkPullRequestReadyForReviewInput!) {
        markPullRequestReadyForReview(input: $input) {
          pullRequest {
            id
          }
        }
      }
    `;

    const { data: pullRequest } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number: pullNumber,
      },
    );

    const nodeId = pullRequest.node_id;

    await octokit.graphql(graphqlQuery, {
      input: {
        pullRequestId: nodeId,
      },
    });

    await events.emit({ pullNumber });
  },
});
