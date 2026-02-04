export default {
  async fetch(request) {
    // --- IP allowlist: exact matches (IPv4 en IPv6) ---
    const ALLOWLIST = new Set([
      "185.3.176.130",
      "35.156.223.181",
      "84.30.217.127",
      "213.126.208.100",
      "2001:1c01:400e:3a01::17",
      "2001:1c01:812:d200:9bfd:af12:e9a8:7b60",
      "2001:1c01:400e:3a01:f551:68dc:120a:2ab2",
      "2a02:a45a:38d0:0:819d:3483:b6ba:a8eb",
      "2a02:a44d:3470:0:948d:c4f:ddb6:febf",
      "2a02:a44d:3470:0:b5e2:d7fb:c192:9c32",
      "83.81.181.5",
      "77.164.16.73",
      "62.45.96.236",
      "83.219.83.64/27",
      "83.143.189.64/26"
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
    <div class="top-bar"><img src="https://imagedelivery.net/7_WdPZLJJExIQ95jdZAtNw/7dc9f236-26ac-40bc-8394-c6c9eea7dd00/public" alt="Logo" class="logo"></div>
    <div class="content">
        <h1>We werken aan een betere webshop</h1>
        <p>Onze website is tijdelijk niet bereikbaar vanwege gepland onderhoud. We verwachten in de loop van de middag weer online te zijn.
Vragen of een bestelling plaatsen?</p>
        <a href="mailto:customer-service@boomlab.nl" class="btn">Neem contact met ons op</a>
    </div>
    <footer>
        <img src="https://imagedelivery.net/7_WdPZLJJExIQ95jdZAtNw/85010862-40ac-4d3d-b555-83c6ca447600/public" alt="Footer">
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
