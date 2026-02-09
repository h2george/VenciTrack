import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "VenciTrack | Gestión de Vencimientos Premium",
  description: "La bóveda de gestión de documentos más sofisticada del mundo. Controla SOAT, licencias y pólizas con seguridad de nivel militar.",
};

import AnalyticsScripts from "@/shared/components/AnalyticsScripts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={montserrat.className}>
        {/* Analytics Injection */}
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
