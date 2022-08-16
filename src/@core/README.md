# Micro Videos: @core

`@core` is the core application from the micro-servise micro-videos management system.

This app is installed and executed from the [root folder](../../README.md), but if necessary it can be run from this point:

```bash
npm install             # project installation
npm run build:watch     # start the app in watch mode
```

## Development mode

Needing to update the `index.ts` files that define the absolute export of the `@core` module folders so that they can be imported into the `nestjs` module, give permission and execute the command:

```bash
sudo chmod +x ./scripts/cti.sh
npm run cti:@core
```
