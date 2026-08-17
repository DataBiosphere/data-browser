#!/usr/bin/env bash
# Copy generated analytics sites into the gh-pages directory for deployment.
# Run this after generating all sites locally.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEPLOY_DIR="$REPO_ROOT/gh-pages"

rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/anvil-explorer" "$DEPLOY_DIR/hca-explorer" "$DEPLOY_DIR/lungmap"

# Copy each site
cp -r "$SCRIPT_DIR/anvil-explorer-sheets/site/"* "$DEPLOY_DIR/anvil-explorer/"
cp -r "$SCRIPT_DIR/hca-explorer-sheets/site/"* "$DEPLOY_DIR/hca-explorer/"
cp -r "$SCRIPT_DIR/lungmap-analytics/sheets/site/"* "$DEPLOY_DIR/lungmap/"

# Create index page with links
cat > "$DEPLOY_DIR/index.html" <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Browser Analytics</title>
</head>
<body>
    <h1>Data Browser Analytics</h1>
    <ul>
        <li><a href="anvil-explorer/">AnVIL Explorer User Analytics</a></li>
        <li><a href="hca-explorer/">HCA Data Explorer User Analytics</a></li>
        <li><a href="lungmap/">LungMAP User Analytics</a></li>
    </ul>
</body>
</html>
HTML

echo "Deployed sites to $DEPLOY_DIR"
echo "  - anvil-explorer/"
echo "  - hca-explorer/"
echo "  - lungmap/"
echo ""
echo "Commit and push gh-pages/ to trigger deployment."
