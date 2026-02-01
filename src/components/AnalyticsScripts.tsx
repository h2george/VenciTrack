import { prisma } from "@/lib/prisma";
import Script from "next/script";

async function getAnalyticsConfig() {
    try {
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: { in: ['META_PIXEL_ID', 'GA_MEASUREMENT_ID'] }
            }
        });

        const configMap: Record<string, string> = {};
        configs.forEach(c => configMap[c.key] = c.value);
        return configMap;
    } catch (error) {
        return {};
    }
}

export default async function AnalyticsScripts() {
    const config = await getAnalyticsConfig();
    const metaPixelId = config['META_PIXEL_ID'];
    const gaMeasurementId = config['GA_MEASUREMENT_ID'];

    return (
        <>
            {metaPixelId && (
                <>
                    <Script id="facebook-pixel" strategy="afterInteractive">
                        {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${metaPixelId}');
                        fbq('track', 'PageView');
                        `}
                    </Script>
                    <noscript>
                        <img height="1" width="1" style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </>
            )}

            {gaMeasurementId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${gaMeasurementId}');
                        `}
                    </Script>
                </>
            )}
        </>
    );
}
