dev:
	python3 -m webbrowser http://localhost:3000/
	docker run -ti --rm \
		--user $(id -u):$(id -g) \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3000\:3000 \
		-u "root" \
		node:slim \
		bash -c "cd extract-colors; npm i ; npm run build ; npm link ; cd ../ ; npm i ; npm link extract-colors ; npm run serve"

build:
	docker run -ti --rm \
		--user $(id -u):$(id -g) \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		node:slim \
		npm run build

code:
	docker run -ti --rm \
		--user $(id -u):$(id -g) \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:3001 \
		-u "node" \
		node:slim \
		bash

links:
	docker run -ti --rm \
		--user $(id -u):$(id -g) \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:3001 \
		-u "root" \
		node:slim \
		bash -c "cd extract-colors; npm i ; npm run build ; npm link ; cd ../ ; npm i ; npm link extract-colors ; cd examples/browser-cjs ; npm i ; npm link extract-colors ; cd ../browser-es ; npm i ; npm link extract-colors ; cd ../node-cjs ; npm link extract-colors"

rootcode:
	docker run -ti --rm \
		--user $(id -u):$(id -g) \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:3001 \
		-u "root" \
		node:slim \
		bash