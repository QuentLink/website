# QuentLink website

A clean, light, single-page site with About, Roadmap ("coming soon"), and Contact
sections, ready to publish via GitHub Pages and connect to your existing
`quentlink.com` domain on Cloudflare.

## Files

```
index.html      – all page content/sections
styles.css      – design system + layout
script.js       – mobile nav, hero demo animation, contact form submit
assets/favicon.svg
CNAME           – tells GitHub Pages to serve this on www.quentlink.com
```

## 1. Before you push: things to edit

- **Contact form** — in `index.html`, find:
  `action="https://formspree.io/f/YOUR_FORM_ID"`
  Sign up free at https://formspree.io, create a form, and swap `YOUR_FORM_ID`
  for your real endpoint. Without this the form will show an error on submit.
- **Email** — `hello@quentlink.com` appears twice (mailto link + visible text).
  Update if that's not the address you want to use.
- **Social links** — X/Twitter, LinkedIn, and GitHub links currently point to
  `quentlink` placeholder handles. Update the three `href`s in the Contact
  section to your real profiles (or delete the ones you don't have yet).
- **About Us copy** — I wrote a draft based on your site's current tagline
  ("Ask anything. Get what's true."). Swap in your real founding story, team,
  and any details you want public.
- **Roadmap items** — the four items and their status tags ("In development,"
  "Planned," "Exploring") are placeholders. Edit freely to match reality.

## 2. Push to GitHub

```bash
cd quentlink-site
git init
git add .
git commit -m "Initial QuentLink website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quentlink.git
git push -u origin main
```

(Create the empty repo first at https://github.com/new — no README/license,
so it doesn't conflict with this push.)

## 3. Turn on GitHub Pages

1. In the repo: **Settings → Pages**
2. Under "Build and deployment," set **Source** to `Deploy from a branch`
3. Branch: `main`, folder: `/ (root)` → **Save**
4. Under "Custom domain," enter `www.quentlink.com` and save
   (this matches the `CNAME` file already in the repo — GitHub will confirm
   the domain automatically once DNS is set in step 4)
5. Check **Enforce HTTPS** once it becomes available (can take a few minutes)

## 4. Point Cloudflare at GitHub Pages

In your Cloudflare dashboard, under **DNS** for `quentlink.com`, replace
whatever records currently point to your placeholder page with:

| Type  | Name | Content                  | Proxy status |
|-------|------|---------------------------|--------------|
| CNAME | www  | `YOUR_USERNAME.github.io` | DNS only\*   |
| A     | @    | `185.199.108.153`          | DNS only\*   |
| A     | @    | `185.199.109.153`          | DNS only\*   |
| A     | @    | `185.199.110.153`          | DNS only\*   |
| A     | @    | `185.199.111.153`          | DNS only\*   |

\*Set the proxy status (the little cloud icon) to **DNS only (grey)** at
first so GitHub can verify domain ownership and issue the HTTPS certificate.
Once "Enforce HTTPS" is working in GitHub Pages settings, you can switch it
back to **Proxied (orange)** if you want Cloudflare's CDN/proxy features.

Under **SSL/TLS**, set the encryption mode to **Full** (not Flexible), so
Cloudflare doesn't create a redirect loop with GitHub's own HTTPS.

DNS changes can take a few minutes up to ~24 hours to propagate.

## 5. Redirecting the bare domain

Since the `CNAME` file points Pages at `www.quentlink.com`, visitors to plain
`quentlink.com` should redirect to the `www` version. Cloudflare's **Rules →
Redirect Rules** can do this in one rule (`quentlink.com/*` → `https://www.quentlink.com/$1`),
or GitHub Pages will often handle it automatically once both the `A` records
and `CNAME` record above are in place.

---

Once it's live, let me know if you'd like more pages added later (blog,
docs, careers, etc.) — the structure here is built to extend easily.
