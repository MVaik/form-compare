import type { AbstractControl } from "@angular/forms";
import { z } from "astro:schema";
export const basicFormSchema = z.object({
  name: z.string().nonempty("Bruh ??"),
  description: z.string().optional(),
  bigL: z.boolean().refine((val) => val === true, {
    message: "Obv always big L",
  }),
});

export type ExpectedBasicForm = z.infer<typeof basicFormSchema>;

export type AngularizedBasicForm = {
  [key in keyof ExpectedBasicForm]: AbstractControl<ExpectedBasicForm[key]>;
};
