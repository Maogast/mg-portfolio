import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import data from '@/data/portfolio.json';

const baseUrl = 'https://mg-portfolio-pi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: `${data.name} – Master Guide Portfolio`,
  description:
    'Portfolio of Stephen Magare Ogaro – Master Guide in Training, Full-Stack Developer, and Christian Servant Leader.',
  keywords: [
    'Stephen Magare',
    'Master Guide',
    'Portfolio',
    'Full-Stack Developer',
    'Christian Servant Leader',
    'Maogast Softworks',
    'NK-Organics',
    'Zimmerman SDA',
  ],
  authors: [{ name: data.name }],
  creator: data.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: `${data.name} – Master Guide Portfolio`,
    description: data.tagline || 'Master Guide in Training | Portfolio',
    siteName: `${data.name} Portfolio`,
    // OG image from public/images/profile.jpg
    images: [
      {
        url: `${baseUrl}/images/profile.jpg`,
        width: 1600,
        height: 900,
        alt: `${data.name} – Profile Banner`,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.name} – Master Guide Portfolio`,
    description: data.tagline || 'Master Guide in Training | Portfolio',
    images: [`${baseUrl}/images/profile.jpg`],
    creator: '@maogast',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function Page() {
  return <PortfolioClient />;
}