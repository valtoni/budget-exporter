# Build Script - Budget Exporter

Script PowerShell para gerar o pacote `.xpi` da extensao Firefox a partir da raiz do projeto.

## Uso

```powershell
.\build.ps1
```

## O que o script faz

- le a versao de `manifest.json`
- cria `dist/` se necessario
- copia somente os arquivos necessarios para o pacote
- exclui documentacao, controle de versao, dependencias e temporarios
- atualiza a versao exibida em `manage.html`
- gera um `.xpi` com caminhos POSIX internos
- valida se `manifest.json` e icones estao no pacote
- abre `dist/` automaticamente fora de CI

## Nome do arquivo gerado

Nome preferido:

```text
budget-exporter-v1.2.0.xpi
```

Se um arquivo com esse nome existir e estiver travado, o script usa fallback automatico com timestamp:

```text
budget-exporter-v1.2.0-YYYYMMDD-HHMMSS.xpi
```

Isso evita falha de build quando um pacote anterior esta aberto, bloqueado por antivirus, ou em uso por outra ferramenta.

## Resultado esperado

```text
dist/
└── budget-exporter-v1.2.0.xpi
```

ou, em caso de fallback:

```text
dist/
└── budget-exporter-v1.2.0-YYYYMMDD-HHMMSS.xpi
```

## Arquivos incluidos

- `manifest.json`
- `*.js`
- `*.html`
- `*.css`
- `icons/`
- assets locais necessarios para a UI, como `bootstrap.min.css` e `bootstrap.bundle.min.js`

## Arquivos excluidos

- `*.md`
- `*.txt`
- `.git*`
- `node_modules/`
- `dist/`
- `*.log`
- `*.tmp`
- `.idea/`
- `*.ps1`

## Solucao de problemas

### Erro: nao e possivel executar scripts

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Erro: manifest.json nao encontrado

Execute o script na raiz do projeto, onde esta `manifest.json`.

### O arquivo `.xpi` antigo esta travado

Nao e mais necessario apagar manualmente. O script passa a gerar um novo nome com timestamp automaticamente.

### Quero validar o conteudo do pacote

```powershell
Expand-Archive -Path dist\budget-exporter-*.xpi -DestinationPath temp-check
Get-ChildItem -Path temp-check -Recurse
Remove-Item temp-check -Recurse
```

## Teste local

1. Abra `about:debugging` no Firefox.
2. Clique em `Este Firefox`.
3. Clique em `Carregar extensao temporaria`.
4. Selecione o arquivo `.xpi` gerado.
5. Teste o fluxo da sidebar e a pagina `manage.html`.

## Publicacao

1. Acesse https://addons.mozilla.org/developers/
2. Envie o `.xpi` gerado
3. Preencha metadados, privacidade e capturas de tela

## Versionamento

1. Edite `manifest.json`
2. Atualize `version`
3. Rode `build.ps1`

O nome do `.xpi` sera atualizado automaticamente.
