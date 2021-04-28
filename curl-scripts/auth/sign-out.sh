#!/bin/bash
# TOKEN="" sh curl-scripts/auth/sign-out.sh

API="https://tick-tasker.herokuapp.com"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
