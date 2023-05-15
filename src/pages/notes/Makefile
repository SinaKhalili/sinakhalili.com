serve-and-watch:
	browser-sync public -w --port 8000 &
	watch  -n 5 python build.py

serve:
	browser-sync public -w --port 8000

watch:
	watch -n 6 python build.py 

watch-closely:
	ls *.py *.md templates/_base.html templates/index.html templates/page.html static/*/* | entr python build.py

serve-css:
	browser-sync public -w --port 8000 &
	ls *.py *.md templates/_base.html templates/index.html templates/page.html static/*/* | entr python build.py
	
dev:
	@./check_empty.sh && echo "You're good" || ! echo "Empty directories found"	
	python build.py
	./make_full_list.sh
	@echo "✅"

prod:
	@./check_empty.sh && echo "You're good" || ! echo "Empty directories found"	
	BUILD_ENV=deploy python build.py
	./make_full_list.sh
	@echo "✅"
