import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { TFunction } from "i18next";
import React, { FormEvent } from "react";
import { SubmitBtnComponent } from "../FormComponents";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
function LogOutPopUp({
  t,
  children,
}: {
  t: TFunction;
  children: React.ReactNode;
}) {
  const [logOut, isPending] = useHandleLogOut();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    logOut();
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>{t("LogOutPopUp.LogOutPopUpTitle")}</DialogTitle>
          <DialogDescription>
            <form method="post" onSubmit={onSubmit}>
              {/** Submit Button */}
              <div className="w-full flex justify-between items-center mt-5">
                <DialogClose
                  type="button"
                  /*  onClick={() => {
                dispatchRedux(setToggleLogOutPopUp(false));
              }} */
                  className={`  group  rounded-md w-24 h-11 trns bg-red-600 text-background  hover:bg-transparent border-red-600 border-2 hover:text-red-600 active:scale-90 flex items-center justify-center  `}
                >
                  {t("LogOutPopUp.CancelBtnText")}
                </DialogClose>
                <SubmitBtnComponent
                  disabled={isPending}
                  isPending={isPending}
                  value={t("LogOutPopUp.SubmitBtnText")}
                  className={"!w-28 mt-0"}
                />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LogOutPopUp;
