import AuthContext from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { apiAddress } from "@/lib/variables";
import { CopyIcon } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export function FundWallet() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  // const [acc, setAcc] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const generateVirtualAccount = async () => {
    try {
      //   setOpenDialog(true);
      const res = await fetch(`${apiAddress}/generate-virtual-account`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
        method: "POST",
        body: JSON.stringify({ userEmail: user?.[0]?.userEmail }),
      });
      const response = await res.json();
      if (res.ok) {
        // setAcc(response?.data);
        setLoading(false);
      } else {
        toast.error(response?.message || "Unable to generate virtual account", {
          description: "Please try again",
        });
        setOpenDialog(false);
      }
    } catch (err) {
      toast.error("Unable to generate virtual account", {
        description: "Please try again",
      });
      setOpenDialog(false);
      console.error({ err });
    }
  };

  return (
    <Dialog defaultOpen={openDialog} onOpenChange={setOpenDialog}>
      {/* <DialogTrigger asChild> */}
      <Button
        className="self-end"
        onClick={() => {
          setOpenDialog(true);
          generateVirtualAccount();
        }}
      >
        Fund Wallet
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl">Wallet funding</DialogTitle>
          <DialogDescription>
            Send money to the account below to fund your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col sm:items-center gap-1 py-3 bg-muted/50 rounded-2xl">
            <p className="text-lg font-semibold">Bank Name</p>
            {loading ? (
              <Skeleton className="h-6 bg-foreground/5 w-48" />
            ) : (
              <p className="text-foreground/70">Moniepoint microfinance bank</p>
            )}
          </div>
          <div className="flex flex-col sm:items-center gap-1 py-3 bg-muted/50 rounded-2xl relative">
            <p className="text-lg font-semibold">Account number</p>
            {loading ? (
              <>
                <Skeleton className="h-6 bg-foreground/5 w-[87px]" />
                <Skeleton className="size-6 bg-foreground/5 absolute right-20 bottom-3" />
              </>
            ) : (
              <>
                {" "}
                <p className="text-foreground/70">1100987654</p>
                <Button
                  size="icon"
                  className="absolute right-20 bottom-1"
                  variant="ghost"
                  onClick={() => {
                    toast.success("Account number copied!");
                    navigator.clipboard.writeText((1100987654).toString());
                  }}
                >
                  <CopyIcon />
                </Button>
              </>
            )}
          </div>
          <div className="flex flex-col sm:items-center gap-1 py-3 bg-muted/50 rounded-2xl">
            <p className="text-lg font-semibold">Account name</p>
            {loading ? (
              <Skeleton className="h-6 bg-foreground/5 w-32" />
            ) : (
              <p className="text-foreground/70">Monnify checkout</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
