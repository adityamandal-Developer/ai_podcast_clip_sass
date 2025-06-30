"use client";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import AppLogo from "./app-logo";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  return (
    <header className="bg-background sticky top-0 z-10 flex justify-center border-b">
      <div className="container flex h-16 items-center justify-between px-4 py-2">
        <Link href={"/dashboard"} className="flex items-center gap-2">
          <AppLogo />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge className="h-8" variant={"secondary"}>
              {credits} Credits
            </Badge>
            <Button className="h-8" asChild>
              <Link href={"/dashboard/billing"}>Buy more</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative h-8 w-8 rounded-full p-0"
                  variant={"default"}
                >
                  <Avatar className="text-primary h-8 w-8">
                    <AvatarFallback>{email.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="">{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={"/dashboard/billing"}>Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    toast.success("Sccessfully logged out");
                  }}
                  variant="destructive"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
// ffe0c2
