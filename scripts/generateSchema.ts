import refParser from "@apidevtools/json-schema-ref-parser";
import schema from "../schema.json" with { type: "json" };
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { convertKeysToCamelCase } from "../utils/convertKeysToCamelCase";

await refParser.dereference(schema);

function cleanSchema(obj: unknown, isPropertyMap = false): unknown {
  if (!obj || typeof obj !== "object") return obj;

  const propsToRemove = [
    "example",
    "format",
    "minLength",
    "maxLength",
    "default",
    "title",
    "nullable",
  ];

  if (Array.isArray(obj)) {
    return obj.map((item) => cleanSchema(item, false));
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!isPropertyMap && propsToRemove.includes(key)) {
      continue;
    }

    if (typeof value === "object" && value !== null) {
      const childIsPropertyMap = key === "properties";
      result[key] = cleanSchema(value, childIsPropertyMap);
    } else {
      result[key] = value;
    }
  }

  return result;
}

const schemaMap = {
  // Branches
  "./blocks/branches/createBranch.json":
    schema.paths["/repos/{owner}/{repo}/git/refs"].post.responses["201"]
      .content["application/json"].schema,
  "./blocks/branches/listBranches.json":
    schema.paths["/repos/{owner}/{repo}/branches"].get.responses["200"].content[
      "application/json"
    ].schema,

  // Commits
  "./blocks/commits/listCommits.json":
    schema.paths["/repos/{owner}/{repo}/commits"].get.responses["200"].content[
      "application/json"
    ].schema,
  "./blocks/commits/getCommit.json":
    schema.paths["/repos/{owner}/{repo}/commits/{ref}"].get.responses["200"]
      .content["application/json"].schema,

  // Contents
  "./blocks/contents/getFileContents.json":
    schema.paths["/repos/{owner}/{repo}/contents/{path}"].get.responses["200"]
      .content["application/json"].schema,
  "./blocks/contents/createOrUpdateFileContents.json":
    schema.paths["/repos/{owner}/{repo}/contents/{path}"].put.responses["200"]
      .content["application/json"].schema,
  "./blocks/contents/deleteFile.json":
    schema.paths["/repos/{owner}/{repo}/contents/{path}"].delete.responses[
      "200"
    ].content["application/json"].schema,

  // Issues
  "./blocks/issues/createIssue.json":
    schema.paths["/repos/{owner}/{repo}/issues"].post.responses["201"].content[
      "application/json"
    ].schema,
  "./blocks/issues/getIssue.json":
    schema.paths["/repos/{owner}/{repo}/issues/{issue_number}"].get.responses[
      "200"
    ].content["application/json"].schema,
  "./blocks/issues/listIssues.json":
    schema.paths["/repos/{owner}/{repo}/issues"].get.responses["200"].content[
      "application/json"
    ].schema,
  "./blocks/issues/updateIssue.json":
    schema.paths["/repos/{owner}/{repo}/issues/{issue_number}"].patch.responses[
      "200"
    ].content["application/json"].schema,
  "./blocks/issues/createIssueComment.json":
    schema.paths["/repos/{owner}/{repo}/issues/{issue_number}/comments"].post
      .responses["201"].content["application/json"].schema,
  "./blocks/issues/updateIssueComment.json":
    schema.paths["/repos/{owner}/{repo}/issues/comments/{comment_id}"].patch
      .responses["200"].content["application/json"].schema,

  // Pulls
  "./blocks/pulls/createPullRequest.json":
    schema.paths["/repos/{owner}/{repo}/pulls"].post.responses["201"].content[
      "application/json"
    ].schema,
  "./blocks/pulls/getPullRequest.json":
    schema.paths["/repos/{owner}/{repo}/pulls/{pull_number}"].get.responses[
      "200"
    ].content["application/json"].schema,
  "./blocks/pulls/listPullRequests.json":
    schema.paths["/repos/{owner}/{repo}/pulls"].get.responses["200"].content[
      "application/json"
    ].schema,
  "./blocks/pulls/updatePullRequest.json":
    schema.paths["/repos/{owner}/{repo}/pulls/{pull_number}"].patch.responses[
      "200"
    ].content["application/json"].schema,
  "./blocks/pulls/mergePullRequest.json":
    schema.paths["/repos/{owner}/{repo}/pulls/{pull_number}/merge"].put
      .responses["200"].content["application/json"].schema,

  // Reactions
  "./blocks/reactions/createReaction.json":
    schema.paths["/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"]
      .post.responses["201"].content["application/json"].schema,
};

for (const [filePath, schemaNode] of Object.entries(schemaMap)) {
  const cleanedSchema = cleanSchema(schemaNode);
  const camelCaseSchema = convertKeysToCamelCase(cleanedSchema);

  const fullPath = join(process.cwd(), filePath);

  await writeFile(fullPath, JSON.stringify(camelCaseSchema, null, 2));

  console.log(`Generated schema: ${filePath}`);
}
