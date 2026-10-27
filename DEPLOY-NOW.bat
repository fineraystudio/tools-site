@echo off
REM Deploy tools-site to GitHub Pages
REM Run this after Farid creates the faridrameli/tools-site repository

cd /d C:\Users\User\Documents\GitHub\autobots-lab\tools-site

echo.
echo === Deploying tools-site to GitHub Pages ===
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin https://github.com/faridrameli/tools-site.git
)

echo Pushing to GitHub...
git push -u origin master
if errorlevel 1 (
    echo.
    echo FAILED: Could not push to GitHub
    echo.
    echo Make sure:
    echo 1. Repository faridrameli/tools-site exists on GitHub
    echo 2. You have push access to the repository
    echo 3. Git authentication is configured
    pause
    exit /b 1
)

echo.
echo === SUCCESS! Code pushed to GitHub ===
echo.
echo.
echo IMPORTANT: Enable GitHub Pages now:
echo.
echo 1. Go to: https://github.com/faridrameli/tools-site/settings/pages
echo 2. Under "Build and deployment" find "Source"
echo 3. Select "GitHub Actions" from the dropdown
echo 4. GitHub Actions will automatically build and deploy
echo.
echo Your site will be live at:
echo https://faridrameli.github.io/tools-site/
echo.
echo The site includes:
echo - Home page (index.html)
echo - QR Code Generator (/qr-code.html)
echo - PDF Merge (/pdf-merge.html)
echo - Image Compressor (/image-compressor.html)
echo - Unit Converter (/unit-converter.html)
echo - Privacy Policy (/privacy.html)
echo.
echo All pages support English/Malay bilingual toggle.
echo.
pause
