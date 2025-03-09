import { type UseFormReturn } from "react-hook-form";
import { RenderCount } from "./RenderCount";
import type { ExpectedBasicForm } from "../../lib/form.schema";

const RHFInput = ({
  name,
  label,
  methods,
}: {
  name: keyof ExpectedBasicForm;
  label: string;
  methods: UseFormReturn<ExpectedBasicForm>;
}) => {
  const { error } = methods.getFieldState(name);
  return (
    <>
      <div className="flex gap-2 items-center">
        <label htmlFor={name}>{label}</label>
        <RenderCount />
      </div>
      <input className="border-2" id={name} {...methods.register(name)} />
      {error && <div className="text-red-600">{error?.message}</div>}
    </>
  );
};

export default RHFInput;
