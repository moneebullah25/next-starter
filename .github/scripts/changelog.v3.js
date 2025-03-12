const env = process.env;

const REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|core|utils|revert|deprecated|removed|types|scripts\([^)]+\))?:(.+?)$/m;

const FALLBACK_GROUP = "Miscellaneous";
const CHANGELOG_HEADER = "<!--- ======= AUTO-GENERATE-CHANGELOG-START ======= --->";
const CHANGELOG_FOOTER = "<!--- ======= AUTO-GENERATE-CHANGELOG-END ======= --->";

const COMMIT_GROUPS = {
  feat: "What's New",
  fix: "Bug Fixes",
  docs: "Documentation",
  refactor: "Refactors",
  build: "Builds",
  ci: "Continuous Integration / Deployment"
};

const [OWNER, REPO] = env.GITHUB_REPOSITORY.split("/");
const PR_NUMBER = env.PULL_REQUEST_NUMBER;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createMarkdownString(description) {
  return `- ${capitalizeFirstLetter(description)}`;
}

function createCommitGroups() {
  const groups = {};

  for (const [type, group] of Object.entries(COMMIT_GROUPS)) {
    groups[group] = [];
  }

  groups[FALLBACK_GROUP] = [];

  return groups;
}

function createChangelog(commitGroups) {
  const changelog = [];

  for (const [group, commits] of Object.entries(commitGroups)) {
    if (commits.length === 0) {
      continue;
    }

    changelog.push(`## ${group}`);
    changelog.push("");
    changelog.push(...commits);
    changelog.push("");
  }

  return [CHANGELOG_HEADER, ...changelog, CHANGELOG_FOOTER].join("\n");
}

async function getOctoClient() {
  const _octokit = await import("@octokit/action");

  return new _octokit.Octokit();
}

async function main() {
  const octokit = await getOctoClient();

  try {
    const pull_request = await octokit.rest.pulls.get({
      owner: OWNER,
      repo: REPO,
      pull_number: PR_NUMBER
    });

    if (!pull_request) {
      throw new Error("Failed to get pull request");
    }

    const existing_body = pull_request.data.body || "";

    const commits = await octokit.rest.pulls.listCommits({
      owner: OWNER,
      repo: REPO,
      pull_number: PR_NUMBER,
      page: 1,
      per_page: 100
    });

    const commit_messages = commits.data.map((commit) => commit.commit.message);
    const commit_parts = [];
    const commit_groups = createCommitGroups();

    for (const message of commit_messages) {
      const match = message.match(REGEX);

      if (!match) {
        continue;
      }

      const [input, commit_type, commit_description] = match;

      const markdown_string = createMarkdownString(commit_description.trim());

      commit_parts.push({
        type: commit_type,
        description: commit_description.trim(),
        markdown: markdown_string
      });

      const group = COMMIT_GROUPS[commit_type] || FALLBACK_GROUP;

      commit_groups[group].push(markdown_string);
    }

    let body = existing_body;

    const change_log = createChangelog(commit_groups);
    const [start_index, end_index] = [
      existing_body.indexOf(CHANGELOG_HEADER),
      existing_body.indexOf(CHANGELOG_FOOTER)
    ];

    if (start_index !== -1 && end_index !== -1) {
      const first_half = existing_body.substring(0, start_index);
      const last_half = existing_body.substring(end_index + CHANGELOG_FOOTER.length);

      body = `${first_half}${change_log}${last_half}`;
    } else {
      body += "\n\n";
      body += change_log;
    }

    await octokit.rest.pulls.update({
      owner: OWNER,
      repo: REPO,
      pull_number: PR_NUMBER,
      body: body
    });

    console.log("CHANGELOG UPDATED");
  } catch (error) {
    console.error(error);

    const _ = await octokit.rest.issues.createComment({
      owner: OWNER,
      repo: REPO,
      issue_number: PR_NUMBER,
      body: "There was an attempt to generate a changelog but failed."
    });
  }
}

main();
