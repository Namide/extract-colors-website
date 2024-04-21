dev:
	python3 -m webbrowser http://localhost:3000/
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3000\:3000 \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		bash -c "cd extract-colors; npm i ; npm run build ; npm link ; cd ../ ; npm i ; npm link extract-colors ; npm run serve"

build:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		node:slim \
		npm run build

code:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:3001 \
		node:slim \
		bash

links:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		node:slim \
		bash -c "cd extract-colors; npm i ; npm run build ; npm link ; cd ../ ; npm i ; npm link extract-colors ; cd examples/browser-cjs ; npm i ; npm link extract-colors ; cd ../browser-mjs ; npm i ; npm link extract-colors ; cd ../node-cjs ; npm link extract-colors ; cd ../node-mjs ; npm link extract-colors"

rootcode:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:3001 \
		node:slim \
		bash