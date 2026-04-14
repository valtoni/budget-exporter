# Build Script - Budget Exporter

Script PowerShell para gerar os pacotes da extensao (Firefox `.xpi`, Chrome/Edge `.zip`) a partir da raiz do projeto.

## Uso

```powershell
# default: Firefox
.\build.ps1

# alvo especifico
.\build.ps1 -Target firefox
.\build.ps1 -Target chrome
.\build.ps1 -Target edge

# todos os alvos de uma vez
.\build.ps1 -Target all
```

## Estrategia de manifest

- `manifest.json` — variante **Firefox** (default). E este que o Firefox carrega via `about:debugging` quando voce aponta para a pasta do projeto. Fonte canonica de `version`.
- `manifest.chrome.json` — override usado no build para Chrome/Edge. Durante o build desses alvos, ele substitui `manifest.json` dentro do pacote.

## O que o script faz

- le a versao de `manifest.json`
- cria `dist/` se necessario
- para cada alvo:
  - copia somente os arquivos necessarios para o pacote
  - exclui documentacao, controle de versao, dependencias, temporarios e `manifest.chrome.json`
  - no alvo `firefox`, o `manifest.json` vai tal qual. Nos alvos `chrome`/`edge`, o conteudo de `manifest.chrome.json` substitui `manifest.json` no pacote
  - atualiza a versao exibida em `manage.html`
  - gera `.xpi` (Firefox) ou `.zip` (Chrome/Edge) com caminhos POSIX internos
  - valida se `manifest.json` e icones estao no pacote
- abre `dist/` automaticamente fora de CI

## Nomes dos arquivos gerados

```text
budget-exporter-v1.3.0-firefox.xpi
budget-exporter-v1.3.0-chrome.zip
budget-exporter-v1.3.0-edge.zip
```

Se um arquivo com o mesmo nome existir e estiver travado, o script usa fallback automatico com timestamp:

```text
budget-exporter-v1.3.0-firefox-YYYYMMDD-HHMMSS.xpi
```

## Arquivos incluidos

- `manifest.json` (Firefox: direto; Chrome/Edge: substituido pelo conteudo de `manifest.chrome.json`)
- `*.js`
- `*.html`
- `*.css`
- `icons/`
- assets locais necessarios para a UI, como `bootstrap.min.css` e `bootstrap.bundle.min.js`

## Arquivos excluidos

- `*.md`, `*.txt`
- `.git*`
- `node_modules/`, `dist/`
- `*.log`, `*.tmp`, `.idea/`
- `*.ps1`
- `manifest.chrome.json` (o build injeta seu conteudo em `manifest.json` para os alvos Chrome/Edge)

## Solucao de problemas

### Erro: nao e possivel executar scripts

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Erro: manifest.json nao encontrado

Execute o script na raiz do projeto, onde estao `manifest.json` e `manifest.chrome.json`.

### Quero validar o conteudo do pacote

```powershell
Expand-Archive -Path dist\budget-exporter-*-firefox.xpi -DestinationPath temp-check
Get-ChildItem -Path temp-check -Recurse
Remove-Item temp-check -Recurse
```

## Teste local

### Firefox

1. Abra `about:debugging`.
2. Clique em `Este Firefox`.
3. Clique em `Carregar extensao temporaria`.
4. Selecione o `.xpi` gerado.

### Chrome

1. Abra `chrome://extensions`.
2. Ative `Modo de desenvolvedor` (canto superior direito).
3. Descompacte o `.zip` em uma pasta.
4. Clique em `Carregar sem compactacao` e selecione a pasta.

### Edge

1. Abra `edge://extensions`.
2. Ative `Modo de desenvolvedor`.
3. Descompacte o `.zip` em uma pasta.
4. Clique em `Carregar sem compactacao` e selecione a pasta.

## Publicacao

- Firefox: envie o `.xpi` em https://addons.mozilla.org/developers/
- Chrome: envie o `.zip` no Chrome Web Store (https://chrome.google.com/webstore/devconsole)
- Edge: envie o `.zip` no Microsoft Edge Add-ons (https://partner.microsoft.com/dashboard/microsoftedge)

## Versionamento

1. Edite `manifest.json` e `manifest.chrome.json` atualizando `version` nos dois (devem coincidir).
2. Rode `.\build.ps1 -Target all`.

Os nomes dos arquivos serao atualizados automaticamente.

## Teste local direto da pasta (dev mode no Firefox)

Como `manifest.json` e a variante Firefox, voce pode carregar a pasta inteira no Firefox sem precisar rodar o build:

1. Abra `about:debugging` → `Este Firefox` → `Carregar extensao temporaria`
2. Selecione o arquivo `manifest.json` na raiz do projeto

Isso permite iteracao rapida (edita codigo → clica `Recarregar` no about:debugging). Para Chrome/Edge nao ha essa conveniencia porque o `manifest.json` do source tem `sidebar_action`/`page_action`, chaves que o Chrome rejeita — use `.\build.ps1 -Target chrome` e carregue o `.zip` descompactado.
