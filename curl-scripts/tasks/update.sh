#!/bin/bash
# ID="608070e8def0df7b94e68e3c" TOKEN="5b138c2f44a666bc1a29936568650806" TITLE="Project 2 Day 1" DESCRIPTION="Do all CRUD endpoints" COMPLETE=false sh curl-scripts/tasks/update.sh

API="http://localhost:4741"
URL_PATH="/tasks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
