import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import { useAppForm } from "../../lib/tanstack.context";
import { RenderCount } from "./RenderCount";

let id = 0;

const BasicTForm = () => {
  const form = useAppForm({
    // Form type can be passed this way
    defaultValues: {
      name: "",
      description: "",
      bigL: false,
      losers: [],
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
      className="flex flex-col gap-2 w-full"
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

      <form.Field name="losers" mode="array">
        {(fieldApi) => (
          <>
            {fieldApi.state.value.map((field, index) => (
              <form.AppField name={`losers[${index}].name`} key={field.id}>
                {(field) => (
                  <div className="flex gap-2">
                    <field.TFormInput label={`Loser ${index + 1}`} />
                    <button
                      className="ms-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-3 px-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:bg-white before:opacity-10 before:blur-lg"
                      type="button"
                      onClick={() => fieldApi.removeValue(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </form.AppField>
            ))}

            <button
              className="border-2"
              type="button"
              onClick={() => fieldApi.pushValue({ id: id++, name: "" })}
            >
              Add loser
            </button>
          </>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.bigL}>
        {(bigLValue) =>
          bigLValue && (
            <div className="flex gap-2 items-center">
              <p className="text-2xl font-bold text-transparent bg-clip-text animate-gradient bg-linear-to-br from-purple-600 via-cyan-300 to-lime-400 bg-size-[50%_100%]">
                Amazin conditional render
              </p>
              <RenderCount />
            </div>
          )
        }
      </form.Subscribe>

      <button className="border-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BasicTForm;
