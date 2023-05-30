"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/firebase/auth-hooks";
import { useAuth as useFirebaseAuth } from "reactfire";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";

export function UserMenu(): JSX.Element {
  const [isSigningOut, setSigningOut] = React.useState(false);
  const auth = useFirebaseAuth();
  const { data, signOut } = useAuth();

  async function handleSignOut(): Promise<void> {
    setSigningOut(true);
    await signOut(auth);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt={`Avatar of ${data?.name}`} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
          {isSigningOut ? (
            <>
              <span>Signing out</span>
              <DropdownMenuShortcut>
                <Loader2 className="animate-spin" />
              </DropdownMenuShortcut>
            </>
          ) : (
            <span>Sign out</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
