import { build, context } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const watch = process.argv.includes('--watch');

const sharedOptions = {
    entryPoints: [path.join(root, 'src', 'sidebar', 'sidebar.entry.js')],
    bundle: true,
    format: 'esm',
    target: ['chrome114', 'firefox115', 'edge114'],
    outfile: path.join(root, 'sidebar.bundle.js'),
    sourcemap: false,
    minify: true,
    legalComments: 'none',
    logLevel: 'info',
    loader: {
        '.css': 'css',
        '.svg': 'dataurl',
        '.woff': 'file',
        '.woff2': 'file'
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    }
};

if (watch) {
    const ctx = await context(sharedOptions);
    await ctx.watch();
    console.log('esbuild: watching for changes...');
} else {
    await build(sharedOptions);
    console.log('esbuild: build complete.');
}
