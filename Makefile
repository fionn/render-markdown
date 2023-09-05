SRC = src/index.ts src/render.ts

NCC = node_modules/.bin/ncc

.PHONY: all
all: dist/index.js

package-lock.json: package.json
	# Also creates node_modules/
	npm install @actions/core
	npm install @actions/github
	npm install @vercel/ncc
	npm install @types/node

dist/index.js: $(SRC) package-lock.json tsconfig.json
	$(NCC) build $<

.PHONY: clean
clean:
	rm -r dist/
	rm -r node_modules/
	rm package-lock.json
