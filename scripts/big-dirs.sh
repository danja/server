#!/bin/bash

# Directories to exclude (add more as needed, separated by backslash and pipe)
#EXCLUDE_DIRS="{node_modules,.git,.cache,packages}"
# EXCLUDE_DIRS="node_modules\|.git\|.cache|\packages"
# Find directories and their sizes, excluding specified directories,
# then sort by size and display the top 30
#du -hd 4 --exclude="$EXCLUDE_DIRS" | sort -rh | head -n 30



EXCLUDE_DIRS=("node_modules" "packages" "ppm" ".git" "spec" "resources" "vendor" "static" "docs" "script")
TARGET_DIR="${1:-.}"

# Construct the exclude arguments
EXCLUDE_ARGS=""
for dir in "${EXCLUDE_DIRS[@]}"; do
    EXCLUDE_ARGS+="--exclude=$dir "
done

echo "Target directory: $TARGET_DIR"
echo "Exclude arguments: $EXCLUDE_ARGS"

du -hd 4 $EXCLUDE_ARGS "$TARGET_DIR" | sort -rh | head -n 30


