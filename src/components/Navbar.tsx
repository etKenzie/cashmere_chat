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

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-container padding-container relative z-30 py-5 px-8">
      <Link href="/">
        {/* {<Image src="/" alt="logo" width={74} height={29}></Image>} */}
        <b>CASHMERE</b>
        health
      </Link>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>

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
