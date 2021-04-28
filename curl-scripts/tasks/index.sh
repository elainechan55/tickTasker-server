#!/bin/sh
# TOKEN="5b138c2f44a666bc1a29936568650806" sh curl-scripts/tasks/index.sh

API="https://tick-tasker.herokuapp.com"
URL_PATH="/tasks"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
