#!/usr/bin/env bash

# List of scripts to execute
scripts=(
  "./cc-anvil-catalog-dev-deploy.sh"
  "./cc-data-browser.lungmap.dev.clevercanary.com-deploy.sh"
  "./cc-explore.anvilproject.dev.clevercanary.com-deploy.sh"
  "./cc-explore.data.humancellatlas.dev.clevercanary.com-deploy.sh"
  "./cc-ma-pilot.explore.data.humancellatlas.dev.clevercanary.com-deploy.sh"
  "./cc-ncpi-catalog-dev-deploy.sh"
)


# Execute each script
for script in "${scripts[@]}"; do
  if [[ -x "$script" ]]; then
    echo "Running $script..."
    bash "$script"
    echo "$script finished."
  else
    echo "Skipping $script: Not executable or not found."
  fi
done