import * as core from "@actions/core";
import * as github from "@actions/github";
import * as fs from "fs";

async function run(): Promise<void> {
  try {
    const directory = core.getInput("directory");

    const buildInfo = {
      actor: github.context.actor,
      ref: github.context.ref,
      sha: github.context.sha,
      productionMode: process.env.PRODUCTION_MODE,
      buildNumber: github.context.runId,
    };

    fs.writeFile(
      `${directory}/buildinfo.txt`,
      JSON.stringify(buildInfo),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
