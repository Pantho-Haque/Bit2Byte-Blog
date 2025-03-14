"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";
import { useAuth } from "@/lib/AuthProvider";

const MobileNav = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const { user, logout } = useAuth();

  return (
    <div>
      <ul className="mt-5 flex flex-col w-full gap-4">
        <SheetClose asChild>
          <Link href={"/"}>
            <p
              className={`hover:bg-znc-300 py-2 px-4 rounded ${
                route == "" && "bg-znc-200"
              }`}
            >
              Home
            </p>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href={"/pub/about"}>
            <p
              className={`hover:bg-znc-300 py-2 px-4 rounded ${
                route == "about" && "bg-znc-200"
              }`}
            >
              About
            </p>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href={"/pub/blog"}>
            <p
              className={`hover:bg-znc-300 py-2 px-4 rounded ${
                route == "blog" && "bg-znc-200"
              }`}
            >
              Blog
            </p>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href={"/pub/syllabus"}>
            <p
              className={`hover:bg-znc-300 py-2 px-4 rounded ${
                route == "syllabus" && "bg-znc-200"
              }`}
            >
              Syllabus
            </p>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href={"/pub/contact"}>
            <p
              className={`hover:bg-znc-300 py-2 px-4 rounded ${
                route == "contact" && "bg-znc-200"
              }`}
            >
              Contact
            </p>
          </Link>
        </SheetClose>
        <div className="buttons gap-2 flex flex-col text-xsm w-1/3">
          <SheetClose asChild>
            {user ? (
              <button
                onClick={logout}
                className={buttonVariants({ variant: "secondary" })}
              >
                Logout
              </button>
            ) : (
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/auth"
              >
                Login
              </Link>
            )}
          </SheetClose>
        </div>
      </ul>
    </div>
  );
};

export default MobileNav;
