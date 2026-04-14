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

## O que o script faz

- le a versao de `manifest.firefox.json`
- cria `dist/` se necessario
- para cada alvo:
  - copia somente os arquivos necessarios para o pacote
  - exclui documentacao, controle de versao, dependencias, temporarios e os manifests `manifest.firefox.json` / `manifest.chrome.json`
  - usa o manifest correto (`manifest.firefox.json` ou `manifest.chrome.json`) e o renomeia para `manifest.json` no pacote
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

- `manifest.json` (derivado do `manifest.firefox.json` ou `manifest.chrome.json`)
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
- `manifest.firefox.json`, `manifest.chrome.json` (o script injeta apenas um, como `manifest.json`)

## Solucao de problemas

### Erro: nao e possivel executar scripts

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Erro: manifest.firefox.json nao encontrado

Execute o script na raiz do projeto, onde estao `manifest.firefox.json` e `manifest.chrome.json`.

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

1. Edite `manifest.firefox.json` e `manifest.chrome.json` atualizando `version` nos dois (devem coincidir).
2. Rode `.\build.ps1 -Target all`.

Os nomes dos arquivos serao atualizados automaticamente.
