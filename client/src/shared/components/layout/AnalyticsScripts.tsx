"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * @file AnalyticsScripts.tsx
 * @description Dynamically loads analytics scripts (Meta Pixel, GA4) based on system config
 */

interface AnalyticsConfig {
    META_PIXEL_ID?: string;
    GOOGLE_ANALYTICS_ID?: string;
}

export default function AnalyticsScripts() {
    const [config, setConfig] = useState<AnalyticsConfig>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Fetch analytics configuration from public system settings
        fetch("/api/public/config")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setConfig(data.config);
                }
            })
            .catch((err) => {
                console.error("Failed to load analytics config:", err);
            })
            .finally(() => {
                setLoaded(true);
            });
    }, []);

    if (!loaded) return null;

    return (
        <>
            {/* Meta Pixel */}
            {config.META_PIXEL_ID && (
                <>
                    <Script
                        id="meta-pixel"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${config.META_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${config.META_PIXEL_ID}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                </>
            )}

            {/* Google Analytics 4 */}
            {config.GOOGLE_ANALYTICS_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${config.GOOGLE_ANALYTICS_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${config.GOOGLE_ANALYTICS_ID}');
                            `,
                        }}
                    />
                </>
            )}
        </>
    );
}
