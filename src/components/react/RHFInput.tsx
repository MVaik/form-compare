import {
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { RenderCount } from "./RenderCount";

const RHFInput = <T extends FieldValues>({
  name,
  label,
  methods,
}: {
  name: FieldPath<T>;
  label: string;
  methods: UseFormReturn<T>;
}) => {
  const { error } = methods.getFieldState(name);
  return (
    <div>
      <div className="flex gap-2 items-center">
        <label htmlFor={name}>{label}</label>
        <RenderCount />
      </div>
      <input className="border-2" id={name} {...methods.register(name)} />
      {error && <div className="text-red-600">{error?.message}</div>}
    </div>
  );
};

export default RHFInput;
