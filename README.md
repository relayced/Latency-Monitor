# Latency Monitor

A real-time network latency (ms) monitor that runs entirely in the browser — no backend, no server, no setup for anyone visiting the site.

**Live site:** https://relayced.github.io/wifi-ms-monitor/

## What it does

Pings 15 different targets in parallel — search engines, CDNs, public DNS resolvers, cloud providers, and a few real-world apps and games — and shows each one as its own live-updating card with current/average/min/max/loss stats and a mini line chart.

| Target | What it helps test |
|---|---|
| Google | General internet connectivity |
| Cloudflare | CDN/DNS connectivity |
| Microsoft | Microsoft/Azure connectivity |
| GitHub | International routing + HTTPS |
| Google DNS (8.8.8.8) | DNS/network latency |
| Cloudflare DNS (1.1.1.1) | DNS/network latency |
| Quad9 DNS (9.9.9.9) | Alternative DNS |
| Amazon AWS | AWS connectivity |
| Google Cloud | Google Cloud connectivity |
| Discord | Real-world app connectivity |
| Steam | Gaming-service connectivity |
| YouTube | Video/CDN connectivity |
| Facebook/Meta | Meta network connectivity |
| Google (generate_204) | Lightweight zero-byte connectivity check |
| Google Meet | Video call service connectivity |

## How it works

Each "ping" is a timed `fetch()` request in `no-cors` mode against the target, measured with `performance.now()`. This gives a real round-trip time reflecting actual network responsiveness, but it's not a raw ICMP ping — browsers can't send those. Some entries (Discord, Steam, PUBG/Mobile Legends-style game domains) test the connectivity path to that provider's website, not the exact game/voice server you'd connect to in-app.

Because it's entirely client-side, every visitor's browser runs its own independent set of pings against their own connection — nothing is sent to or stored on any server.

## Tech stack

- React + Vite
- [Recharts](https://recharts.org/) for the live charts
- No backend, no database, no API keys

## Running it locally

```
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Deploying

```
npm run deploy
```

Pushes a production build to the `gh-pages` branch, served via GitHub Pages.
