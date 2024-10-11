install:
	git submodule update --init
	git -C ./extract-colors checkout master
	git -C ./extract-colors pull
	cd extract-colors && $(MAKE) install
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		npm install

dev:
	cd extract-colors && $(MAKE) build
	cp -r extract-colors node_modules
	python3 -m webbrowser http://localhost:3000/
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3000\:5173 \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:20-slim \
		npm run dev

build:
	$(MAKE) install
	cd extract-colors && $(MAKE) build
	cp -r extract-colors node_modules
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		node:20-slim \
		npm run build

examples-install:
	cd extract-colors && $(MAKE) install
	cd extract-colors && $(MAKE) build
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		node:20-slim \
		bash -c "npm install --prefix ./examples/browser-cjs; npm install --prefix ./examples/browser-es; npm install --prefix ./examples/browser-worker; npm install --prefix ./examples/node-cjs; npm install --prefix ./examples/node-mjs"
	cp -r extract-colors examples/browser-cjs/node_modules
	cp -r extract-colors examples/browser-es/node_modules
	cp -r extract-colors examples/browser-worker/node_modules
	cp -r extract-colors examples/node-mjs/node_modules
	cp -r extract-colors examples/node-cjs/node_modules

examples-dev:
	python3 -m webbrowser http://localhost:3003/
	python3 -m webbrowser http://localhost:3004/
	python3 -m webbrowser http://localhost:3005/
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3003\:3001 \
		-p 3004\:3002 \
		-p 3005\:3003 \
		node:20-slim \
		bash -c "npm run dev --prefix ./examples/node-cjs ; npm run dev --prefix ./examples/node-mjs ; npm run dev --prefix ./examples/browser-cjs & npm run dev --prefix ./examples/browser-es & npm run dev --prefix ./examples/browser-worker"

code:
	docker run -ti --rm \
		-u "node" \
		-v $(shell pwd):/usr/src/app/extract-colors \
		-w /usr/src/app/extract-colors \
		-p 3001\:5173 \
		-p 3002\:4173 \
		node:20-slim \
		bash