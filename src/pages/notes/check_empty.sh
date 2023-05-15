#!/bin/bash

# Return non-zero on finding empty directories

echo "Checking empty entries..."

! find . -type f -name "*.md" -empty | grep .
