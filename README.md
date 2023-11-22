# ClickUp Integration Workflows

Github workflows that are used for the CI/CD pipelines that integrate with ClickUp and the deployment servers.

## Setup

1. Template this repository ensuring you **copy** all branches to the new repository.
2. Add the following repository variables

```
CLICKUP_BRANCH_PREFIX
- task/CU-

CLICKUP_PULL_REQUEST_PREFIX
- [CU-

TEMPLATE_PARENT_REMOTE
- https://github.com/itsmichaelbtw/cu-integration-workflows
```

**NOTE:** Ensure there is a ClickUp workspace and webhooks have been setup.

3. Disable "Wikis"
4. Disable "Projects"
5. Set merge commit message to "pull request title and description"
6. Disable "squash" and "rebase" merging
7. Enable automatic branch deletion
8. Create a branch protection rule with these 2 patterns:

```
Pattern: task/*

Rules:

  - Require status checks to pass before merging
    - Set the check to "branch-changelog"
  - Allow deletions
```

```
Pattern: development

Rules:

  - Require status checks to pass before merging
    - Set the check to "branch-changelog"
  - Allow force pushes
    - Add yourself
```

10. Make sure Github Actions has `read and write` permissions in your repository settings.
11. Run the `repository-setup.yml` workflow to setup the repository.

### ClickUp and Webhooks

1. Add the two automation tasks to the Clickup workspace (copy from another project)
2. Add the repo to the Github application in Clickup
3. Setup a new Discord webhook and channel in the dev server and add the url to the webhook settings
