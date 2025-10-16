# Budget Exporter

Uma extensão para Firefox que simplifica drasticamente a exportação de transações bancárias para o formato CSV compatível com YNAB (You Need A Budget).

## 🎯 Motivação

Gerenciar finanças pessoais é essencial, mas a tarefa de importar transações bancárias para ferramentas de orçamento como o YNAB pode ser extremamente **tediosa e propensa a erros**.

### O Problema

Sem esta extensão, o processo manual envolve:

1. **Acessar múltiplos sites bancários** - Login em cada banco individualmente
2. **Navegar por interfaces inconsistentes** - Cada banco tem sua própria estrutura
3. **Exportar transações** - Geralmente em formatos incompatíveis (OFX, PDF, CSV proprietário)
4. **Converter formatos** - Usar ferramentas externas ou planilhas
5. **Padronizar nomes** - Limpar e normalizar descrições de comerciantes
   - "NETFLIX.COM*ASSINATU" → "Netflix"
   - "UBER *TRIP 12345678" → "Uber"
   - "PAG*MERCADO123456" → "Supermercado"
6. **Categorizar manualmente** - Atribuir categorias para cada transação
7. **Importar no YNAB** - Upload e validação final

**Tempo estimado:** 15-30 minutos por banco, por mês
**Erros comuns:** Duplicatas, categorizações erradas, formatação inconsistente
**Frustração:** Alta 😤

### A Solução

Com o Budget Exporter, o processo se resume a:

1. **Abrir a página do banco** no Firefox
2. **Clicar no ícone da extensão**
3. **Baixar CSV pronto** - Formatado, categorizado e padronizado

**Tempo estimado:** 30 segundos
**Erros:** Praticamente zero
**Frustração:** Nenhuma 😊

## ✨ Principais Funcionalidades

### Automação Inteligente
- Extração automática de transações diretamente da página do banco
- Conversão instantânea para formato CSV compatível com YNAB
- Detecção automática do banco baseada na URL

### Gerenciamento de Regras
- **Regras de Payee**: Transforme descrições confusas em nomes limpos
  - Suporte a texto simples e expressões regulares (regex)
  - Substituição automática com grupos de captura
- **Categorização Automática**: Atribua categorias baseadas em padrões
- **Templates de Memo**: Adicione informações contextuais personalizadas

### Interface Amigável
- Página de gerenciamento integrada com Bootstrap 5.3
- Pesquisa em tempo real de regras
- Campos pesquisáveis para bancos e categorias
- Paginação automática para grandes volumes de regras
- Design responsivo e intuitivo

### Suporte a Múltiplos Bancos
- Configuração flexível por banco
- Regras específicas ou globais (aplicáveis a todos os bancos)
- Fácil adição de novos bancos

## 🚀 Como Usar

1. **Instale a extensão** no Firefox
2. **Configure suas regras** (opcional):
   - Clique no ícone da extensão
   - Acesse "Gerenciar Regras"
   - Adicione bancos, categorias e regras de payee
3. **Acesse seu banco online**
4. **Clique no ícone da extensão**
5. **Baixe o CSV** - Pronto para importar no YNAB!

## 🛠️ Desenvolvimento

### Tecnologias Utilizadas

#### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização personalizada
- **Bootstrap 5.3** - Framework CSS para UI moderna e responsiva
- **Bootstrap Icons** - Ícones vetoriais SVG

#### JavaScript
- **Vanilla JavaScript (ES6+)** - Sem dependências externas
  - Promises e Async/Await
  - Modules ES6
  - Arrow Functions
  - Destructuring
  - Template Literals
- **Web Extensions API** (Firefox)
  - `browser.storage.local` - Armazenamento persistente
  - `browser.tabs` - Manipulação de abas
  - `browser.runtime` - Comunicação entre componentes
  - Content Scripts - Injeção de código nas páginas

#### Arquitetura
- **Content Scripts** - Executam no contexto das páginas web
  - Extraem dados do DOM
  - Detectam banco automaticamente
  - Aplicam regras de transformação
- **Background Scripts** - Gerenciam eventos globais
- **Popup UI** - Interface principal da extensão
- **Management Page** - Página dedicada para configurações

### Estrutura do Projeto

```
budget-exporter/
├── manifest.json              # Configuração da extensão
├── background.js              # Script de background
├── popup.html                 # Interface principal
├── popup.js                   # Lógica do popup
├── manage.html                # Página de gerenciamento
├── manage.js                  # Lógica de gerenciamento (paginação, pesquisa)
├── manage.css                 # Estilos customizados
├── storage-manager.js         # Abstração do storage
├── icon.svg                   # Ícone principal
├── icons/                     # Ícones em vários tamanhos
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
└── content-scripts/           # Scripts por banco
    ├── koho.js                # Extrator Koho
    ├── desjardins.js          # Extrator Desjardins
    └── ...                    # Outros bancos
```

### Padrões de Código

#### Storage Manager
Abstração para gerenciamento de dados:
```javascript
await StorageManager.init();
const rules = await StorageManager.getPayeeRules();
await StorageManager.addPayeeRule({ pattern, replacement, category });
```

