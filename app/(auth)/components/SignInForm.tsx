"use client";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignInForm({ provider }: { provider: string }) {
  return (
    <Button
      className="flex items-center justify-center bg-slate-800 text-white hover:bg-slate-500"
      onClick={() => {
        signIn(provider);
      }}
    >
      <LogInIcon className="h-5 w-5 text-white-800 mr-2" />
      Sign In With {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
}
