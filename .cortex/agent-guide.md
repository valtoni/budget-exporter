# Cortex — Authoring Guide

Read this ONLY when creating or maintaining knowledge records. The hot path
(resolving context for a task) never needs this file — see the bootstrap.

## Runtime interface

Prefer Cortex MCP tools when the host exposes them. For CLI operations,
use `.cortex\bin\cortex.exe` on Windows or
`.cortex/bin/cortex` on POSIX. Every `<cortex>` below means that
pinned native executable. npm and the host project's build tooling are not
part of the protocol.

## Golden rules

- **Metadata points; the body informs.** Frontmatter carries identity and
  retrieval signals. The decision, rule, or explanation lives in the Markdown
  body — never copy summaries, status, or conclusions into the frontmatter.
- **One canonical source per fact.** Other documents relate to it through
  typed relations; they never copy it.
- **Default deny.** Only documents with `memory.index: true` participate in
  retrieval. Everything else is invisible to the resolver.
- **Records are born curated.** The validator fails a searchable decision
  without tags, aliases, and declared sections, and a rule without trigger
  aliases. Fix the record, not the validator.

## Frontmatter grammar

Add a `memory:` block at the very top of the document:

```yaml
---
memory:
  id: decision.adr-012            # <kind>.<slug> — lowercase, stable
  kind: decision                  # closed set from .cortex/ontology.yaml
  index: true                     # opt-in to retrieval (default deny)
  tags: [work-order, execution]
  aliases: [start work order, iniciar ordem de serviço]   # TRIGGER phrases (pt/en)
  surfaces: [backend]             # task surfaces this record governs
  relations:
    - type: part_of
      target: initiative.init-001
    - type: governed_by
      target: contract.backend
  sections:
    - heading: Decision
    - heading: Consequences
---
```

- `id` grammar: `<kind>.<slug>` (`^[a-z_]+\.[a-z0-9][a-z0-9-]*`).
- `aliases` are curated trigger phrases — they outweigh lexical statistics.
  Write them the way a task would mention the record, in every language your
  team uses.
- `sections` is the authorization list: ONLY declared headings can ever be
  materialized into an agent's context. Undeclared content stays private to
  human readers.

## Kinds (product profile)

| Kind | Use for |
|---|---|
| `initiative` | Objective/scope bundle that groups related records |
| `decision` | An architectural decision — nothing else (not plans, not reports) |
| `contract` | A binding surface contract (backend, UI, security, …) |
| `rule` | A short NEVER/ALWAYS operational rule with trigger aliases |
| `use_case` / `component` / `domain` / `concept` | Observable behavior and structure |
| `investigation` | Research/evidence that supports a decision (`supports` relation) |
| `incident` / `history` | What happened; retrievable precedent, never authority |
| `work` / `blocker` | Active work state and external blockers |

The set is CLOSED by the ontology. A new kind is an ontology change, reviewed
by a human — never invented in frontmatter.

## Relations and evolution

- Declare each semantic relation ONCE; the inverse is derived by the engine.
- Evolution is explicit: `supersedes`/`superseded_by`, `extends`/`extended_by`,
  `amends`/`amended_by`. Never model lineage with `related_to` (last resort).
- A decision's lifecycle (`proposed`/`accepted`/`in_progress`/`implemented`/
  `obsolete`/`superseded`) is DERIVED from the document body (`## Status`
  heading) — never declared in frontmatter.
- Superseded/obsolete records remain searchable as precedent but are never
  presented as current authority; the resolver labels them.

## Work-state discipline (`work` / `blocker` nodes)

The catalog answers "what is in flight?" — and it only answers correctly if
nodes are born WITH the work, not reconstructed later.

- **A front born ⇒ a node born, same session.** Any new initiative, feature
  front, infra effort, or external blocker gets its `work.<slug>` /
  `blocker.<slug>` node the moment it starts. If a working-set file mentions
  a front that has no node, the catalog is stale — that is a defect, fix it
  in the session that finds it.
- **Entry and working-set files are POINTERS.** Harness files (AGENTS.md,
  CLAUDE.md, …) and any session working-set file carry one line per front —
  the node id and nothing else. Status, progress notes, and pending items
  live in the node body (or the canonical source it points to). Never let
  session prose accumulate in pointer files.
