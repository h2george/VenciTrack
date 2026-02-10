export const metadata = {
    title: 'VenciTrack API',
    description: 'API Service for VenciTrack',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
