# Budget Exporter

Extensao multi-navegador (Firefox, Chrome, Edge) que extrai transacoes de paginas bancarias suportadas, aplica padronizacao local de payees, sugere categorias de forma deterministica e exporta CSV revisado para o YNAB.

## Visao Geral

O projeto roda em Firefox, Chrome e Edge com Manifest V3 e usa um fluxo de revisao antes da exportacao:

1. abrir a pagina do banco no navegador
2. clicar no icone da extensao na barra de ferramentas
3. revisar as transacoes na sidebar (Firefox) / side panel (Chrome, Edge)
4. ajustar payee, categoria e memo quando necessario
5. criar regras novas a partir de sugestoes locais
6. exportar o CSV revisado

Nada depende de IA, nuvem ou processamento remoto. Tudo e feito localmente no navegador, com JavaScript e `browser.storage.local` / `chrome.storage.local`.

## Principais Funcionalidades

### Sidebar de revisao
- mostra a conta detectada e o resumo da extracao
- lista transacoes com status visual: com regra, sugestao, sem regra
- permite editar payee, categoria e memo antes da exportacao
- exporta apenas os itens selecionados

### Sugestoes locais sem IA
- normaliza descricoes nao reconhecidas
- agrupa recorrencias da pagina atual
- acumula historico local de sugestoes ainda nao transformadas em regra
- sugere novas regras quando houver evidencia suficiente
- permite clicar na sugestao e abrir o formulario de regra ja preenchido

### Motor de regras
- regras por conta e regras globais
- padrao por texto simples ou regex
- substituicao de payee
- categoria opcional
- template de memo para regex com grupos de captura

### Pagina de gerenciamento
- continua disponivel em `manage.html`
- usada para manutencao mais completa de regras, categorias e contas
- suporta importacao e exportacao da base local

## Arquitetura Atual

### Manifest V3

Dois manifestos sao mantidos no repositorio e escolhidos no momento do build:

- `manifest.json` — variante **Firefox** (default). Usa `sidebar_action` (sidebar) + `page_action` (icone na barra de URL ao lado da estrela) + `browser_specific_settings.gecko`. E este que o Firefox carrega quando voce aponta para a pasta em `about:debugging`. **Fonte canonica unica de `version`** para todo o projeto.
- `manifest.chrome.json` — override para Chrome/Edge. Usa `side_panel` (Chrome/Edge 114+) e `background.service_worker` puro. Substitui `manifest.json` dentro do `.zip` durante o build. O campo `version` aqui e auto-sincronizado a partir de `manifest.json` via `scripts/sync-version.mjs`.
- `package.json` — metadados npm. O campo `version` tambem e auto-sincronizado a partir de `manifest.json` — nao edite manualmente.

Os dois compartilham:
- `manifest_version: 3`
- `background.js` rodando como service worker
- `action` abrindo a UI de revisao
- `host_permissions` para os bancos suportados

### Componentes principais
- `content.js`: extrai a pagina atual e monta o estado de revisao
- `bank-utils.js`: deteccao de conta, normalizacao, sugestoes e geracao de CSV
- `storage-manager.js`: persistencia local de regras, categorias, contas e historico de sugestoes
- `sidebar.html`, `sidebar.js`, `sidebar.css`: interface operacional do dia a dia
- `manage.html`, `manage.js`, `manage.css`: administracao completa

### Estrutura do projeto

```text
budget-exporter/
├── manifest.json
├── manifest.chrome.json
├── background.js
├── content.js
├── bank-utils.js
├── storage-manager.js
├── sidebar.html
├── sidebar.js
├── sidebar.css
├── manage.html
├── manage.js
├── manage.css
├── bootstrap.min.css
├── bootstrap.bundle.min.js
├── strategy-desjardins-bankaccount.js
├── strategy-desjardins-creditcard.js
├── strategy-koho-bankaccount.js
├── icons/
└── build.ps1
```

## Fluxo de Revisao

### Quando uma regra existente encontra o payee
- o payee final ja vem preenchido
- a categoria pode vir preenchida
- o motivo do match aparece na sidebar

### Quando nao ha regra
- a transacao fica marcada como `Sem regra`
- se houver recorrencia suficiente, ela pode virar `Sugestao`
- o usuario pode criar uma regra nova direto da transacao ou da sugestao

### Criterios atuais de sugestao
- pelo menos 2 ocorrencias na pagina atual, ou
- pelo menos 3 ocorrencias acumuladas no historico local

As sugestoes sao conservadoras para reduzir ruido.

## Como Usar

### Instalar para teste local

**Firefox** (dev mode direto da pasta — sem build)
1. abra `about:debugging` → `Este Firefox` → `Carregar extensao temporaria`
2. selecione `manifest.json` na raiz do projeto
3. para recarregar apos editar, use o botao `Recarregar` em `about:debugging`

