Gonna post some of the new commands I learn while using the computer day-to-day.

---
**lsof**: list-of-open-files

Gives a list of open files, useful for checking the unix "files" w.r.t. a program. For example to check what process is running on port 8000
`sudo lsof -nP -iTCP:8000 | grep LISTEN`

---
