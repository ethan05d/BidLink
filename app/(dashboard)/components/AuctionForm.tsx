"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Edit } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { AuctionCardType } from "../page";
import { FormFields } from "./FormFields";
import { UploadImage } from "./UploadImage";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const auctionFormSchema = z.object({
  title: z.string().min(2, "Title is too short").max(50, "Title is too long"),
  description: z
    .string()
    .min(2, "Description is too short")
    .max(250, "Description is too long"),
  starting_bid: z.coerce
    .number()
    .nonnegative("Starting bid must be non-negative")
    .refine((val) => val > 0, {
      message: "Starting bid must be greater than 0",
    }),

  end_time: z.string().min(1, "End time is required"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "File must be a JPEG, JPG, PNG, or WebP"),
});

function getImageUrl(publicUrl: string, uniqueFilename: string) {
  return `${publicUrl}/${uniqueFilename}`;
}

export const AuctionForm = ({
  isEditing,
  initialData,
}: {
  isEditing: boolean;
  initialData?: AuctionCardType;
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof auctionFormSchema>>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      starting_bid: 0.0,
    },
  });

  useEffect(() => {
    if (isEditing && initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        starting_bid: initialData.starting_bid,
      });
    }
  }, [isEditing, initialData, form]);

  const onSubmit = async (values: z.infer<typeof auctionFormSchema>) => {
    try {
      let imageUrl: string | null = null;
      if (values.image) {
        const file = values.image as File;
        const uniqueFilename = `${uuidv4()}-${file.name}`;

        const uploadUrlResponse = await fetch(`/api/upload/${uniqueFilename}`, {
          method: "POST",
        });

        if (!uploadUrlResponse.ok) {
          throw new Error("Failed to get upload URL");
        }

        const { url } = await uploadUrlResponse.json();

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        imageUrl = getImageUrl(
          process.env.NEXT_PUBLIC_R2_PUBLIC_URL as string,
          uniqueFilename
        );
      }

      const auctionCard: AuctionCardType = {
        id: isEditing ? initialData?.id || uuidv4() : uuidv4(),
        title: values.title,
        description: values.description,
        starting_bid: values.starting_bid,
        end_time: values.end_time,
        image_url: imageUrl || undefined,
      };

      const endpoint = `/api/auction-card/${auctionCard.id}`;
      const method = isEditing ? "put" : "post";

      const response = await axios[method](endpoint, auctionCard);

      toast.success(
        isEditing
          ? "Auction updated successfully!"
          : "Auction created successfully!"
      );

      form.reset({
        title: "",
        description: "",
        starting_bid: 0.0,
        image: undefined,
        end_time: "",
      });

      queryClient.invalidateQueries({ queryKey: ["auction_cards"] });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        toast.error(
          error.response?.data?.error ||
            "Failed to create auction. Please try again."
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      {isEditing ? (
        <DialogTrigger asChild>
          <Edit className="w-5 h-5 text-blue-600" />
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button className="text-white">Create Auction</button>
        </DialogTrigger>
      )}
      <DialogContent className="w-full max-w-[95%] sm:max-w-[425px] md:max-w-[550px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex text-xl sm:text-2xl items-center justify-center">
            {isEditing ? "Edit Auction" : "Create a Quick Auction"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} />
            <UploadImage form={form} />
            <DialogFooter>
              <Button
                variant="default"
                type="submit"
                className="w-full sm:w-auto"
              >
                {isEditing ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
