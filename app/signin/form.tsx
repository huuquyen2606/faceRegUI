"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, type SignInSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-hooks";
import { useAuth as useFirebaseAuth } from "reactfire";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { useToast } from "@/components/ui/use-toast";

function SignInForm(): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const auth = useFirebaseAuth();
  const { toast } = useToast();

  const [isSigningIn, setSigningIn] = React.useState(false);
  const { signIn } = useAuth();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchema): Promise<void> {
    setSigningIn(true);

    try {
      await signIn({ ...values }, auth);
      const redirect = params?.get("redirect");
      router.push(redirect ?? "/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          toast({
            title: "Sign in failed!",
            description: "Wrong username or password, please try again!",
            variant: "destructive",
          });
        }
      }

      setSigningIn(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 py-4 flex flex-col items-center w-full gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }): JSX.Element => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }): JSX.Element => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your super secure password" type="password" {...field} />
              </FormControl>
              <FormDescription>6 or more characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSigningIn}>
          {isSigningIn ? (
            <>
              <span>Signing you in...</span>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <span>Sign in</span>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
