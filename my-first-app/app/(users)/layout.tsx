import Navigation from '../../components/Navigation';
import "../globals.css";


export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>My First App</title>
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
