#!/bin/sh
# ID="608070e8def0df7b94e68e3c" TOKEN="5b138c2f44a666bc1a29936568650806" sh curl-scripts/tasks/show.sh

API="https://tick-tasker.herokuapp.com"
URL_PATH="/tasks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
