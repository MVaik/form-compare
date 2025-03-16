import type { ExpectedBasicForm } from "../../lib/form.schema";
import { Field, type FieldProps } from "formik";
import { RenderCount } from "./RenderCount";
const FormikInput = ({
  name,
  label,
}: {
  name: keyof ExpectedBasicForm;
  label: string;
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <div className="flex gap-2 items-center">
            <label htmlFor={`formik-${name}`}>{label}</label>
          </div>
          <input className="border-2" id={`formik-${name}`} {...field} />
          {meta.touched && meta.error && (
            <div className="text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  );
};

export default FormikInput;
