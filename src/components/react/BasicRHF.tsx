import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import { RenderCount } from "./RenderCount";

const BasicRHF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpectedBasicForm>({
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 items-center">
        <h3>React Hook Form</h3>
        <RenderCount />
      </div>
      <label htmlFor="name">Name *</label>
      <input className="border-2" id="name" {...register("name")} />
      {errors.name && (
        <div className="text-red-600">{errors?.name?.message}</div>
      )}
      <label htmlFor="description">Description</label>
      <input
        className="border-2"
        id="description"
        {...register("description")}
      />
      {errors.description && (
        <div className="text-red-600">{errors?.description?.message}</div>
      )}

      <label className="flex gap-2" htmlFor="big-l">
        <input
          className="border-2"
          id="big-l"
          type="checkbox"
          {...register("bigL")}
        />
        Big L?
      </label>
      {errors.bigL && (
        <div className="text-red-600">{errors?.bigL?.message}</div>
      )}

      <button className="border-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BasicRHF;
