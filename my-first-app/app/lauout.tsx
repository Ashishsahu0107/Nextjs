import './globals.css'

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
