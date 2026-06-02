#!/usr/bin/env node
// Single source of truth for the extension version: manifest.json.
// This script mirrors that value into every other file that names a version,
// so the project never has to update more than one place.
//
//   manifest.json       ← canonical (edit this when bumping)
//   ├─ manifest.chrome.json (synced)
//   └─ package.json         (synced)
//
// Wired as `prebuild` npm hook so it runs automatically before every build.
// Also exposed as `npm run version:sync` for manual use.

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const SOURCE = path.join(root, 'manifest.json');
const TARGETS = [
    path.join(root, 'manifest.chrome.json'),
    path.join(root, 'package.json')
];

function readJson(file) {
    return JSON.parse(readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
    // Trailing newline (POSIX) so most editors stop bickering about diffs.
    writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function main() {
    const sourceManifest = readJson(SOURCE);
    const canonical = sourceManifest.version;
    if (!canonical || typeof canonical !== 'string') {
        console.error(`✖ manifest.json has no usable "version" field.`);
        process.exitCode = 1;
        return;
    }

    const updates = [];
    for (const target of TARGETS) {
        const data = readJson(target);
        if (data.version === canonical) continue;
        const previous = data.version;
        data.version = canonical;
        writeJson(target, data);
        updates.push({ file: path.relative(root, target), from: previous, to: canonical });
    }

    if (updates.length === 0) {
        console.log(`✓ versions already in sync at v${canonical}`);
    } else {
        for (const u of updates) {
            console.log(`✓ ${u.file}: ${u.from || '(unset)'} → ${u.to}`);
        }
    }
}

main();
