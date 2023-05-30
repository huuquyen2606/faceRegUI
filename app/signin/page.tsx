import type { Metadata } from "next";
import SignInForm from "./form";

const metadata: Metadata = {
  title: "Sign in - FaceReg",
};

function SignIn(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto_1fr_auto] p-8 w-[48rem]">
        <div className="w-32 h-20" />
        <div className="w-full h-20 border-x border-dashed border-gray-300" />
        <div className="w-32 h-20" />

        <div className="w-32 h-full border-t border-dashed border-gray-300" />
        <div className="col-start-2 row-start-2 flex flex-col items-center w-full h-full border-x border-t border-dashed border-gray-300 p-4">
          <h1 className="text-4xl font-bold">FaceReg</h1>
          <p className="text-slate-400">Managing your faces, easily!</p>
        </div>
        <div className="w-32 h-full border-t border-dashed border-gray-300" />

        <div className="w-32 h-full border-t border-dashed border-gray-300" />
        <div className="w-full h-full border-x border-t p-4 border-dashed border-gray-300">
          <SignInForm />
        </div>
        <div className="w-32 h-full border-t border-dashed border-gray-300" />

        <div className="w-32 h-20 border-t border-dashed border-gray-300" />
        <div className="w-full h-20 border-x border-t border-dashed border-gray-300" />
        <div className="w-32 h-20 border-t border-dashed border-gray-300" />
      </div>
    </div>
  );
}

export default SignIn;
export { metadata };
