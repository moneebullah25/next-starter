const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

const env = process.env;

const REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|core|utils|revert|deprecated|removed|types|scripts\([^)]+\))?:(.+?)(?:\s+CU:\s+([a-zA-Z0-9]+))?$/m;

const FALLBACK_GROUP = "Miscellaneous";
const CHANGELOG_HEADER = "<!--- ======= AUTO-GENERATE-CHANGELOG-START ======= --->";
const CHANGELOG_FOOTER = "<!--- ======= AUTO-GENERATE-CHANGELOG-END ======= --->";

const CLICK_UP_BASE_URL = "https://app.clickup.com/t/";

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

function createMarkdownString(description, id) {
  description = capitalizeFirstLetter(description);

  const string = `- ${description}`;

  if (id) {
    const suffix = `[View](${CLICK_UP_BASE_URL}${id})`;

    return `${string} ${suffix}`;
  }

  return string;
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

octokit.rest.pulls
  .get({
    owner: OWNER,
    repo: REPO,
    pull_number: PR_NUMBER
  })
  .then((pull_request) => {
    const existingBody = pull_request.data.body || "";

    octokit.rest.pulls
      .listCommits({
        owner: OWNER,
        repo: REPO,
        pull_number: PR_NUMBER,
        page: 1,
        per_page: 100
      })
      .then(({ data }) => {
        const commitMessages = data.map((commit) => commit.commit.message);
        const commitParts = [];
        const commitGroups = createCommitGroups();

        for (const message of commitMessages) {
          const match = message.match(REGEX);

          if (!match) {
            continue;
          }

          const [input, commitType, commitDescription, cuId] = match;

          const markdownString = createMarkdownString(commitDescription.trim(), cuId);

          commitParts.push({
            type: commitType,
            description: commitDescription.trim(),
            task_id: cuId,
            markdown: markdownString
          });

          const group = COMMIT_GROUPS[commitType] || FALLBACK_GROUP;

          commitGroups[group].push(markdownString);
        }

        let body = existingBody;

        const changeLog = createChangelog(commitGroups);
        const startIndex = existingBody.indexOf(CHANGELOG_HEADER);
        const endIndex = existingBody.indexOf(CHANGELOG_FOOTER);

        if (startIndex !== -1 && endIndex !== -1) {
          const firstHalf = existingBody.substring(0, startIndex);
          const lastHalf = existingBody.substring(endIndex + CHANGELOG_FOOTER.length);

          body = `${firstHalf}${changeLog}${lastHalf}`;
        } else {
          body += "\n\n";
          body += changeLog;
        }

        octokit.rest.pulls
          .update({
            owner: OWNER,
            repo: REPO,
            pull_number: PR_NUMBER,
            body: body
          })
          .then(({ data }) => {
            console.log("CHANGELOG UPDATED");
          })
          .catch((error) => {
            console.error("FAILED TO UPDATE CHANGELOG");
            console.error(error);
          });
      });
  });
