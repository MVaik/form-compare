import type { ReactNode } from "react";
import {
  useWatch,
  type Control,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

const RHFSubscribe = <T extends FieldValues>({
  children,
  fieldsToWatch,
  control,
}: {
  children: (props: PathValue<T, Path<T>>[]) => ReactNode;
  fieldsToWatch: FieldPath<T>[];
  control: Control<T>;
}) => {
  const state = useWatch({ name: fieldsToWatch, control });
  return children(state);
};

export default RHFSubscribe;
