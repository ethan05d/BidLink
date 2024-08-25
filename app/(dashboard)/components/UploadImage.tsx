import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { auctionFormSchema } from "./AuctionForm";
import { z } from "zod";

type AuctionFormSchema = z.infer<typeof auctionFormSchema>;

interface FormFieldsProps {
  form: UseFormReturn<AuctionFormSchema>;
}

export const UploadImage = ({ form }: FormFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>Upload Image</FormLabel>
          <FormControl>
            <Input
              {...fieldProps}
              placeholder="Picture"
              type="file"
              accept="image/*, application/pdf"
              onChange={(event) =>
                onChange(event.target.files && event.target.files[0])
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
