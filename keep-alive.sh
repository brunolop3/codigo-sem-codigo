#!/bin/bash
cd /home/z/my-project

# Kill any existing server
if [ -f /tmp/server.pid ]; then
  kill $(cat /tmp/server.pid) 2>/dev/null
  rm /tmp/server.pid
fi

# Start server
node serve.js &
echo $! > /tmp/server.pid

# Keep alive loop - restart if server dies
while true; do
  if ! kill -0 $(cat /tmp/server.pid 2>/dev/null) 2>/dev/null; then
    echo "Server died, restarting..." >> /tmp/server-restart.log
    node serve.js &
    echo $! > /tmp/server.pid
  fi
  sleep 5
done
