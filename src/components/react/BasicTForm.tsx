import { useForm } from "@tanstack/react-form";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import { RenderCount } from "./RenderCount";

const BasicTForm = () => {
  const form = useForm({
    // Form type can be passed this way
    defaultValues: {
      projectName: "",
      description: "",
      bigL: false,
    } as ExpectedBasicForm,
    validators: {
      // Accepts schemas without a separate lib
      onSubmit: basicFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-2 w-2xs w-full"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex gap-2">
        <h3>Tanstack form</h3>
        <RenderCount />
      </div>
      {/* Form fields are typed here */}
      <form.Field name="projectName">
        {(field) => (
          <>
            <div className="flex gap-2">
              <label htmlFor={field.name}>Project name *</label>
              <RenderCount />
            </div>
            <input
              className="border-2"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              // Fields re-render twice on change for some reason,
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched && (
                <div className="text-red-600">Bruh ??</div>
              )}
          </>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <>
            <div className="flex gap-2">
              <label htmlFor={field.name}>Description</label>
              <RenderCount />
            </div>

            <input
              className="border-2"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched && (
                <div className="text-red-600">Bruh ??</div>
              )}
          </>
        )}
      </form.Field>
      <form.Field name="bigL">
        {(field) => (
          <>
            <div className="flex gap-2">
              <label className="flex gap-2" htmlFor={field.name}>
                <input
                  className="border-2"
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                Big L?
              </label>
              <RenderCount />
            </div>
            {field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched && (
                <div className="text-red-600">Obv always big L</div>
              )}
          </>
        )}
      </form.Field>

      <button className="border-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BasicTForm;
