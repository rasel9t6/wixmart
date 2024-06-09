import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { WixClientProvider } from "@/context/WixContext";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WixClientProvider>
        <Navbar />
        {children}
        <Footer />
      </WixClientProvider>
    </>
  );
}
