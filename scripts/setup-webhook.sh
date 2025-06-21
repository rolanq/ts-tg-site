#!/bin/sh

# Проверка наличия переменных окружения
if [ -z "$NEXT_PUBLIC_BOT_TOKEN" ] || [ -z "$WEBHOOK_URL" ]; then
    echo "Error: NEXT_PUBLIC_BOT_TOKEN or WEBHOOK_URL is not set"
    exit 1
fi

echo "Setting up webhook..."

# Настройка webhook
curl -F "url=${WEBHOOK_URL}" \
     -F "drop_pending_updates=true" \
     "https://api.telegram.org/bot${NEXT_PUBLIC_BOT_TOKEN}/setWebhook"

echo "\nChecking webhook status..."

# Проверка статуса webhook
curl "https://api.telegram.org/bot${NEXT_PUBLIC_BOT_TOKEN}/getWebhookInfo" 