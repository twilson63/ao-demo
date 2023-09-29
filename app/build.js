const fs = require('fs')
const esbuild = require('esbuild')
const sveltePlugin = require('esbuild-svelte')

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

esbuild.build({
  entryPoints: ['./src/app.js'],
  mainFields: ["svelte", "browser", "module", "main"],
  conditions: ["svelte", "browser"],
  outdir: "./dist",
  format: 'esm',
  logLevel: "info",
  minify: false,
  bundle: true,
  splitting: true,
  sourcemap: "inline",
  plugins: [sveltePlugin()]
})
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

fs.copyFile('./index.html', './dist/index.html', (err) => {
  if (err) throw err;
})