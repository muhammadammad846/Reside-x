import './globals.css';

export const metadata = {
  title: 'ResideX — Luxury Villa & Apartment Rentals',
  description: 'Find and book premium villas, apartments, and luxury properties with ResideX. Your trusted platform for exceptional stays.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#080810', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
