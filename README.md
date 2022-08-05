# MICRO-VIDEOS

Micro serviço do admin de gerenciamento de vídeos

## Execução do projeto com Docker

```bash
docker-compose up --build -d    # cria e sobe um novo container
docker-compose exec app bash    # acessa o volume docker executado
```

## Dica: Remote container (vscode)

Caso tenha instalado a instenção do vscode, remote container, a execução do projeto pode ser feita através dela ao invés de subir manualmente o ambiente no docker.

---

## Comandos manuais

### Limpeza do projeto

```bash
npm run clean:tsc     # remove arquivo de compilação do TypeScript
npm run clean:all     # remove as pastas node_modules, coverage e o arquivo package-lock.json
```

### Qualidade do código

```bash
npm run tsc:check     # verifica erros de compilação no TypeScript
npm run test:cov      # executa e verifica a cobertura de testes
```

### Instalação e execução do projeto

```bash
npm install           # executa a instalação do projeto
```

## Mode de desenvolvimento

Havendo necessidade de atualizar os arquivos `index.ts` que definem a exportação absoluta das pastas do módulo `core` para que possam ser importadas dentro do modulo `nest`, dê permissão e execute o comando:

```bash
chmod +x ./script/cti.sh
npm run cti:@core
```
