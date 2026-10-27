# Tools-Site — Ready for Your Review & Approval

**Bait ID:** #2 (crazy-util)  
**Status:** Complete, ready to deploy and publish  
**Estimated review time:** 5-10 minutes

## Quick Summary

3 bilingual web tools (English/Malay) ready for GitHub Pages:
1. **QR Code Generator** — top search volume tool in MY/ID markets
2. **PDF Merge** — strong demand for "gabung PDF" 
3. **Image Compressor** — popular alongside PDF tools

Each tool is a standalone page with bilingual toggle. All processing happens client-side (private, fast, no uploads).

## 30-Second Checklist ✓

- [x] **Angle:** Individual tool pages in Malay + English (SEO-friendly, each ranks separately vs one big app)
- [x] **Licence:** MIT, based on crazy-util (MIT) — LICENSE file added with attribution
- [x] **Listing complete:**
  - [x] Name: Each tool has clear English/Malay name
  - [x] Privacy page: /privacy with bilingual GDPR-friendly content
  - [x] Description: Each tool page has clear descriptions
  - [!] Icon: Using default Next.js favicon (can be customized later if needed)
  - [!] Screenshots: Not needed for direct GitHub Pages deployment
- [x] **Text and visuals:** All original text, icons from lucide-react (ISC, properly credited)
- [x] **Pace respected:** GitHub Pages allows many per week

## What You Need to Do

### Step 1: Create the GitHub Repository (2 minutes)

1. Go to: https://github.com/new
2. Repository name: **tools-site**
3. Owner: **faridrameli**
4. Visibility: **Public** (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have them)
6. Click **Create repository**

### Step 2: Deploy (1 minute — automated)

Once you create the repo, I'm ready to push the code automatically. The deployment is prepared:
- Script ready: `DEPLOY-NOW.bat` (one-click push)
- GitHub Actions configured: auto-builds on every push
- Static build complete: 7 pages ready in `out/` directory

Run: `C:\Users\User\Documents\GitHub\autobots-lab\tools-site\DEPLOY-NOW.bat`

Then enable GitHub Pages:
1. Go to: https://github.com/faridrameli/tools-site/settings/pages
2. Under "Source", select: **GitHub Actions**
3. Wait 2-3 minutes for first deployment

Site will be live at: **https://faridrameli.github.io/tools-site/**

### Step 3: Review Each Tool Live (3-5 minutes)

Once deployed, visit each tool and test:

#### QR Code Generator (`/qr-code`)
- [ ] Page loads correctly
- [ ] Language toggle works (EN ↔ MS)
- [ ] Can enter text and generate QR code
- [ ] QR code displays correctly
- [ ] Can download as PNG
- [ ] Malay translation is correct: "Penjana Kod QR"

#### PDF Merge (`/pdf-merge`)
- [ ] Page loads correctly
- [ ] Language toggle works (EN ↔ MS)
- [ ] Can upload multiple PDF files
- [ ] PDFs are listed correctly
- [ ] Can reorder PDFs (drag & drop)
- [ ] Can merge and download combined PDF
- [ ] Malay translation is correct: "Gabung PDF"

#### Image Compressor (`/image-compressor`)
- [ ] Page loads correctly
- [ ] Language toggle works (EN ↔ MS)
- [ ] Can upload images (JPG, PNG)
- [ ] Compression works and shows new file size
- [ ] Can download compressed image
- [ ] Quality is acceptable after compression
- [ ] Malay translation is correct: "Kompres Gambar"

#### Home Page (`/`)
- [ ] Lists all 3 tools clearly
- [ ] Links to each tool work
- [ ] Language toggle works
- [ ] Footer shows privacy link
- [ ] Responsive design works on mobile

#### Privacy Page (`/privacy`)
- [ ] Loads correctly
- [ ] Language toggle works
- [ ] Explains client-side processing clearly
- [ ] Link back to home works

### Step 4: Approve Publication

If everything looks good:
- Reply `/approve` to publish
- Bait #2 will be marked as launched in the ledger
- Site will remain live at faridrameli.github.io/tools-site

## What's Already Done

✅ Top 3 tools built based on search evidence (MY/SG/ID markets)  
✅ Bilingual EN/MS with language toggle + localStorage persistence  
✅ Privacy page (GDPR-friendly, client-side processing)  
✅ MIT license with source attribution ("Based on crazy-util")  
✅ Static build complete (7 pages optimized)  
✅ GitHub Actions workflow configured (auto-deploy)  
✅ Deployment script ready (DEPLOY-NOW.bat)  
✅ All dependencies properly licensed (MIT/Apache/ISC)  
✅ Responsive design (desktop + mobile)  
✅ Complete README with dev/deploy instructions

## Technical Details

**Framework:** Next.js 16 (App Router) with static export  
**Languages:** TypeScript, React 19  
**Styling:** Tailwind CSS 4  
**Libraries:** pdf-lib (MIT), pdfjs-dist (Apache-2.0), qrcode (MIT), lucide-react (ISC)  
**Build output:** Static HTML/CSS/JS in `out/` directory (7 pages, ~2.5 MB total)  
**Deployment:** GitHub Actions → GitHub Pages (free, fast, reliable)

## Search Evidence (Why These 3 Tools)

1. **QR Code Generator**
   - Indonesia: 3rd globally (140K searches/month)
   - Malaysia: 6th globally (96K searches/month)
   - QR payment adoption: 95-96% in both markets
   - Malay term: "penjana kod QR"

2. **PDF Merge**
   - Strong demand for "gabung PDF" (merge) in ID/MY
   - iLovePDF & Smallpdf widely used (gap for local Malay version)
   - PDFLokal (Indonesian tool) shows local demand

3. **Image Compressor**
   - Popular alongside PDF tools
   - High visual content usage in Southeast Asia
   - Malay term: "kompres gambar"

## Next Steps After Approval

Once published, we can:
1. Add more tools (unit converter is already built, 3 more researched)
2. Monitor search rankings for "penjana kod QR", "gabung PDF", etc.
3. Add AdSense once site has 15-20 useful pages (per channel recipe)
4. Create Malay-only variants if those rank better
5. Double down with more languages (Indonesian, Arabic) if traffic is good

## Files Ready for Review

All code is in: `C:\Users\User\Documents\GitHub\autobots-lab\tools-site`

Key files:
- `out/` — 7 built HTML pages ready to serve
- `LICENSE` — MIT with source attribution
- `README.md` — Complete documentation
- `DEPLOY-NOW.bat` — One-click deployment script
- `.github/workflows/deploy.yml` — Auto-deploy configuration
- `app/` — Source code for all tools (TypeScript/React)

---

**Ready to launch.** Create the repo, run DEPLOY-NOW.bat, review the live tools, and approve. Total time: ~10 minutes.
