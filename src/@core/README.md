# Micro Videos: @core

`@core` is the core application from the micro-servise micro-videos management system.

## Run with Docker

```bash
docker-compose up --build -d    # build a new container
docker-compose exec app bash    # access docker container
```

### Tip: VSCode Remote container

This project can be run through the vscode remote-container extension

---

## Manual commands

### Housekeeping

```bash
npm run clean:tsc     # remove TS compilation file
npm run clean:all     # remove volatile files and folders
```

### Code quality

```bash
npm run tsc:check     # verify TS compilation erros
npm run test:cov      # run test coverage
```

### Install and exection

```bash
npm install           # project installation
```

## Development mode

Needing to update the `index.ts` files that define the absolute export of the `@core` module folders so that they can be imported into the `nestjs` module, give permission and execute the command:

```bash
sudo chmod +x ./scripts/cti.sh
npm run cti:@core
```