**Firefox** (a partir do .xpi empacotado)
1. rode `.\build.ps1 -Target firefox`
2. abra `about:debugging` → `Este Firefox` → `Carregar extensao temporaria`
3. escolha o `.xpi` gerado em `dist/`

Em qualquer dos fluxos, em uma pagina de banco suportada um icone extra aparece na barra de URL ao lado da estrela (page_action).

**Chrome**
1. rode `.\build.ps1 -Target chrome`
2. descompacte o `.zip` gerado em `dist/`
3. abra `chrome://extensions`, ative `Modo de desenvolvedor`, clique em `Carregar sem compactacao` e selecione a pasta

**Edge**
1. rode `.\build.ps1 -Target edge`
2. descompacte o `.zip` gerado em `dist/`
3. abra `edge://extensions`, ative `Modo de desenvolvedor`, clique em `Carregar sem compactacao` e selecione a pasta

### Configurar regras

1. abra a extensao
2. use a sidebar para revisar e criar regras rapidas
3. abra `manage.html` quando precisar editar em massa, importar ou exportar dados

### Exportar para YNAB

1. abra a pagina do banco suportado
2. clique no icone da extensao
3. revise os itens na sidebar
4. deixe selecionadas apenas as transacoes desejadas
5. clique em `Exportar selecionados`

## Bancos Suportados

- Desjardins - Bank Account
- Desjardins - Credit Card
- Koho - Prepaid Card

## Desenvolvimento

### Stack
- HTML5
- CSS3
- JavaScript ES6+
- Firefox WebExtensions API
- Bootstrap local apenas para `manage.html`

### Persistencia local
- `payee_rules`
- `categories`
- `accounts`
- `suggestion_history`

### Exemplo de regra

```javascript
await StorageManager.addPayeeRule({
  accountId: 2,
  pattern: 'NETFLIX',
  replacement: 'Netflix',
  category: 'Assinaturas',
  isRegex: false,
  memoTemplate: ''
});
```

## Build e Distribuicao

Default (Firefox):

```powershell
.\build.ps1
```

Alvos:

```powershell
.\build.ps1 -Target firefox   # .xpi
.\build.ps1 -Target chrome    # .zip
.\build.ps1 -Target edge      # .zip
.\build.ps1 -Target all       # os tres artefatos
```

O script:
- chama `npm run build`, que dispara o `prebuild` (`scripts/sync-version.mjs`) propagando a versao canonica
- le a versao de `manifest.json`
- alvo `firefox`: empacota o proprio `manifest.json`. Alvos `chrome`/`edge`: substituem por `manifest.chrome.json`
- usa nome fallback com timestamp se o arquivo anterior estiver travado
- valida `manifest.json` e icones

### Versao do projeto (fonte canonica unica)

A versao vive em **um unico lugar**: o campo `"version"` em `manifest.json`. Para bumpar, edite la e rode `npm run build` (ou `.\build.ps1`). O hook `prebuild` chama `scripts/sync-version.mjs`, que propaga o valor automaticamente para:

- `manifest.chrome.json`
- `package.json`

Tambem da pra rodar isolado com `npm run version:sync`. Nunca edite a versao diretamente em `manifest.chrome.json` ou `package.json` — o proximo sync sobrescreve.

Leia tambem: [README-BUILD.md](README-BUILD.md)

## Extensibilidade

### Adicionar novo banco

1. adicione o host em `manifest.json` e `manifest.chrome.json` (em `host_permissions`, `content_scripts.matches` e `web_accessible_resources.matches`)
2. registre a conta em `bank-utils.js` (BANK_ALIASES, ACCOUNTS, ACCOUNT_PROCESSING)
3. logue no banco, abra a pagina de extrato e ative o modo descoberta no console:
   `localStorage.setItem('BUDGET_EXPORTER_DEBUG', '1')` e recarregue
4. no console, identifique a URL marcada como `← candidate?` (resposta JSON com array de transacoes)
5. crie `strategy-<conta>.js` exportando:
   - `apiMatchers` — array de `{ method, urlPattern }` para a(s) URL(s) identificada(s)
   - `extractFromCaptures(captures)` — normaliza o JSON para `[{date, payee, amount}]`
   - `toCsv()` usando `BankUtils.toCsv(...)`

A extracao roda exclusivamente em cima das respostas JSON capturadas — nao ha mais parsing de DOM/CSS.

## Roadmap atual

- melhorar supressao manual de sugestoes ruidosas
- ampliar bancos suportados
- melhorar documentacao em EN e FR para refletir a arquitetura MV3 atual
- adicionar testes automatizados para normalizacao e sugestoes

## Licenca

Projeto de codigo aberto. Consulte o arquivo de licenca se aplicavel.
