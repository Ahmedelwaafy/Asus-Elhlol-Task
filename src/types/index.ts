import { TFunction } from "i18next";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SetURLSearchParams } from "react-router-dom";

export interface IFormElementProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  t: TFunction;
  //! index signature
  errors?: FieldErrors;
  dirtyFields?: { [index: string]: boolean };
  required?: true | false;
  validations?: object;
  dir?: "rtl" | "ltr";
  Bgcolor?: "light" | "dark";
  label?: string;
  alignment?: "vertical" | "horizontal";
  disabled?: true | false;
  ServerErrors?: string;
  inputStyle?: string;
  value?: string | number;
  rows?: number;
  withIcon?: true | false;
  icon?: string;
  getValues?: UseFormGetValues<T>;
  confirmName?: string;
  confirmName2?: string;
  className?: string;
  watch?: UseFormWatch<T>;
  btnText?: string;
  serverFileSrc?: string;
  fileFor?: string;
  confirmFor?: string;
  tooltip?: string;
  setValue?: UseFormSetValue<T>;
  country_code?: boolean;
}

export type PasswordType = string | number;

export type IUserData = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  phone_number?: string | null;
};
export interface IHeadingsProps {
  children: React.ReactNode | string;
  className?: string;
  colored?: true | false;
}

export interface IComboBoxProps<T extends FieldValues> {
  data: { id: number | string; name: string }[];
  placeholder?: string;
  setValue?: UseFormSetValue<T>;
  stateName?: string;
  className?: string;
  light?: true | false;
  NotFoundMessage?: string;
  getDefaultValueFromURL?: string;
  selectBox?: true | false;
  isSuccess?: true | false;
  callBcFn?: (value: string | number) => void;
  setSearchParams?: SetURLSearchParams;
  searchParams?: URLSearchParams;
  navbar?: boolean;
  default_country_id?: number;
}
