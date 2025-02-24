import React, { ReactNode, Ref, useImperativeHandle } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  Form,
  FormState,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const GenericForm = <TSchema extends ZodType>({
  ref,
  initialValues,
  schema,
  onSubmit,
  children,
}: GenericFormProps<TSchema>) => {
  const form = useForm<z.infer<TSchema>>({
    defaultValues: initialValues as DefaultValues<z.infer<TSchema>>,
    resolver: zodResolver(schema),
  });

  useImperativeHandle(ref, () => {
    type TFormValues = z.infer<TSchema>;

    return {
      getValues: form.getValues,
      reset: (values?: Partial<TFormValues>) => {
        form.reset(values as TFormValues);
      },
      setValue: (
        name: keyof TFormValues,
        value: TFormValues[keyof TFormValues]
      ) => {
        form.setValue(name as Path<TFormValues>, value); //need changes
      },
      formState: form.formState,
      control: form.control,
      form: form,
    };
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
    </Form>
  );
};

GenericForm.displayName = "GenericForm";
