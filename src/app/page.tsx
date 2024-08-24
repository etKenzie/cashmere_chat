import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SignedIn>
        <Navbar />
        <Chat />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
