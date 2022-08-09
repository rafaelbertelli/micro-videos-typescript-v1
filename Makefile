# COMMANDS TO ALL PROJECTS

test-all:
	@npm run test --workspaces


# COMMANDS TO '@core' PROJECT

build-core:
	@npm run build -w micro-videos-typescript-core

test-core:
	@npm run test -w micro-videos-typescript-core

# COMMANDS TO 'nestjs' PROJECT

build-nestjs:
	@npm run build -w micro-videos-typescript-nestjs

start-dev-nestjs:
	@npm run start:dev -w micro-videos-typescript-nestjs
