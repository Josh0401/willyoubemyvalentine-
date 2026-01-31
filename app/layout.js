import './globals.css'

export const metadata = {
  title: 'Will You Be My Valentine?',
  description: 'A cute interactive Valentine proposal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}