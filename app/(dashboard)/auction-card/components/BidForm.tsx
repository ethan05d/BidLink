"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const bidFormSchema = z.object({
  bid: z.number().min(2, {
    message: "Bid must be at least 2 characters.",
  }),
});

export const BidForm = () => {
  return <div>BidForm</div>;
};
