# COMMANDS TO ALL PROJECTS

test-all:
	@npm run test --workspaces


# COMMANDS TO '@core' PROJECT

build-core:
	@npm run build -w mvt-core

test-core:
	@npm run test -w mvt-core

# COMMANDS TO 'nestjs' PROJECT

build-nestjs:
	@npm run build -w mvt-nest

start-dev-nestjs:
	@npm run start:dev -w mvt-nest
