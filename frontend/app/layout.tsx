"use client";
import "@/styles/globals.css"
// import { Metadx  ata } from "next"
import "@covalenthq/goldrush-kit/styles.css";
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { AvalancheTestnet, Avalanche, EthereumSepolia , OptimismSepolia, Optimism , GnosisTestnet } from '@particle-network/chains';
import { WalletEntryPosition } from "@particle-network/auth";
import { evmWallets } from "@particle-network/connect";
import { ModalProvider } from '@particle-network/connect-react-ui';
import { GoldRushProvider } from "@covalenthq/goldrush-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

  const particleAuthOptions = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY ||  "",
    appId: process.env.NEXT_PUBLIC_APP_ID || "",
    chains: [
      OptimismSepolia,
      GnosisTestnet,
      AvalancheTestnet,
      EthereumSepolia,
      Optimism
    ],
    particleWalletEntry: {    //optional: particle wallet config
      displayWalletEntry: true, //display wallet button when connect particle success.
      defaultWalletEntryPosition: WalletEntryPosition.BR,
      supportChains: [
        OptimismSepolia,
        GnosisTestnet,
        AvalancheTestnet,
        EthereumSepolia,
        Optimism
      ],
      customStyle: {}, //optional: custom wallet style
    },
    securityAccount: { //optional: particle security account config
      //prompt set payment password. 0: None, 1: Once(default), 2: Always  
      promptSettingWhenSign: 1,
      //prompt set master password. 0: None(default), 1: Once, 2: Always
      promptMasterPasswordSettingWhenLogin: 1
    },
    wallets: evmWallets({
      projectId: 'bcbb4fdddd5f6d250df473f90e1f4500', //replace with walletconnect projectId
      showQrModal: false
    }),
  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <GoldRushProvider apikey="cqt_rQdDRhX8FP9gX7jB9rhBgkY46Pxq">
              <ModalProvider options={particleAuthOptions}>
                <>
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    <div className="flex-1">{children}</div>
                  </div>
                  <TailwindIndicator />
                </>
              </ModalProvider>
            </GoldRushProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
