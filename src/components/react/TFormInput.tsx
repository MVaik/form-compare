import { useFieldContext } from "../../lib/tanstack.context";
import { RenderCount } from "./RenderCount";

const TFormInput = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();
  return (
    <>
      <div className="flex gap-2 items-center">
        <label htmlFor={`tform-${field.name}`}>{label}</label>
        <RenderCount />
      </div>

      <input
        className="border-2"
        id={`tform-${field.name}`}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
        <div className="text-red-600">
          {field.state.meta.errors.reduce(
            (acc, curr) => (acc += curr?.message),
            ""
          )}
        </div>
      )}
    </>
  );
};

export default TFormInput;
