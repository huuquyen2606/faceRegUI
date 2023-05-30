"use client";

import { Loader2 } from "lucide-react";
import { useSigninCheck } from "reactfire";

export function CheckUser({ children }: { children: React.ReactNode }): JSX.Element {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return signInCheckResult.signedIn ? (
    <>{children}</>
  ) : (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
