import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TFormInput from "../components/react/TFormInput";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

// Have to create a new hook with your custom inputs specified
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TFormInput,
  },
  formComponents: {},
});
