#!/bin/bash

while [[ $# -gt 0 ]]; do
  case "$1" in
    -t|--token)
      TOKEN="$2"
      shift 2
      ;;
    -r|--repo)
      REPO="$2"
      shift 2
      ;;
    -p|--pr-number)
      PR_NUMBER="$2"
      shift 2
      ;;
    *)
      echo "Invalid argument: $1"
      exit 1
      ;;
  esac
done

if [[ -z "$TOKEN" || -z "$REPO" || -z "$PR_NUMBER" ]]; then
  echo "Missing required arguments."
  exit 1
fi

REGEX='(feat|fix|docs|style|refactor|perf|test|build|ci|chore|core|utils|revert|deprecated|removed|types|scripts)(\([^)]+\))?: (.+)'
OUTPUT=""

declare -A commit_types
declare -A misc_commits

GET_REQUESTS=0
PAGE=1
while [[ $GET_REQUESTS -lt 5 ]]; do
  COMMITS=$(curl --silent -H "Authorization: Bearer $TOKEN" \
    "https://api.github.com/repos/$REPO/pulls/$PR_NUMBER/commits?page=$PAGE&per_page=100" | \
    jq --raw-output '.[].commit.message')

  if [[ -z "$COMMITS" ]]; then
    break
  fi

  IFS=$'\n' read -r -d '' -a COMMITS_ARRAY <<< "$COMMITS"

  for commit in "${COMMITS_ARRAY[@]}"
  do
    if [[ $commit =~ $REGEX ]]; then
      commit_type="${BASH_REMATCH[1]}"
      commit_message="${BASH_REMATCH[3]}"

      if [[ $commit_type == "feat" ]]; then
        commit_type="What's New"
      elif [[ $commit_type == "fix" ]]; then
        commit_type="Bug Fixes"
      else
        commit_type="Miscellaneous"
      fi

      if [[ -z "${commit_types[$commit_type]}" ]]; then
        commit_types[$commit_type]=""
      fi

      capitalized_message="$(tr '[:lower:]' '[:upper:]' <<< ${commit_message:0:1})${commit_message:1}"

      sanitized_message=${capitalized_message//\"/\'}
      commit_types[$commit_type]+="- $sanitized_message"$'\n'
    fi
  done

  GET_REQUESTS=$((GET_REQUESTS + 1))
  PAGE=$((PAGE + 1))
done

for type in "${!commit_types[@]}"
do
  OUTPUT+="### $type"$'\n'
  OUTPUT+=${commit_types[$type]}$'\n'
done

JSON_OUTPUT=$(jq -Rs . <<<"$OUTPUT")

API_URL="https://api.github.com/repos/$REPO/pulls/$PR_NUMBER"
curl --silent --request PATCH --url "$API_URL" \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data "{\"body\": $JSON_OUTPUT}"
