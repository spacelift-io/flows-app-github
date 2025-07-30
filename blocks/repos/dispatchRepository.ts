import { getGitHubInstallation } from "../../github.ts";
import { events } from "@slflows/sdk/v1";
import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";

export const dispatchRepository = defineGitHubBlock({
  name: "Dispatch repository",
  description: "Creates a repository dispatch event",
  category: "Repository",
  outputJsonSchema: {
    type: "object",
    properties: {
      eventType: {
        type: "string",
      },
    },
    required: ["eventType"],
  },
  inputConfig: {
    owner,
    repo,
    eventType: {
      name: "Event type",
      description: "A custom webhook event name (maximum 100 characters)",
      type: "string",
      required: true,
    },
    clientPayload: {
      name: "Client payload",
      description:
        "JSON payload with extra information about the webhook event",
      type: {
        type: "object",
        additionalProperties: true,
      },
      required: false,
    },
  },
  onEvent: async ({ event }) => {
    const octokit = await getGitHubInstallation();
    const { owner, repo, eventType, clientPayload } = event.inputConfig;

    await octokit.request("POST /repos/{owner}/{repo}/dispatches", {
      owner,
      repo,
      event_type: eventType,
      client_payload: clientPayload,
    });

    await events.emit({
      eventType,
    });
  },
});
