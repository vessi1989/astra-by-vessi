import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent your site from being embedded in iframes on other sites (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent browsers from guessing file types (MIME sniffing attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send full referrer to same origin, just origin to HTTPS sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Disable access to sensitive browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Prevent XSS and restrict resource loading to known safe origins
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + inline (needed for Next.js) + Vercel analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      // Styles: self + inline (needed for Tailwind)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs (Three.js canvas exports)
      "img-src 'self' data: blob: https://placehold.co",
      // WebGL / canvas workers
      "worker-src 'self' blob:",
      // Connections: self only (no external API calls)
      "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
      // No plugins (Flash etc.)
      "object-src 'none'",
      // No iframes from other origins
      "frame-src 'none'",
      // Only load frames from same origin
      "frame-ancestors 'none'",
      // Force HTTPS for all resources
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
