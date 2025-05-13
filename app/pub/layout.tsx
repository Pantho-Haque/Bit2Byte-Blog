import { NavBar } from "@/components/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-start w-[98vw] mx-auto  min-h-[90vh]">
      {/* <NavBar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
