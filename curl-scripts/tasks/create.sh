#!/bin/bash
# TOKEN="5b138c2f44a666bc1a29936568650806" TITLE="Project 2" DESCRIPTION="Add POST/GET route for tasks" COMPLETE=false DEADLINE="2021-04-21T11:59:00" sh curl-scripts/tasks/create.sh

API="http://localhost:4741"
URL_PATH="/tasks"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "task": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESCRIPTION}"'",
      "isComplete": "'"${COMPLETE}"'"
    }
  }'

echo
