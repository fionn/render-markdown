package.json:
	npm init

package-lock.json: package.json
	# Also creates node_modules/
	npm install @actions/core
	npm install @actions/github
