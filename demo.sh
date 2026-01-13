#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Define project root
PROJECT_ROOT=$(pwd)

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    # Check if ANVIL_PID is set and the process is running
    if [ ! -z "$ANVIL_PID" ] && ps -p $ANVIL_PID > /dev/null; then
        echo "Killing Anvil (PID: $ANVIL_PID)..."
        kill $ANVIL_PID
    fi
}
# Trap SIGINT (Ctrl+C) and EXIT to run cleanup
trap cleanup INT EXIT

echo "==========================================="
echo "🧪 Running Smart Contract Tests..."
echo "==========================================="
cd packages/contracts
forge test -vvv

echo ""
echo "==========================================="
echo "⛓️  Starting Anvil (Mantle Sepolia Fork)..."
echo "==========================================="
# Start Anvil in the background and redirect output to a log file
anvil --fork-url https://rpc.sepolia.mantle.xyz --port 8545 > anvil.log 2>&1 &
ANVIL_PID=$!
echo "Anvil running in background (PID: $ANVIL_PID). Logs: packages/contracts/anvil.log"

# Wait for Anvil to be ready
echo "Waiting for Anvil to initialize..."
while ! nc -z 127.0.0.1 8545; do   
  sleep 1
done
echo "Anvil is ready!"

echo ""
echo "==========================================="
echo "🚀 Deploying Contracts to Local Fork..."
echo "==========================================="
# Default Anvil Private Key #0
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

forge script script/Deploy.s.sol \
    --rpc-url http://127.0.0.1:8545 \
    --broadcast


echo ""
echo "==========================================="
echo "💻 Starting Next.js Demo App..."
echo "==========================================="
cd ../demo
npm run dev