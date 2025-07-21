import ForgotPassword from "@/components/change-password";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <>
      <h1 className="text-xl font-bold mb-3">Settings</h1>
      <Separator />
      <div className="border border-border mt-10">
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Password</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ForgotPassword />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
