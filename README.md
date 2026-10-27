# Tools Site — Bilingual Web Tools

A collection of standalone web tools with English and Malay (Bahasa Melayu) language support.

## Tools Included

1. **QR Code Generator** (`/qr-code`)
   - Generate QR codes from text or URLs
   - Adjustable size and error correction
   - Download as PNG
   - Malay: "Penjana Kod QR"

2. **PDF Merge** (`/pdf-merge`)
   - Merge multiple PDF files into one
   - Client-side processing (no upload to server)
   - Drag and drop interface
   - Malay: "Gabung PDF"

3. **Unit Converter** (`/unit-converter`)
   - Convert between different units
   - Categories: Length, Weight, Temperature, Volume, Area
   - Real-time conversion
   - Malay: "Penukar Unit"

4. **Image Compressor** (`/image-compressor`)
   - Reduce image file size in the browser while keeping quality
   - Malay: "Kompres Gambar"

5. **Pengurus Bayaran** (`/pengurus-bayaran`)
   - Listing page for the Malay monthly payment tracker (a separate PWA)
   - Screenshots, features, FAQ, Zakat and Hijri highlights, privacy link
   - Malay-first copy with an English toggle; "Open the app" links to the PWA

6. **Privacy Policy** (`/privacy`)
   - Bilingual privacy information
   - Explains client-side processing

## Features

- **Bilingual**: Toggle between English and Malay
- **Client-side**: All processing happens in your browser
- **Privacy-focused**: No data sent to servers
- **Responsive**: Works on desktop and mobile
- **Static export**: Optimized for GitHub Pages

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Libraries: pdf-lib, pdfjs-dist, qrcode

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Output directory: ./out
```

## Deployment

See [DEPLOY.md](./DEPLOY.md) for GitHub Pages deployment instructions.

## License

MIT License - see [LICENSE](./LICENSE)

Based on [crazy-util](https://github.com/faridrameli/crazy-util) (MIT)

All dependencies are MIT or permissive licenses:
- Next.js, React (MIT)
- pdf-lib (MIT), pdfjs-dist (Apache-2.0)
- qrcode (MIT), lucide-react (ISC)
- Tailwind CSS (MIT)
