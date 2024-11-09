"use client";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

import { MobileNav, ModeToggle } from "@/components/index";

const NavBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const route = pathname.split("/")[1];

  // This runs whenever page changes to some other page
  useEffect(() => {
    setProgress(30);

    setTimeout(() => {
      setProgress(70);
    }, 100);

    setTimeout(() => {
      setProgress(100);
    }, 800);
  }, [pathname]);

  // This runs whenever page loads
  useEffect(() => {
    setTimeout(() => {
      setProgress(0);
    }, 900);
  }, []);

  return (
    <nav className="h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur flex items-center justify-between z-40">
      <LoadingBar
        color="#6028ff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="text-lg font-bold md:text-xl sm:ml-16">
        <Link href={"/"}>Bit2Byte</Link>
      </div>
      <div className="hidden sm:flex w-full justify-between items-center">
        <ul className="flex space-x-4 w-full justify-center">
          <li>
            <Link
              className={`hover:bg-znc-300  py-2 px-4 rounded ${
                route == "" && "bg-znc-200"
              }`}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`hover:bg-znc-300  py-2 px-4 rounded ${
                route == "about" && "bg-znc-200"
              }`}
              href={"/about"}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`hover:bg-znc-300  py-2 px-4 rounded ${
                route == "blog" && "bg-znc-200"
              }`}
              href={"/blog"}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={`hover:bg-znc-300  py-2 px-4 rounded ${
                route == "syllabus" && "bg-znc-200"
              }`}
              href={"/syllabus"}
            >
              Sylabus
            </Link>
          </li>
          <li>
            <Link
              className={`hover:bg-znc-300  py-2 px-4 rounded ${
                route == "contact" && "bg-znc-200"
              }`}
              href={"/contact"}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="buttons flex space-x-2 mr-2">
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      </div>
      <ModeToggle />

      <div className="flex items-center justify-center sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <MobileNav />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
