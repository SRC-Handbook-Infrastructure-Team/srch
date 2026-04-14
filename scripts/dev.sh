#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p .logs
DEV_LOG=.logs/dev.log
SERVER_LOG=.logs/server.log
WEB_LOG=.logs/web.log

# Start each run with fresh logs.
: > "$DEV_LOG"
: > "$SERVER_LOG"
: > "$WEB_LOG"

log_dev() {
  local message="$1"
  printf '%s\n' "$message" | tee -a "$DEV_LOG"
}

print_ready_link() {
  local label="$1"
  local url="$2"

  if [[ -t 1 ]]; then
    # OSC 8 hyperlink + blue underlined text for terminals that support links.
    printf '%s \033]8;;%s\033\\\033[34;4m%s\033[0m\033]8;;\033\\\n' "$label" "$url" "$url"
  else
    printf '%s %s\n' "$label" "$url"
  fi

  printf '%s %s\n' "$label" "$url" >> "$DEV_LOG"
}

log_dev "Starting back end..."
{
  echo "Starting server workspace dev..."
  npm run -s --workspace=server dev
} > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

log_dev "Starting front end..."
{
  echo "Starting website workspace dev..."
  npm run -s --workspace=website dev -- --host localhost --port 5173 --strictPort --clearScreen false
} > "$WEB_LOG" 2>&1 &
WEB_PID=$!

cleanup() {
  kill "$SERVER_PID" "$WEB_PID" 2>/dev/null || true
  wait "$SERVER_PID" "$WEB_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

server_ready=0
web_ready=0
for _ in {1..60}; do
  if [[ "$server_ready" -eq 0 ]] && lsof -iTCP:3001 -sTCP:LISTEN -n -P >/dev/null 2>&1; then
    print_ready_link "Back end ready at" "http://localhost:3001"
    server_ready=1
  fi

  if [[ "$web_ready" -eq 0 ]] && lsof -iTCP:5173 -sTCP:LISTEN -n -P >/dev/null 2>&1; then
    print_ready_link "Front end ready at" "http://localhost:5173"
    web_ready=1
  fi

  if [[ "$server_ready" -eq 1 && "$web_ready" -eq 1 ]]; then
    break
  fi

  sleep 0.25
done

if [[ "$server_ready" -eq 0 || "$web_ready" -eq 0 ]]; then
  log_dev "Services are still starting. Run npm run dev:logs to inspect logs."
fi

while true; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    log_dev "Back end process exited."
    exit 1
  fi

  if ! kill -0 "$WEB_PID" 2>/dev/null; then
    log_dev "Front end process exited."
    exit 1
  fi

  sleep 1
done
