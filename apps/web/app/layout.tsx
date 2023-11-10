import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Chatting',
  description: 'just chat app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
