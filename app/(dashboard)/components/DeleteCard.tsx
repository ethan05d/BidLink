import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DeleteCard = ({
  isCurrentUserSeller,
  handleDelete,
}: {
  isCurrentUserSeller: boolean;
  handleDelete: () => void;
}) => {
  return (
    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Dialog>
        {isCurrentUserSeller && (
          <DialogTrigger>
            <div className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors duration-200">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Auction Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this card?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDelete}>
              Delete
              <Trash2 className="flex items-center justify-center ml-2 w-4 h-4 text-white-600" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
