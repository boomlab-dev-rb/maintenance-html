
export default {
  async fetch(request, env, ctx) {
    // === Optioneel: whitelisting via cookie voor interne checks ===
    // Zet lokaal een cookie "bypass_maintenance=true" om de pagina te omzeilen.
    // Voorbeeld in browser console: document.cookie = "bypass_maintenance=true; path=/; SameSite=Lax";
    const bypass = request.headers.get("Cookie")?.includes("bypass_maintenance=true");
    if (bypass) {
      // In een echte setup kun je hier doorrouteren naar je echte site of 404.
      // Voor nu geven we een eenvoudige melding terug:
      return new Response("Maintenance bypass actief – achterliggende site zou hier worden getoond.", {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=UTF-8",
          "cache-control": "no-store, max-age=0",
        },
      });
    }

    // === HTML (volledig inline, NL, met huisstijlkleuren) ===
    const html = /* html */ `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Boomlab.nl – We zijn bijna live</title>
  <meta name="description" content="Onze nieuwe boomlab.nl webshop gaat volgende week live. We voeren de laatste updates uit." />
  <link rel="icon" href="data:image/svg+xml;utffaviconSvg())}
  <style>
    /* Boomlab.nl tijdelijke onderhoudspagina
       Kleuren: primair #019e4a, #091727; secundair #86be43, #e75125, #f29521 */
    :root {
      --green: #019e4a;
      --navy: #091727;
      --lime: #86be43;
      --orange: #f29521;
      --tomato: #e75125;
      --fg: #0b1220;
      --bg: #f6f8fb;
      --card: #ffffff;
      --muted: #5c667a;
    }
    @media (prefers-color-scheme: dark) {
      :root { --fg:#e6ebf5; --bg:#060b12; --card:#0d1521; --muted:#9aa7bd; }
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans";
      color: var(--fg);
      background:
        radial-gradient(1200px 600px at 10% -10%, color-mix(in oklab, var(--green) 12%, transparent), transparent),
        radial-gradient(1200px 600px at 110% 110%, color-mix(in oklab, var(--navy) 20%, transparent), transparent),
        var(--bg);
    }
    .wrap{max-width:920px; margin:0 auto; padding:40px 20px; display:grid; gap:28px}
    .brand{display:flex; align-items:center; gap:14px}
    .logo{width:40px; height:40px}
    .logo svg{width:100%; height:100%}
    .name{font-weight:700; letter-spacing:.2px; color:var(--navy); font-size:20px}
    .name span{color:var(--green)}
    .card{
      background: var(--card);
      border: 1px solid color-mix(in oklab, var(--navy) 12%, transparent);
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 8px 30px -12px color-mix(in oklab, var(--navy) 35%, transparent);
    }
    .card h1{margin:0 0 8px; font-size: clamp(28px, 4vw, 36px)}
    .card p{margin:0 0 12px; color: var(--muted)}
    .bullets{margin:0 0 18px 0; padding:0 0 0 20px}
    .bullets li{margin:6px 0}
    .cta{
      display:inline-block; text-decoration:none; font-weight:600; color:white;
      background: linear-gradient(135deg, var(--green), var(--lime));
      padding:12px 18px; border-radius:10px; box-shadow: 0 6px 16px -6px color-mix(in oklab, var(--green) 60%, transparent);
      border: 1px solid color-mix(in oklab, var(--green) 40%, transparent);
    }
    .cta:hover{filter:brightness(1.02)}
    .notice{display:flex; align-items:flex-start; gap:10px; color: color-mix(in oklab, var(--navy) 70%, var(--fg));}
    .notice svg{color: var(--orange)}
    .footer{opacity:.8; font-size:14px; border-top:1px dashed color-mix(in oklab, var(--navy) 14%, transparent); padding-top:12px}
    @media (max-width:520px){ .wrap{padding:28px 16px} }
  </style>
</head>
<body>
  <main class="wrap">
    <header class="brand">
      <div class="logo" aria-hidden="true">
        ${faviconSvg()}
      </div>
      <div class="name">boomlab<span>.nl</span></div>
    </header>

    <section class="card">
      <h1>We zijn bijna live</h1>
      <p>Onze nieuwe webshop gaat <strong>volgende week</strong> live. We voeren op dit moment de laatste updates uit.</p>
      <ul class="bullets">
        <li>Betere performance en veiligheid</li>
        <li>Verbeterde zoek- en filtermogelijkheden</li>
        <li>Een frisse uitstraling in onze huisstijl</li>
      </ul>
      mailto:sales@boomlab.nl?subject=Vraag%20over%20webshopNeem contact op</a>
    </section>

    <section class="notice" role="status" aria-live="polite">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M11 7h2v2h-2zm0 4h2v6h-2z"/>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
      </svg>
      <p>Kom je voor <strong>ondersteuning</strong>? Mail ons of neem telefonisch contact op via het vaste nummer. Deze pagina verdwijnt automatisch zodra we live zijn.</p>
    </section>

    <footer class="footer">
      <p>&copy; <span id="year"></span> Boom BV • Alle rechten voorbehouden</p>
    </footer>
  </main>

  <script>
    // Huidig jaar
    document.getElementById('year').textContent = new Date().getFullYear();

    // Optioneel: automatische refresh elke 5 min
    // setTimeout(() => location.reload(), 5 * 60 * 1000);
  </script>
</body>
</html>`;

    // === Security & caching headers ===
    const headers = new Headers({
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store, max-age=0",
      "x-robots-tag": "noindex, nofollow",
      // Strikte CSP maar toegestaan: inline styles/scripts in dit ene document
      "content-security-policy":
        "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none';",
      "referrer-policy": "no-referrer",
      "permissions-policy": "camera=(), microphone=(), geolocation=()",
    });

    return new Response(html, { status: 200, headers });
  },
};

// Kleine helper die dezelfde SVG gebruikt voor favicon én logo-mark
function faviconSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Boomlab logo">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="#019e4a"/>
      <stop offset="100%" stop-color="#86be43"/>
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#091727" />
  <path d="M16 40c8-2 12-8 16-16 4 8 8 14 16 16-6 4-12 6-16 6s-10-2-16-6z" fill="url(#g)"/>
</svg>`.trim();
}
