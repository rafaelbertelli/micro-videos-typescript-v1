buildCore:
	@npm run build -w mvt-core

buildNestjs:
	@npm run build -w mvt-nest
	
clean:
	@rm -rf node_modules
	@rm -rf ./src/@core/dist
	@rm -rf ./src/@core/node_modules
	@rm -rf ./src/nestjs/dist
	@rm -rf ./src/nestjs/node_modules

install:
	@npm install

startDev:
	@npm run start:dev

test:
	@npm run test

testCore:
	@npm run test -w mvt-core

testNest:
	@npm run test -w mvt-nest
