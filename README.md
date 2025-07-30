# GitHub

## Description

Provides integration with GitHub's API to manage repositories, issues, pull requests, workflows, and to respond to various GitHub events.

## Config

The app has an `organization` configuration field, which specifies the organization to which the GitHub App will be installed. If `organization` is not set, the installation target is the user’s personal account (`https://github.com/settings/apps/new`), otherwise it’s the named organization (`https://github.com/organizations/{organization}/settings/apps/new`).

Once the app is confirmed, it enters the `draft` status and we create a prompt with a generatedURL that redirects the user to GitHub’s "Create a new GitHub App" page pre‑populated with our manifest. After the user completes the form, GitHub calls our manifest callback URL, at which point we immediately redirect them back to the appropriate App‑installation page (personal or organization) to finish installing the newly created GitHub App.

Finally, once the installation completes, GitHub redirects the user back into our app and we mark the app's status as `ready`.

## App Services

The app needs to expose an HTTP endpoint to handle webhook events from GitHub. These webhooks must be properly verified using the webhook secret.

## Blocks

### Actions

- `dispatchWorkflow`
  - Description: Creates a workflow dispatch event for a specific workflow with a specified ref and optional inputs.
  - Implementation: Octokit call to GitHub REST API.

### Branches

- `createBranch`
  - Description: Creates a new branch in a repository.
  - Implementation: Octokit call to GitHub REST API.

- `listBranches`
  - Description: Lists branches from a repository with paginated results.
  - Implementation: Octokit call to GitHub REST API.

### Commits

- `listCommits`
  - Description: Lists commits from a repository with paginated results.
  - Implementation: Octokit call to GitHub REST API.

- `getCommit`
  - Description: Gets a commit from a repository.
  - Implementation: Octokit call to GitHub REST API.

### Issues

- `getIssue`
  - Description: Gets an issue from a repository.
  - Implementation: Octokit call to GitHub REST API.

- `createIssue`
  - Description: Creates a new issue in a repository with title, body, and optional assignees and labels.
  - Implementation: Octokit call to GitHub REST API.

- `updateIssue`
  - Description: Updates an existing issue's title, body, assignees, labels, or state (open, closed) and state reason (completed, not planned, reopened, null).
  - Implementation: Octokit call to GitHub REST API.

- `listIssues`
  - Description: Lists issues from a repository with optional filters (state, labels, date), sorting (created, updated, comments) and pagination.
  - Implementation: Octokit call to GitHub REST API.

- `createIssueComment`
  - Description: Creates a comment to an issue or pull request.
  - Implementation: Octokit call to GitHub REST API.

- `updateIssueComment`
  - Description: Updates a comment from an issue or pull request.
  - Implementation: Octokit call to GitHub REST API.

- `deleteIssueComment`
  - Description: Deletes a comment from an issue or pull request.
  - Implementation: Octokit call to GitHub REST API.

### Pull Requests

- `getPullRequest`
  - Description: Gets a pull request from a repository.
  - Implementation: Octokit call to GitHub REST API.

- `createPullRequest`
  - Description: Creates a new pull request between branches with title, body, draft status, and optional reviewers.
  - Implementation: Octokit call to GitHub REST API.

- `listPullRequests`
  - Description: Lists pull requests from a repository with optional filters (state, date), sorting (created, updated, comments) and pagination.
  - Implementation: Octokit call to GitHub REST API.

- `mergePullRequest`
  - Description: Merges a pull request with specified merge method (merge, squash, rebase), and optional commit title and message.
  - Implementation: Octokit call to GitHub REST API.

- `updatePullRequest`
  - Description: Updates an existing pull request's title, body, reviewers, base branch, or state (open, closed).
  - Implementation: Octokit call to GitHub REST API.

- `markPullRequestReadyForReview`
  - Description: Marks a pull request as ready for review.
  - Implementation: Octokit call to GitHub GraphQL API.

- `convertPullRequestToDraft`
  - Description: Converts a pull request to draft.
  - Implementation: Octokit call to GitHub GraphQL API.

### Reactions

- `createReaction`
  - Description: Creates a reaction to an issue comment or issue.
  - Implementation: Octokit call to GitHub REST API.

- `deleteReaction`
  - Description: Deletes a specific reaction created by the app.
  - Implementation: Octokit call to GitHub REST API.

### Repositories

- `dispatchRepository`
  - Description: Creates a repository dispatch event with a custom event name and optional JSON payload.
  - Implementation: Octokit call to GitHub REST API.

- `getFileContents`
  - Description: Gets the contents of a file in a repository.
  - Implementation: Octokit call to GitHub REST API.

- `createOrUpdateFileContents`
  - Description: Creates or updates a file in a repository.
  - Implementation: Octokit call to GitHub REST API.

- `deleteFile`
  - Description: Deletes a file in a repository.
  - Implementation: Octokit call to GitHub REST API.

### Event handlers

- Issues Subscription
  - Description: Subscribes to issue events (created, updated, closed, etc.). Optionally, users may filter the events via static block config by specifying the repo owner and name, event action (opened, closed, etc.) and the issue state (open, closed).
  - Implementation: The central app endpoint will receive callbacks from GitHub webhooks. It finds subscription blocks relevant to a given event and notifies them.

- Pull Request Subscription
  - Description: Subscribes to pull request events (opened, closed, review requested, etc.). Optionally, users may filter the events via static block config by specifying the repo owner and name, event action (opened, closed, etc.) and base branch name.
  - Implementation: Same as issues subscription.

- Push Subscription
  - Description: Subscribes to repository push events. Optionally, users may filter the events via static block config by specifying the repo owner and name, branch name and a flag to include tags.
  - Implementation: Same as issues subscription.

- Workflow Subscription
  - Description: Subscribes to GitHub Actions workflow status changes. Optionally, users may filter the events via static block config by specifying the repo owner and name, workflow name, event action (completed, failed, etc.) and the workflow conclusion (success, failure, cancelled, etc).
  - Implementation: Same as issues subscription.

## Implementation Notes
