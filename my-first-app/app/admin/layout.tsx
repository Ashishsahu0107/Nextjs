import Navigation from '@/components/Navigation';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>My First App</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}

