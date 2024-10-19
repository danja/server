#!/bin/bash

find . -type d | while read -r dir; do
    file_count=$(find "$dir" -maxdepth 1 -type f | wc -l)
    dir_size=$(du -sm "$dir" | cut -f1)
    printf "%-50s Files: %5d Size: %5d MB\n" "$dir" "$file_count" "$dir_size"
done
