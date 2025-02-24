import React, { ReactNode, Ref } from "react";
import {
  Control,
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

export type GenericFormRef<T extends FieldValues> = {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: (name: keyof T, value: T[keyof T]) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
};

export type GenericFormProps<TSchema extends ZodType> = {
  schema: TSchema;
  initialValues: Partial<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  children: ReactNode;
  ref: Ref<GenericFormRef<z.infer<TSchema>>>;
} & React.ComponentPropsWithoutRef<"form">;
