import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { NAV_LINKS } from "@/app/constants";

const Navbar = () => {
  return (
    <nav className="flex justify-between max-container padding-container relative z-30 py-5 px-8">
      <Link href="/" className="self-center">
        {/* {<Image src="/" alt="logo" width={74} height={29}></Image>} */}
        <b>CASHMERE</b>
        health
      </Link>
      <div className="flex gap-12 ">
        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className=" text-black cursor-pointer hover:font-bold self-center"
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>

      {/* <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      /> */}
    </nav>
  );
};

export default Navbar;
