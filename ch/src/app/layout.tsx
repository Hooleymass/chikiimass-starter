import { Metadata } from "next";
import "./globals.css"
import ClientThemeWrapper from "./(app)/context/clientThemeWrapper";
import { ThemeProvider } from "./(app)/context/ThemeContext";
import { WatchedVideosProvider } from "./(app)/context/WatchedVideosContext";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import BottomTab from "./components/UI/BottomTab";


export const metadata: Metadata = {
  title: {
    template: '%s | Chikiimass',
    default: 'Home | Chikiimass',
  },
  description: "Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.",
  generator: 'Chikiimass',
  applicationName: 'Chikiimass',
  referrer: 'origin-when-cross-origin',
  keywords: ['Chikiimass', 'tv', 'live tv', 'video', 'sharing', 'camera phone', 'video phone', 'free', 'upload'],
  authors: [{ name: 'chikii' }, { name: 'mass', url: 'https://hooleymass.dev' }],
  creator: 'ChikiiMass',
  publisher: 'Chikiimass',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'app',
    title: 'Chikiimass',
    description: "Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.",
    siteId: '',
    creator: '@chikiimass',
    creatorId: '',
    images: {
      url: 'https://nextjs.org/og.png',
      alt: 'chikiimass Logo',
    },
    app: {
      name: 'twitter_app',
      id: {
        iphone: 'twitter_app://iphone',
        ipad: 'twitter_app://ipad',
        googleplay: 'twitter_app://googleplay',
      },
      url: {
        iphone: 'https://iphone_url',
        ipad: 'https://ipad_url',
      },
    },
  },
  appLinks: {
    ios: {
      url: 'https://nextjs.org/ios',
      app_store_id: 'app_store_id',
    },
    android: {
      package: 'com.example.android/package',
      app_name: 'app_name_android',
    },
    web: {
      url: 'https://nextjs.org/web',
      should_fallback: true,
    },
  },
  category: 'entertainment',
  verification: {
    google: 'google',
    yahoo: 'yahoo',
    yandex: 'yandex',
    other: {
      me: ['chikiimass@gmail.com', 'https://chikiimass.tech']
    }
  },
  alternates: {
    canonical: 'MY_SITE_LINK',
    media: {
      'only screen and (max-width: 600px': "."
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider>
          <ClientThemeWrapper>
          <WatchedVideosProvider>
              <div className="flex flex-col h-screen">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                  <SideBar />
                  <main className="flex-1 mb-10 sm:mb-1 overflow-auto">
                    {children}
                  </main>
                  <BottomTab />
                </div>
              </div>
              </WatchedVideosProvider>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}