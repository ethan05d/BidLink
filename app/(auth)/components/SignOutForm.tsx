"use client";
import { signOut } from "next-auth/react";

export function SignOutForm() {
  return (
    <button
      onClick={() => {
        console.log("Signing out");
        signOut();
      }}
    >
      Sign Out
    </button>
  );
}
