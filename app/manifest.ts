import type { MetadataRoute } from "next"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} - Software Engineering Studio`,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#F6F4EE",
        theme_color: "#1A1A18",
        lang: "en",
        categories: ["business", "productivity", "developer", "technology"],
        icons: [
            { src: "/shunya-mark.png", sizes: "500x500", type: "image/png", purpose: "any" },
            { src: "/shunyatech.png", sizes: "1254x1254", type: "image/png", purpose: "any" },
            { src: "/shunyatech.png", sizes: "1254x1254", type: "image/png", purpose: "maskable" },
        ],
    }
}
