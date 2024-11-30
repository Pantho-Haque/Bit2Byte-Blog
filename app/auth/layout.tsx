import { ModeToggle, NavBar } from "@/components/index";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between w-[98vw] mx-auto  min-h-[90vh]">
      <div className="flex justify-between items-center mr-3">
        <div className="text-xl font-bold md:text-xl ml-5 sm:ml-16 my-5">
          <Link href={"/"}>Bit2Byte</Link>
        </div>
        <ModeToggle />
      </div>
      {children}
      {/* <Footer /> */}
    </div>
  );
}
