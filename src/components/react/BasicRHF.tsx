import { useForm, type SubmitHandler } from "react-hook-form";
import type { ExpectedBasicForm } from "../../lib/form.types";

const BasicRHF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpectedBasicForm>();
  const onSubmit: SubmitHandler<ExpectedBasicForm> = (data) =>
    console.log(data);

  return (
    <form
      className="flex flex-col gap-2 w-2xs p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="project-name">Project name *</label>
      <input
        className="border-2"
        id="project-name"
        {...register("projectName", { required: true })}
      />
      {errors.projectName && <div className="text-red-600">Bruh ??</div>}
      <label htmlFor="description">Description</label>
      <input
        className="border-2"
        id="description"
        {...register("description")}
      />

      <label className="flex gap-2" htmlFor="big-l">
        <input
          className="border-2"
          id="big-l"
          type="checkbox"
          {...register("bigL")}
        />
        Big L?
      </label>

      <button className="border-2" type="submit">
        submit
      </button>
    </form>
  );
};

export default BasicRHF;
