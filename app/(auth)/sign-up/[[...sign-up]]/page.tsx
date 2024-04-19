import { SignUp } from "@clerk/nextjs";
export default function Register() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
