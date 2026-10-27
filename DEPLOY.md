# Deployment — Tools-Site

**Live:** <https://fineraystudio.github.io/tools-site/>
**Pengurus Bayaran listing:** <https://fineraystudio.github.io/tools-site/pengurus-bayaran/>
**Repo:** <https://github.com/fineraystudio/tools-site> (account: `fineraystudio`)

## How it is deployed

Two branches in the same repository:

| Branch | Contents |
| --- | --- |
| `main` | Next.js source. This is what you edit. |
| `gh-pages` | Static export (`out/`), served by GitHub Pages from `/` |

GitHub Pages serves `gh-pages` at the root. `next.config.ts` sets `basePath` and `assetPrefix`
to `/tools-site`, so every asset URL stays inside the project path.

## Redeploy after a change

```sh
cd C:\Users\User\Documents\GitHub\autobots-lab\tools-site
npm run build

# refresh the static branch (out/ is wiped by the build, so recreate its repo)
cd out
touch .nojekyll
git init -q -b gh-pages
git -c core.autocrlf=false add -A
git -c core.autocrlf=false commit -m "Deploy tools-site"
git remote add origin https://github.com/fineraystudio/tools-site.git
git push -f origin gh-pages
```

Then commit and push the source changes on `main`:

```sh
cd ..
git add -A
git commit -m "…"
git push origin main
```

Pages rebuilds in about a minute. Check <https://fineraystudio.github.io/tools-site/>.

## Notes

- `.nojekyll` must exist on `gh-pages` or Pages will hide the `_next/` folder.
- `out/` is gitignored on `main`; only the `gh-pages` branch carries the build.
- The same account (`fineraystudio`) hosts the app itself at
  <https://github.com/fineraystudio/pengurus-bayaran>.
