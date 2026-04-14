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

- `manifest.firefox.json` — usa `sidebar_action` (sidebar do Firefox) + `page_action` (icone na barra de URL ao lado da estrela) + `browser_specific_settings.gecko`
- `manifest.chrome.json` — usa `side_panel` (Chrome/Edge 114+) e `background.service_worker` puro

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
├── manifest.firefox.json
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

**Firefox**
1. rode `.\build.ps1 -Target firefox`
2. abra `about:debugging` → `Este Firefox` → `Carregar extensao temporaria`
3. escolha o `.xpi` gerado em `dist/`
4. em uma pagina de banco suportada, um icone extra aparece na barra de URL ao lado da estrela (page_action)

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
- le a versao de `manifest.firefox.json`
- escolhe o manifest correto para cada alvo e renomeia para `manifest.json` dentro do pacote
- usa nome fallback com timestamp se o arquivo anterior estiver travado
- valida `manifest.json` e icones

Leia tambem: [README-BUILD.md](README-BUILD.md)

## Extensibilidade

### Adicionar novo banco

1. crie um novo arquivo `strategy-<conta>.js`
2. implemente `extractTransactions()`
3. implemente `toCsv()` usando `BankUtils.toCsv(...)`
4. adicione o host em `manifest.firefox.json` e `manifest.chrome.json` (em `host_permissions`, `content_scripts.matches` e `web_accessible_resources.matches`)
5. registre a conta em `bank-utils.js`

## Roadmap atual

- melhorar supressao manual de sugestoes ruidosas
- ampliar bancos suportados
- melhorar documentacao em EN e FR para refletir a arquitetura MV3 atual
- adicionar testes automatizados para normalizacao e sugestoes

## Licenca

Projeto de codigo aberto. Consulte o arquivo de licenca se aplicavel.
