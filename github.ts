import { App } from "@octokit/app";
import { kv } from "@slflows/sdk/v1";
import crypto from "node:crypto";

export async function getGitHubApp() {
  const [{ value: appInfo }, { value: appCredentials }] = await kv.app.getMany([
    "info",
    "credentials",
  ]);

  if (!appInfo || !appCredentials) {
    throw new Error("App info or credentials not set");
  }

  return new App({
    appId: appInfo.id,
    privateKey: crypto
      .createPrivateKey(appCredentials.pem)
      .export({
        type: "pkcs8",
        format: "pem",
      })
      .toString(),
    oauth: {
      clientId: appCredentials.clientId,
      clientSecret: appCredentials.clientSecret,
    },
    webhooks: {
      secret: appCredentials.webhookSecret,
    },
  });
}

export async function getGitHubInstallation() {
  const ghApp = await getGitHubApp();

  const { value: installationId } = await kv.app.get("installationId");

  if (!installationId) {
    throw new Error("Installation ID not set");
  }

  return ghApp.getInstallationOctokit(installationId);
}
