# Ace of Fades Barbershop 💈

> A slick, modern, dark-themed landing page and appointment booking web application for **Ace of Fades Barbershop** located at **1512 Harrison St, Wichita Falls, TX 76309**.

![Ace of Fades Barbershop](https://raw.githubusercontent.com/user/repo/main/public/preview.jpg)

---

## 📍 Location & Details

- **Address**: 1512 Harrison St, Wichita Falls, TX 76309
- **Phone**: [(940) 767-3233](tel:9407673233)
- **Rating**: 4.8 / 5.0 (101 Verified Google & Local Reviews)
- **Specialties**:
  - Precision Skin Fades, Mid/High Tapers & Scissor Tops
  - Sculpted Beard Trims with Hot Lather & Straight-Razor Edge
  - Traditional Steamed Eucalyptus Hot Towel Shaves
  - Royal Combos & Young Gentleman Cuts

---

## 🚀 How to Deploy to GitHub Pages

This project is pre-configured with `base: './'` in `vite.config.ts` and includes an automated **GitHub Actions** workflow (`.github/workflows/deploy.yml`).

### Step 1: Push this code to a GitHub Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit of Ace of Fades Barbershop website"

# Create a new repository on GitHub (e.g. ace-of-fades)
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in your repository settings

1. On GitHub, go to your repository **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every time you push to `main`, GitHub Actions will automatically compile the site and deploy it.
5. Your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

### (Optional) Custom Domain
If you have a custom domain (e.g. `aceoffadeswf.com`):
1. In repository **Settings** > **Pages** > **Custom domain**, enter your domain.
2. Update your DNS provider with GitHub's A records or CNAME.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🛠 Tech Stack

- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide Icons**
- **GitHub Actions CI/CD**
