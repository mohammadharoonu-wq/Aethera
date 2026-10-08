/**
 * Homepage screenshots for the portfolio cards, keyed by filename.
 *
 * A project with a screenshot needs no code change anywhere: drop
 * client/src/assets/projects/<slug>.png in place and the matching card picks it
 * up. The filename *is* the mapping, so there is no separate table to drift out
 * of sync with the files on disk, and a capture filed under the wrong name shows
 * up as a wrong filename rather than silently appearing on another project's
 * card. A slug with no file simply has no entry.
 *
 * `eager: true` resolves each image through Vite at build time and returns its
 * final fingerprinted URL — the same guarantee the explicit imports in
 * serviceBackgrounds.js give (a bare "/assets/..." string would resolve at
 * runtime and 404 in the production build), minus two lines per service. An
 * empty directory yields an empty map rather than a build error.
 *
 * The slug must match what the API returns for the item — that is what
 * PortfolioCard looks up. A name that matches nothing falls back to the card's
 * placeholder.
 */
const modules = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const PROJECT_SCREENSHOTS = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [
    // "…/projects/animal-super-store.png" -> "animal-super-store"
    path.slice(path.lastIndexOf("/") + 1).replace(/\.[^.]+$/, ""),
    url,
  ]),
);

export const projectScreenshot = (slug) => PROJECT_SCREENSHOTS[slug] ?? null;

export default PROJECT_SCREENSHOTS;
