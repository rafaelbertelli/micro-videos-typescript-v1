# MICRO-VIDEOS

Microservice from videos platform management

## Project concept

This is a monorepo project splited into a core named `@core` and a external layer named `nestjs`, where:

`@core` have the application domain rules.

`nestjs` have external layers to be shared.

This monorepo is based at the [new npm feature workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) that allows to configure several projects to be executed from a single entry point

## Docker: Installations and execution

```bash
sudo chmod +x .docker/start.sh
docker-compose up --build -d    # build a new container
docker-compose exec app bash    # access docker container
```

## Manual project installation

```bash
npm install     # install all projects dependencies
npm install <npm_package> --workspace <project_name_from_package_json>    # install npm package into specified monorepo internal project
```

exemples:

```bash
npm i axios -w mvt-core
npm i axios -w mvt-nest
```

## Executing project script

### To a single project

```bash
npm run <script> -w <project_name_from_package_json>    
```

exemples:

```bash
npm run test:watch -w mvt-core
npm run test:cov -w mvt-nest
```

### To all projects

```bash
npm run <script> --workspaces
```

exemples:

```bash
npm run test --workspaces
```