- **Budgets are the tripwire.** The scaffolded config gates entry files with
  token budgets (`budgets:` in `.cortex/config.yaml`); `check` fails
  when prose leaks into a pointer file. The fix is ALWAYS moving content to
  its owning node — never raising the budget.
- **Status lives at ONE source.** The node either carries the status itself
  (fronts without a formal record) or points to the record that does
  (decision/envelope). Never both.

## Creating a rule from a mistake

A logic error, a broken pattern, or a hallucinated fact means a rule is
missing from the harness. In the same session, add
`memory/rules/<slug>.md` (or your project's rules root) with kind `rule`,
`index: true`, TRIGGER aliases (the phrases that should have surfaced it),
a `learned_from` relation to the originating record, and a body with
`## Rule` (≤2 lines, NEVER/ALWAYS), `## When to apply`, `## Origin`.

## Retrieval corpus

`.cortex/retrieval-corpus.yaml` holds deterministic cases used by
`<cortex> evaluate`. Whenever a retrieval miss bites you, add a case:

```yaml
cases:
  - task: "implement offline progress tracking"
    top3: [decision.adr-012]
    forbidden: [contract.security]
    surfaces: [backend]
```

## Cold path (after every documentation change)

```
<cortex> build --project .      # rebuild the logical graph
<cortex> check --project .      # validation + coverage — loop until green
<cortex> evaluate --project . --corpus .cortex/retrieval-corpus.yaml
<cortex> workspace reconcile --project .   # when workspace: is enabled; publish the committed generation
```

Green `check` is the precondition for concluding any task that touched
canonical documents. The `.ctxdb` database is a rebuildable cache. `workspace
reconcile` publishes the current committed generation; `repair` recovers a
damaged database but is not a schema migration command.

## Workspace Semantic Engine (WSE)

Active only when `.cortex/config.yaml` declares a `workspace:` block
(observation globs). The MCP schemas and `<cortex> workspace --help` expose the
runtime contract. What it changes for you as an agent:

- **Never grep/scan the repository.** Query the committed model:
  `SYMBOL "<name>" [WHERE LANG IN [...] AND KIND IN [...]]`, `FILES "<glob>"`,
  `WORKSPACE STATUS`, `FROM code.symbol:<qname> TRAVERSE imports, contains`,
  `CONTEXT "<task>" BUDGET CHARS n LIMIT n INCLUDE CODE`. Over MCP use
  `code_search` / `code_context` (bodies are fingerprint-verified; stale files
  come back flagged, never wrong).
- **Before architectural analysis or a cross-surface change**, call
  `memory_architecture` (CLI: `<cortex> workspace architecture --project . --theme
  "<theme>"`). It returns the committed domain/application/API/persistence/
  frontend/mobile/data/test map and its semantic edges in one operation. Use
  follow-up searches only for the explicit gaps it reports.
- **Sign your work** (authorship is never invented): open an attribution
  marker before editing code and close it when done —
  `<cortex> workspace changeset open --project . --actor <you> --origin agent [--label <ticket>]`.
  Every reconciliation while it is open is attributed to you, including the
  symbol-level changes (added/modified/removed/renamed).
- **Record executions**: run tests/builds through
  `<cortex> workspace exec --project . --kind test -- <command>` (exit code is
  mirrored) or report finished runs with `<cortex> workspace execution-record`.
- **History and blame**: `<cortex> workspace history --project .` lists ChangeSets;
  `<cortex> workspace blame --project . code.symbol:<qname>` returns the chain that touched a
  symbol, following renames. Over MCP: `workspace_history`, `code_blame`.
- **Cross-graph curation**: to confirm a doc↔code relation, add it to
  the record's frontmatter — `relations: [{type: implemented_by, target:
  code.symbol:<qname>}]` (or `code.file:<path>`). The relation type must exist
  in the project ontology. A target missing from the current workspace is a
  WARNING, not an error. The `code-link-report.md` beside the database lists
  *proposals* (symbol mentions in docs): promote them via frontmatter only.
- Consistency per query: append `CONSISTENCY strict` when you must not read a
  stale workspace (default comes from the config; `warn` annotates drift).
- **Semantic neighbors (optional)**: when the project maintains the vectors
  sidecar (`<cortex> embed`), use `memory_similar` (MCP) or
  `<cortex> similar --to <id>` to find docs/symbols semantically close to
  a known unit — deterministic and offline. Never call embedding providers
  yourself in the hot path.
- **History via CQL (v3)**: `CHANGESETS LIMIT n`, `EXECUTIONS LIMIT n`,
  `BLAME "code.symbol:<qname>" LIMIT n` work in any CQL surface (query, REPL,
  MCP `memory_query`). `EXPAND SIMILAR n` widens results with stored-vector
  neighbors (offline). `SEMANTIC` fuses the ranking with a query embedding —
  it requires the project to configure `workspace.vectorsProvider` and is the
  only clause that calls a provider; expect a typed error when unavailable.
- **Coverage**: run tests with `<cortex> workspace exec --project . --coverage <lcov> -- <cmd>` so
  the execution records which symbols it exercised;
  `<cortex> workspace exercises --project . code.symbol:<qname>` lists the executions that covered
  a symbol.

## First curation session (workspace day one)

When a project has just enabled the `workspace:` block, run this once:

1. Analyze the architecture even when the project is only one library. Use
   extracted symbols, imports, tests, schemas/DML, build files and documents as
   evidence; choose vocabulary that belongs to THIS project, complete
   `.cortex/architecture.yaml`, and set `status: confirmed`. Every observed
   resource must match a rule. Names like `core`, `service`, `lib`, or `index`
   are clues, never universal layer definitions.
2. `<cortex> workspace reconcile --project . --full --verify` — first committed
   generation, with the incremental ≡ full self-check and complete
   reclassification.
3. Read `code-link-report.md` (beside the database). It has three layers:
   *confirmed* (frontmatter curation), *deterministic candidates*
   (doc sources pointing at observed paths) and *proposals* (symbol mentions
   found in doc sections).
4. Promote the proposals that are REAL relationships by adding them to the
   record's frontmatter (`relations: [{type: implemented_by, target:
   code.symbol:<qname>}]`) — the relation type must exist in the project
   ontology; never edit the report itself. Re-run `<cortex> check --project .`.
5. If the team uses embeddings, populate the sidecar once
   (`<cortex> embed --provider ...`) — later runs are incremental.
6. From then on, always work signed (`<cortex> workspace changeset open`) and run
   tests through `<cortex> workspace exec --coverage` so blame and exercises stay
  trustworthy.

## Continuous architecture reclassification

Before publishing a changed workspace, compare the committed architecture with
the current graph. A new source root, package or module split/merge, moved
responsibility, dependency reversal, new integration surface, schema boundary,
or changed public API is architectural drift. Update
`.cortex/architecture.yaml` in the same changeset and run a full verified
reconcile. Cortex observes the definition itself, fingerprints it into the
manifest, reapplies its ordered rules to every resource, and fails closed when
anything is uncovered. A more capable LLM may refine the interpretation later;
that refinement is a normal versioned reclassification, not a Cortex rebuild.

## Language coverage and self-discovery

`init` and migration create a project-owned
`.cortex/language-catalog.json` and enable
`workspace.languages.autoDiscover`. A reconcile performs a local audit of all
observed text before publishing; it never downloads or trusts a parser by
itself. `requireCoverage: true` makes an unknown grammar fail closed instead of
silently keeping the file without symbols.

When the audit finds an uncovered extension or filename:

1. Run `<cortex> languages discover --project . --json`. A suggestion means the
   project catalog already knows a pack; `unsupported` means the agent must add
   one to that catalog (or point `workspace.languages.catalog` at a reviewed
   HTTPS catalog).
2. Install the suggested pack explicitly with
   `<cortex> languages discover --project . --install --allow <pack>`; or author a
   project-local pack containing `pack.toml`, `grammar.wasm`, Tree-sitter
   queries and BLAKE3 hashes, then install it with `<cortex> languages add`.
   Keep downloads and staging inside `.cortex/state/tmp` of the project
   (`target/tmp` when developing cortex), never in a global OS temp/cache.
   Never make support depend on recompiling the cortex executable.
3. Run `<cortex> workspace reconcile --project . --full --verify`. This step is
   mandatory: it reprocesses and includes the files that had no symbols before
   the pack existed. Confirm with `SYMBOL`/`FILES` queries.
4. Only when a reviewed format genuinely has no useful symbol structure, add
   its extension or filename to `workspace.languages.fileOnly`. This is a
   versioned architecture decision, not an escape hatch for source code.

Repeat this workflow whenever a new generated/source/test/data/build language
appears in `workspace.observe`; tests, DML, schemas, scripts and infrastructure
are subject to the same coverage rule as application code.
