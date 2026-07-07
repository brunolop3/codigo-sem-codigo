#!/bin/bash
cd /home/z/my-project

# Kill any existing server
if [ -f /tmp/serve.pid ]; then
  kill $(cat /tmp/serve.pid) 2>/dev/null
  rm /tmp/serve.pid
fi

# Start server in background
node serve.js &
echo $! > /tmp/serve.pid

# Keep the script running to prevent process cleanup
wait
