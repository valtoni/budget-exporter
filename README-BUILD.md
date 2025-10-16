# Build Script - Budget Exporter

Script PowerShell para criar pacote ZIP pronto para submissão na Mozilla Add-ons Store.

## Como Usar

### 1. Executar o Script

```powershell
# Na pasta raiz do projeto (onde está este README)
.\build.ps1
```

### 2. O que o script faz:

- Lê a versão do `manifest.json`
- Cria pasta `dist/` se não existir
- Copia apenas arquivos necessários
- Exclui arquivos desnecessários (.git, node_modules, etc.)
- Cria ZIP com nome versionado: `budget-exporter-v1.0.0-20250115-143022.zip`
- Valida estrutura básica (manifest, ícones)
- Exibe informações do pacote
- Abre pasta `dist/` automaticamente

### 3. Resultado

```
dist/
└── budget-exporter-v1.0.0-20250115-143022.zip
```

## Arquivos Incluídos

- `manifest.json`
- `*.js` (todos os arquivos JavaScript)
- `*.html` (todas as páginas HTML)
- `*.css` (todos os estilos)
- `*.svg` (ícones SVG)
- `icons/` (pasta de ícones)
- `content-scripts/` (scripts de conteúdo)

## Arquivos Excluídos

- `*.md` (documentação)
- `*.txt` (arquivos de texto)
- `.git*` (arquivos Git)
- `node_modules/` (dependências)
- `.DS_Store` (Mac)
- `Thumbs.db` (Windows)
- `*.log` (logs)

## Solução de Problemas

### Erro: "Não é possível executar scripts"

Execute primeiro:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Erro: "manifest.json não encontrado"

Certifique-se de estar na pasta raiz do projeto onde existe a pasta `budget-exporter/`.

### ZIP muito grande

Verifique se não há arquivos desnecessários:
```powershell
# Liste o conteúdo do ZIP
Expand-Archive -Path dist\budget-exporter-*.zip -DestinationPath temp-check
Get-ChildItem -Path temp-check -Recurse
Remove-Item temp-check -Recurse
```

## Após o Build

1. **Teste localmente:**
   - Abra Firefox
   - Digite `about:debugging` na barra de endereços
   - Clique em "Este Firefox" → "Carregar extensão temporária"
   - Selecione o arquivo ZIP criado

2. **Submeta para Mozilla:**
   - Acesse: https://addons.mozilla.org/developers/
   - Clique em "Submit a New Add-on"
   - Faça upload do ZIP
   - Preencha as informações solicitadas

## Versioning

Para atualizar a versão:

1. Edite `budget-exporter/manifest.json`
2. Altere o campo `"version": "1.0.1"`
3. Execute o script novamente

O nome do ZIP será atualizado automaticamente.
