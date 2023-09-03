SRC = src/index.js src/render.js

NCC = node_modules/.bin/ncc

.PHONY: all
all: dist/index.js

package.json:
	npm init

package-lock.json: package.json
	# Also creates node_modules/
	npm install @actions/core
	npm install @actions/github
	npm install @vercel/ncc

dist/index.js: $(SRC) package-lock.json
	$(NCC) build $<

.PHONY: clean
clean:
	rm -r dist/
	rm -r node_modules/
	rm package-lock.json
