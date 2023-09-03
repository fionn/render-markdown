SRC = src/*.ts

.PHONY: all
all: dist/index.js

package.json:
	npm init

package-lock.json: package.json
	# Also creates node_modules/
	npm install @actions/core
	npm install @actions/github
	npm install @types/node

dist/index.js: $(SRC) package-lock.json tsconfig.json
	tsc

.PHONY: clean
clean:
	rm -r dist/
	rm -r node_modules/
	rm package-lock.json
