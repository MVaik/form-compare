import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import { useAppForm } from "../../lib/tanstack.context";
import { RenderCount } from "./RenderCount";

const BasicTForm = () => {
  const form = useAppForm({
    // Form type can be passed this way
    defaultValues: {
      name: "",
      description: "",
      bigL: false,
    } as ExpectedBasicForm,
    validators: {
      // Accepts schemas without a separate lib
      onBlur: basicFormSchema,
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
      <div className="flex gap-2 items-center">
        <h3>Tanstack form</h3>
        <RenderCount />
      </div>
      {/* Form fields are typed here */}
      <form.Field name="name">
        {(field) => (
          <>
            <div className="flex gap-2 items-center">
              <label htmlFor={`tform-${field.name}`}>Name *</label>
              <RenderCount />
            </div>
            <input
              className="border-2"
              id={`tform-${field.name}`}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              // Fields re-render twice on change for some reason,
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched && (
                <div className="text-red-600">
                  {field.state.meta.errors.reduce(
                    (acc, curr) => (acc += curr?.message),
                    ""
                  )}
                </div>
              )}
          </>
        )}
      </form.Field>
      <form.AppField
        name="description"
        children={(field) => <field.TFormInput label="Description" />}
      />
      <form.Field name="bigL">
        {(field) => (
          <>
            <div className="flex gap-2 items-center">
              <label className="flex gap-2" htmlFor={`tform-${field.name}`}>
                <input
                  className="border-2"
                  id={`tform-${field.name}`}
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
                <div className="text-red-600">
                  {field.state.meta.errors.reduce(
                    (acc, curr) => (acc += curr?.message),
                    ""
                  )}
                </div>
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
