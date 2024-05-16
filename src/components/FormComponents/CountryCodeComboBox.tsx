import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IComboBoxProps } from "@/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function CountryCodeComboBox<T extends FieldValues>({
  className,
  setValue,
  stateName,
  placeholder,
  data,
  light = false,
  NotFoundMessage = "No data found",
  selectBox,
  isSuccess,
  callBcFn,
  navbar,
  default_country_id = 64,
}: IComboBoxProps<T>) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  
  useEffect(() => {
    if (isSuccess) {
      setSelectedItem("");
    }
  }, [isSuccess]);

  const { i18n } = useTranslation();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        //! here we control the shadow
        className={cn(
          ` transition-shadow  w-fit ${
            navbar
              ? "w-9 h-5 "
              : open
              ? "shadow-[0_0_0_2px] min-w-[80px] h-10"
              : "shadow-[0_0_0_1px] min-w-[80px] h-10"
          } shadow-input  rounded-[6px] overflow-hidden  outline-none`,
          className
        )}
      >
        <div
          //! here we control the background

          className={`selected-item text-base flex-center gap-3 outline-none round  w-full   ${
            light ? "bg-white" : " bg-transparent"
          }  w-full h-full  cursor-pointer  ${
            selectedItem ? "text-input" : "text-input  "
          } ${navbar ? "" : "px-3"}`}
        >
          <img
            className="w-9 h-5 object-cover rounded"
            src={
              selectedItem
                ? data?.find(
                    (item) => item?.name?.toLowerCase() === selectedItem
                  )?.logo
                : data?.find((item) => item?.id === default_country_id)?.logo
            }
            alt=""
          />
          {!navbar && (
            <div className={` `}>
              +
              {selectedItem
                ? data?.find(
                    (item) => item?.name?.toLowerCase() === selectedItem
                  )?.phone
                : data?.find((item) => item?.id === default_country_id)?.phone}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="  p-0" sideOffset={15}>
        <Command
          className={` ${
            light
              ? "bg-white border-primary "
              : "bg-background border-background"
          }`}
        >
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none " : "h-12 "
            }  w-full   ${
              light ? "bg-white justify-" : "bg-background justify-"
            } `}
          >
            <CommandInput
              className={` placeholder:text-input placeholder:opacity-50 placeholder:font-medium rounded-[6px] `}
              autoFocus={light ? false : true}
              placeholder={`${
                i18n?.language === "ar" ? "ابحث ..." : "Search ..."
              } `}
            />
          </div>
          <CommandEmpty>
            {i18n?.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
          </CommandEmpty>{" "}
          <CommandGroup className="h-fit max-h-72 overflow-y-auto">
            {data?.map((item) => (
              <CommandItem
                className={`   hover:bg-input 
                text-input  ${
                  light
                    ? "aria-selected:bg-input aria-selected:text-background"
                    : "aria-selected:bg-input aria-selected:text-background"
                } ${
                  selectedItem === item?.name?.toLowerCase()
                    ? "bg-input text-background"
                    : "pl-8 rtl:pl-0 rtl:pr-8"
                } `}
                key={item?.id}
                value={item?.name}
                onSelect={(currentValue) => {
                  //!it converts to lower case by default
                  setSelectedItem(
                    currentValue === selectedItem ? "" : currentValue
                  );
                  setValue && setValue("country_code", item?.code);
                  callBcFn && callBcFn(item?.id);
                  setOpen(false);
                }}
              >
                {selectedItem === item?.name?.toLowerCase() && (
                  <FontAwesomeIcon
                    className={cn("mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4")}
                    icon={faCheck}
                  />
                )}

                {item?.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
