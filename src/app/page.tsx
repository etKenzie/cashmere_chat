import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow flex bg-slate-200 min-h-0 ">
            <UserInfo className="hidden w-1/3 max-w-xl" />
            <Chat className="lg:ml-0 lg:m-4 bg-white rounded-lg flex-grow" />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
