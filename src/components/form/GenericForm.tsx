import {
  Control,
  FieldValues,
  FormState,
  UseFormReturn,
} from "react-hook-form";

export type GenericFormRef<T extends FieldValues> = {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: (name: keyof T, value: T[keyof T]) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
};
