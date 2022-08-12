# MICRO-VIDEOS

Microservice from videos platform management

## Project concept

This is a monorepo project splited into a core named `@core` and a external layer named `nestjs`, where:

`@core` have the application domain rules.

`nestjs` have external layers to be shared.

This monorepo is based at the [new npm feature workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) that allows to configure several projects to be executed from a single entry point

---

## Install and execution

### Docker

```bash
sudo chmod +x .docker/start.sh    # give folder permition
docker-compose up --build -d      # execute container
docker-compose exec app bash      # access container
```

### Manually

```bash
npm install

... to be defined ...
```

---

## Executing project scripts

### To a single project

```bash
npm run <script> -w <project_name_from_package_json>    
npm i <npm_package> -w <project_name_from_package_json>
```

exemples:

```bash
npm run test:watch -w mvt-core
npm install axios -w mvt-nest
```

### To all projects

```bash
npm run <script> --workspaces
```

exemple:

```bash
npm run test --workspaces
```
