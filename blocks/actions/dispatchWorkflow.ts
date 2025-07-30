import { getGitHubInstallation } from "../../github.ts";
import { events } from "@slflows/sdk/v1";
import { defineGitHubBlock } from "../../utils/defineGitHubBlock.ts";
import { owner, repo } from "../shared.ts";

export const dispatchWorkflow = defineGitHubBlock({
  name: "Dispatch workflow",
  description: "Creates a workflow dispatch event for a specific workflow",
  category: "Actions",
  outputJsonSchema: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
      },
    },
    required: ["workflowId"],
  },
  inputConfig: {
    owner,
    repo,
    workflowId: {
      name: "Workflow ID",
      description:
        "The ID of the workflow. You can also pass the workflow file name as a string",
      type: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      required: true,
    },
    ref: {
      name: "Reference",
      description:
        "The git reference for the workflow. The reference can be a branch or tag name.",
      type: "string",
      required: true,
    },
    inputs: {
      name: "Inputs",
      description:
        "Input keys and values configured in the workflow file. The maximum number of properties is 10. Any default properties configured in the workflow file will be used when `inputs` are omitted.",
      type: {
        type: "object",
        additionalProperties: true,
      },
      required: false,
    },
  },
  onEvent: async ({ event }) => {
    const octokit = await getGitHubInstallation();
    const { owner, repo, workflowId, ref, inputs } = event.inputConfig;

    let parsedInputs: Record<string, unknown> | undefined;
    if (inputs) {
      try {
        parsedInputs = JSON.parse(inputs);
      } catch {
        throw new Error("Invalid JSON in inputs");
      }
    }

    await octokit.request(
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
      {
        owner,
        repo,
        workflow_id: workflowId,
        ref,
        inputs: parsedInputs,
      },
    );

    await events.emit({
      workflowId,
    });
  },
});
