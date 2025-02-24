/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext } from "react";
import { Control, FieldValues } from "react-hook-form";

export type FormContext<TFormValues extends FieldValues = any> = {
  control: Control<TFormValues>;
};

export const FormContext = createContext<null | FormContext>(null);

export const useFormContext = <TFormValues extends FieldValues = any>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form fields must be used within a Form.");
  }
  return context as FormContext<TFormValues>;
};
