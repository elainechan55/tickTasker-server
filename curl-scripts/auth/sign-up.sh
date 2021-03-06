#!/bin/bash
# EMAIL="abc@123.com" PASSWORD="123" sh curl-scripts/auth/sign-up.sh

# API="http://localhost:4741"
API="https://tick-tasker.herokuapp.com"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
