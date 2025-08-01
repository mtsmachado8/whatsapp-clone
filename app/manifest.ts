import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WhatsApp Business Web",
    short_name: "WhatsApp Business",
    description: "Aplicativo de mensagens para empresas - WhatsApp Business Web",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#25d366",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "communication", "productivity"],
    lang: "pt-BR",
    dir: "ltr",
  }
}
