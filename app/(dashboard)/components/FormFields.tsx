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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { TimePickerDemo } from "@/components/ui/time-picker-demo";

type AuctionFormSchema = z.infer<typeof auctionFormSchema>;

interface FormFieldsProps {
  form: UseFormReturn<AuctionFormSchema>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the title..."
                  {...field}
                  className="w-full p-2 border rounded-md"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="starting_bid"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Starting Bid
              </FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <span className="px-3 py-2 bg-gray-100 focus:ring-0">$</span>
                  <Input
                    type="number"
                    placeholder="Enter the price..."
                    {...field}
                    className="select-none border-0 focus:"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter the description..."
                {...field}
                className="w-full p-2 border rounded-md resize-none"
                rows={5}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="end_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">End Time</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP HH:mm:ss")
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    initialFocus
                    disabled={(date) => {
                      const yesterday = new Date();
                      yesterday.setDate(yesterday.getDate() - 1);
                      return date < yesterday;
                    }}
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={(date) => field.onChange(date?.toISOString())}
                      date={field.value ? new Date(field.value) : undefined}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};
