# abdulaziztayeb.com

Game design / game development portfolio of Abdulaziz Tayeb. A static site (plain HTML, CSS and JavaScript, no build step), published with GitHub Pages at **https://abdulaziztayeb.com**.

## Project structure

```
.
├── .github/workflows/deploy.yml   Auto-deploys ./public to GitHub Pages on every push to main
├── .gitignore
├── README.md
└── public/                        <- the website (this folder is what gets published)
    ├── index.html
    ├── 404.html
    ├── CNAME                      abdulaziztayeb.com
    ├── robots.txt, sitemap.xml, .nojekyll
    ├── favicon.svg / .ico, apple-touch-icon.png, favicon-32.png, icon-192.png
    └── assets/
        ├── css/style.css
        ├── js/config.js           <- YOUTUBE IDs + social links: the only file you edit
        ├── js/main.js
        ├── images/                WebP images, each in 2 sizes (e.g. castle-lava-800.webp / -1600.webp)
        └── videos/                Local MP4 fallbacks (delete once YouTube IDs are set)
```

## Finishing the site: add your YouTube videos

Open `public/assets/js/config.js` and paste a YouTube link or 11-character ID into the `youtube:` field of each slot:

| Slot key | Where it appears | Status |
|---|---|---|
| `kn-teaser` | Knight Night teaser, top of the case study | local MP4 (add a YouTube ID to switch) |
| `atmosphere-1` to `atmosphere-4` | Knight Night, "Feel & atmosphere" | YouTube |
| `combat`, `combo-showcase` | Knight Night, under "Combat that fits the setting" | YouTube |
| `boss-showcase`, `boss-presentation-1`, `boss-presentation-2` | Knight Night, "Boss presentation & in-game cinematography" | YouTube |
| `mm-cutscene` | MASTERM1ND, networks cutscene | local MP4 (add a YouTube ID to switch) |

- Empty slots with no local file are **hidden** from visitors, and a section with no videos disappears entirely. Add `?placeholders` to the address while editing to see the empty slots.
- Videos load as a lightweight thumbnail and only fetch YouTube when clicked (privacy-enhanced `youtube-nocookie.com`).
- When every slot has a YouTube ID, delete `public/assets/videos/` and the `local:` lines in `config.js`.
- LinkedIn / GitHub: fill in `SITE_LINKS` in the same file. They stay hidden until you do.

## Preview locally

```
cd public
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish (one time)

1. Create a GitHub repository named `abdulaziztayeb.com` (public).
2. Push this folder to its `main` branch.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Same page → **Custom domain**: `abdulaziztayeb.com` → Save. Tick **Enforce HTTPS** once the certificate is issued.
5. At your domain registrar, add the DNS records below.

### DNS records (set these at your domain registrar)

| Type | Host / Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA (optional, IPv6) | `@` | `2606:50c0:8000::153` |
| AAAA (optional, IPv6) | `@` | `2606:50c0:8001::153` |
| AAAA (optional, IPv6) | `@` | `2606:50c0:8002::153` |
| AAAA (optional, IPv6) | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `<your-github-username>.github.io` |

Remove any other A/AAAA records on `@` that point elsewhere. DNS can take from a few minutes to a few hours; GitHub issues the HTTPS certificate automatically afterwards.

## Updating later


## Credits

Space Grotesk (SIL Open Font License) is loaded from Google Fonts. All game screenshots and media belong to the respective projects.
