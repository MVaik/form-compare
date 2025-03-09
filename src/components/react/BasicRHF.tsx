import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import { RenderCount } from "./RenderCount";
import RHFInput from "./RHFInput";

const BasicRHF = () => {
  const methods = useForm<ExpectedBasicForm>({
    resolver:
      // Needs a separate lib to resolve schema??
      zodResolver(basicFormSchema),
  });
  const onSubmit: SubmitHandler<ExpectedBasicForm> = (data) =>
    console.log(data);

  //Inputs are directly manipulated via js, no react state bs, which means minimal re-renders
  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 items-center">
        <h3>React Hook Form</h3>
        <RenderCount />
      </div>
      <label htmlFor="name">Name *</label>
      <input className="border-2" id="name" {...methods.register("name")} />
      {methods.formState.errors?.name && (
        <div className="text-red-600">
          {methods.formState.errors?.name?.message}
        </div>
      )}
      <RHFInput name="description" label="Description" methods={methods} />
      <label className="flex gap-2" htmlFor="big-l">
        <input
          className="border-2"
          id="big-l"
          type="checkbox"
          {...methods.register("bigL")}
        />
        Big L?
      </label>
      {methods.formState.errors?.bigL && (
        <div className="text-red-600">
          {methods.formState.errors?.bigL?.message}
        </div>
      )}

      <button className="border-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BasicRHF;
