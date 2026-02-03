export default {
  async fetch(request) {
    // --- IP allowlist: exact matches (IPv4 en IPv6) ---
    const ALLOWLIST = new Set([
      "185.3.176.130",
      "84.30.217.127",
      "213.126.208.100",
      "2001:1c01:400e:3a01::17",
      "83.81.181.5",
    ]);

    // Pak het 'echte' client-IP zoals door Cloudflare aangeleverd
    const clientIp = request.headers.get("CF-Connecting-IP") || "";

    // Als IP in allowlist staat: niet tonen, maar doorlaten naar origin
    if (ALLOWLIST.has(clientIp)) {
      // Doorzetten naar je achterliggende site (zelfde host/route)
      return fetch(request);
    }

    // Anders: onderhoudspagina serveren
    const html = `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onderhoud</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Open Sans', sans-serif; min-height: 100vh; display: flex; flex-direction: column; background-color: #f8faf9; }
        .top-bar { width: 100%; background-color: #019e4a; padding: 16px 24px; display: flex; align-items: center; }
        .logo { max-height: 50px; width: auto; }
        .content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center; }
        h1 { color: #019e4a; font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; }
        p { color: #333; font-size: 1.125rem; line-height: 1.7; max-width: 600px; margin-bottom: 30px; }
        .btn { display: inline-block; padding: 14px 32px; background-color: #019e4a; color: white; text-decoration: none; font-weight: 600; font-size: 1rem; border-radius: 5px; transition: opacity 0.2s ease; }
        .btn:hover { opacity: 0.9; }
        footer { width: 100%; padding: 20px 0; text-align: center; }
        footer img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    <div class="top-bar"><img src="https://www.boomlab.nl/media/bb/dc/0e/1768998609/Boom_Logo_Wit.png" alt="Logo" class="logo"></div>
    <div class="content">
        <h1>We werken aan een betere webshop</h1>
        <p>Onze website is tijdelijk niet bereikbaar vanwege gepland onderhoud. We zijn zo snel mogelijk weer online.
Vragen of een bestelling plaatsen?</p>
        <a href="mailto:customer-service@boomlab.nl" class="btn">Neem contact met ons op</a>
    </div>
    <footer>
        <img src="https://www.boomlab.nl/bundles/boomlabtheme/footer.svg?1746546056127896" alt="Footer">
    </footer>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8",
        // Handig tijdens onderhoud: niet cachen + niet indexeren
        "cache-control": "no-store, max-age=0",
        "x-robots-tag": "noindex, nofollow",
      },
    });
  },
} satisfies ExportedHandler;
