# extract-colors website

Website and examples of the lib [extract-colors](https://www.npmjs.com/package/extract-colors).

![](https://raw.githubusercontent.com/Namide/extract-colors/master/doc/colors-2.jpg)

[extract-colors.namide.com](https://extract-colors.namide.com/)

## Use examples

You can find some examples of codes with differents environments in the `examples/` directory.

## Setup

```sh
# Project Setup
git submodule update --init
git -C ./extract-colors checkout master
git -C ./extract-colors pull
npm install --prefix ./extract-colors
npm install

# Compile and Hot-Reload for Development
npm run build --prefix ./extract-colors
cp -r extract-colors node_modules/extract-colors
npm run dev

# Type-Check, Compile and Minify for Production
npm run build --prefix ./extract-colors
cp -r extract-colors node_modules/extract-colors
npm run build
```