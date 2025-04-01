import { Field, FieldArray, Form, Formik } from "formik";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import FormikInput from "./FormikInput";
import { RenderCount } from "./RenderCount";

let id = 0;

const BasicFormik = () => {
  return (
    <Formik
      initialValues={
        {
          name: "",
          description: "",
          bigL: false,
          losers: [],
        } as ExpectedBasicForm
      }
      onSubmit={(values) => console.log(values)}
      validate={(values) => {
        const state = basicFormSchema.safeParse(values);
        if (!state.error) {
          return undefined;
        }
        return state.error.issues.reduce<Record<string, string>>(
          (acc, curr) => {
            acc[curr.path.join(".")] = curr.message;
            return acc;
          },
          {}
        );
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <h3>Formik</h3>
            <RenderCount />
          </div>
          <label htmlFor="formik-name">Name *</label>
          <Field className="border-2" name="name" id="formik-name" />
          {touched?.name && errors?.name && (
            <div className="text-red-600">{errors?.name}</div>
          )}
          <FormikInput name="description" label="Description" />
          <label className="flex gap-2">
            <Field className="border-2" name="bigL" type="checkbox" />
            Big L?
          </label>
          {touched?.bigL && errors?.bigL && (
            <div className="text-red-600">{errors?.bigL}</div>
          )}

          <FieldArray name="losers">
            {({ push, remove }) => (
              <>
                {values.losers.map((field, index) => (
                  <div className="flex gap-2 items-end" key={field.id}>
                    <FormikInput
                      name={`losers.${index}.name`}
                      label={`Loser ${index + 1}`}
                    />
                    <button
                      className="ms-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-3 px-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:bg-white before:opacity-10 before:blur-lg"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}

                <button
                  className="border-2"
                  type="button"
                  onClick={() => push({ id: id++, name: "" })}
                >
                  Add loser
                </button>
              </>
            )}
          </FieldArray>

          <button className="border-2" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicFormik;
