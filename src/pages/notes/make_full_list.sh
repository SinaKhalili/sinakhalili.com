#!/bin/bash

echo "Building sitemap for stats page..."
JSPATH=static/scripts/sitemap.js
echo "const sitemap = [" > "$JSPATH"

ls public/*/index.html | awk -F "/" '{print "\"""/"$2"/""\""","}' >> "$JSPATH"

echo "]" >> "$JSPATH"
echo "Done ✅"
