import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center pt-24 border border-red-300">
        <SignUp />
      </div>
    </>
  );
}
