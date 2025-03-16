import { Field, Form, Formik } from "formik";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
import FormikInput from "./FormikInput";
import { RenderCount } from "./RenderCount";

const BasicFormik = () => {
  return (
    <Formik
      initialValues={
        {
          name: "",
          description: "",
          bigL: false,
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
      {({ errors, touched }) => (
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

          <button className="border-2" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicFormik;
