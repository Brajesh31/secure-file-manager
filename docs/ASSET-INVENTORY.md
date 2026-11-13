# Asset Inventory

## Tracked public assets

| Path | Format | Approx. size | Current use / review |
| --- | --- | ---: | --- |
| `public/images/background.jpg` | JPEG | 16.8 MB | Large background asset used by the visual design; optimize for web delivery |
| `public/images/Footer-Indxo-Icon.svg` | SVG | 3.4 KB | Brand-style/footer icon; confirm source and permission |
| `public/indxo-logo.webp` | WebP | 3.1 KB | Logo image; confirm it belongs in this project and is licensed |
| `public/placeholder-logo.png` | PNG | 958 B | Generic placeholder logo |
| `public/placeholder-logo.svg` | SVG | 3.2 KB | Placeholder logo vector |
| `public/placeholder-user.jpg` | JPEG | 2.6 KB | Placeholder avatar |
| `public/placeholder.jpg` | JPEG | 1.6 KB | Generic placeholder image |
| `public/placeholder.svg` | SVG | 3.2 KB | Generic placeholder used by file preview UI |

The 16.8 MB background image is disproportionately large for a dashboard page. Export a smaller, correctly dimensioned, compressed format and compare visual quality before replacing it. Avoid loading a full-resolution image when a much smaller crop is sufficient.

## Preview asset usage

`components/file-preview-dialog.tsx` renders `/placeholder.svg?height=400&width=600` for image records. This is not a preview of the selected file.

## Rights and provenance

A file being present in the repository does not establish that every use is licensed. Confirm the source and redistribution/use permission for the logo, background and decorative artwork. Do not add screenshots of actual user documents, private records or account data.

## Asset maintenance checklist

- [ ] Record the source and licence of every non-original asset.
- [ ] Optimize oversized backgrounds and thumbnails.
- [ ] Verify public paths in the production build.
- [ ] Add descriptive alt text for meaningful visual information.
- [ ] Use empty alt only for decorative imagery.
- [ ] Review crop, contrast and responsive behaviour.
