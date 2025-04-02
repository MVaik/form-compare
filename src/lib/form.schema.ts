import type { AbstractControl, FormArray } from "@angular/forms";
import { z } from "astro:schema";
export const basicFormSchema = z.object({
  name: z.string().nonempty("Bruh ??"),
  description: z.string().optional(),
  bigL: z.boolean().refine((val) => val === true, {
    message: "Obv always big L",
  }),
  losers: z
    .object({ name: z.string().optional(), id: z.number().optional() })
    .array(),
});

export type ExpectedBasicForm = z.infer<typeof basicFormSchema>;

export type AngularizeForm<Type extends Record<string, unknown>> = {
  [key in keyof Type]: Type[key] extends (infer R)[]
    ? FormArray<AbstractControl<R>>
    : AbstractControl<Type[key]>;
};

export type AngularizedBasicForm = AngularizeForm<ExpectedBasicForm>;
