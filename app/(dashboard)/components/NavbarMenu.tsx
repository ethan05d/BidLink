"use client";

import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { SignInForm } from "../../(auth)/components/SignInForm";
import { SignOutForm } from "../../(auth)/components/SignOutForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavbarMenu = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer flex justify-center items-center md:hover:opacity-80 transition-opacity duration-200 w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage
                src={session?.user?.image ?? undefined}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="text-xs sm:text-sm">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 mt-2 w-48">
            <DropdownMenuLabel className="text-center font-semibold">
              {session?.user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center justify-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <LogOutIcon className="h-4 w-4 text-red-500" />

              <SignOutForm />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200">
          <SignInForm provider="google" />
        </span>
      )}
    </>
  );
};