#### Regras de Payee
Estrutura de dados:
```javascript
{
  id: Number,              // Timestamp único
  bankId: Number,          // ID do banco (0 = todos)
  pattern: String,         // Texto ou regex
  replacement: String,     // Novo payee
  category: String,        // Categoria YNAB
  isRegex: Boolean,        // Usa regex?
  memoTemplate: String,    // Template com \1, \2, etc.
  enabled: Boolean         // Ativa/desativa
}
```

#### Content Scripts
Cada banco tem seu próprio extrator:
```javascript
function extractTransactions() {
  // 1. Seleciona elementos DOM
  // 2. Extrai dados (data, payee, valor)
  // 3. Aplica regras de transformação
  // 4. Retorna array de transações
}
```

### Build e Distribuição

#### Requisitos
- PowerShell 5.1+ (Windows)
- Firefox Developer Edition (recomendado para testes)

#### Build Automatizado

Execute o script de build:
```powershell
.\build.ps1
```

O script automaticamente:
1. Lê a versão do `manifest.json`
2. Cria diretório `dist/`
3. Copia apenas arquivos necessários
4. Exclui arquivos desnecessários (.git, .md, node_modules)
5. Gera ZIP versionado: `budget-exporter-v1.0.0-YYYYMMDD-HHMMSS.zip`
6. Valida estrutura básica
7. Exibe informações do pacote
8. Abre pasta `dist/` automaticamente

#### Estrutura do Pacote

O ZIP inclui apenas:
- `manifest.json`
- Arquivos JavaScript (`.js`)
- Arquivos HTML (`.html`)
- Arquivos CSS (`.css`)
- Ícones (`.svg`, pasta `icons/`)
- Content scripts (pasta `content-scripts/`)

Excluídos do pacote:
- Documentação (`.md`)
- Controle de versão (`.git`)
- Arquivos temporários (`.log`, `.tmp`)
- Arquivos do sistema (`.DS_Store`, `Thumbs.db`)

#### Teste Local

Antes de publicar:
```
1. Firefox → about:debugging
2. "Este Firefox" → "Carregar extensão temporária"
3. Selecionar o ZIP gerado
4. Testar todas as funcionalidades
```

#### Submissão para Mozilla

1. **Acesse:** https://addons.mozilla.org/developers/
2. **Submit a New Add-on**
3. **Escolha o tipo:**
   - **Listed**: Aparece na loja oficial (revisão manual)
   - **Self-distributed**: Distribuição própria (revisão automática)
4. **Upload do ZIP** gerado pelo build script
5. **Preencha informações:**
   - Nome, descrição, categoria
   - Screenshots (opcional mas recomendado)
   - Notas de privacidade
6. **Aguarde aprovação** (listadas) ou **assinatura automática** (self-distributed)

### Funcionalidades Técnicas Avançadas

#### Pesquisa em Tempo Real
- Filtragem de regras conforme digitação
- Validação visual (vermelho para < 3 caracteres)
- Debounce automático

#### Dropdowns Pesquisáveis
- Input + Dropdown combinados
- Filtragem dinâmica de opções
- Suporte a teclado (Ctrl+F para pesquisa global)

#### Paginação Inteligente
- 10 itens por página (configurável)
- Navegação anterior/próximo
- Ajuste automático ao remover itens
- Reset ao adicionar/editar

#### Validação de Formulários
- Verificação de banco obrigatório
- Validação de regex
- Feedback visual de erros
- Prevenção de duplicatas

### Extensibilidade

#### Adicionar Novo Banco

1. **Criar content script:**
```javascript
// content-scripts/novo-banco.js
function extractTransactions() {
  const transactions = [];
  // Sua lógica de extração aqui
  return transactions;
}
```

2. **Registrar no manifest.json:**
```json
{
  "matches": ["*://*.novobanco.com/*"],
  "js": ["content-scripts/novo-banco.js"]
}
```

3. **Adicionar na interface:**
   - Manage → Bancos → Adicionar "Novo Banco"

#### Customizar Formato de Saída

Edite a função de conversão para CSV em cada content script:
```javascript
function convertToYNABFormat(transactions) {
  // Modifique conforme necessário
  return csvString;
}
```

## 📝 Roadmap

Funcionalidades planejadas:
- [ ] Suporte para Chrome/Edge
- [ ] Importação/Exportação de regras
- [ ] Sincronização na nuvem (opcional)
- [ ] Detecção automática de duplicatas
- [ ] Dashboard com estatísticas
- [ ] Modo escuro

## 🤝 Contribuindo

Contribuições são bem-vindas! Para adicionar suporte a um novo banco:

1. Fork o repositório
2. Crie seu content script em `content-scripts/`
3. Teste localmente
4. Envie um Pull Request

## 📄 Licença

Este projeto é de código aberto. Consulte o arquivo LICENSE para detalhes.

## 🙏 Agradecimentos

- **YNAB** - Pela incrível ferramenta de orçamento
- **Bootstrap Team** - Pelo framework UI
- **Mozilla** - Pela plataforma de extensões robusta
- **Comunidade Open Source** - Por inspiração e feedback

---

Desenvolvido com ❤️ por Valtoni Boaventura para simplificar sua vida financeira.
