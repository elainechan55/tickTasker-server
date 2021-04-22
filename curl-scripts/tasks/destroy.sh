#!/bin/bash
# ID="608070e8def0df7b94e68e3c" TOKEN="5b138c2f44a666bc1a29936568650806" sh curl-scripts/tasks/destroy.sh

API="http://localhost:4741"
URL_PATH="/tasks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
