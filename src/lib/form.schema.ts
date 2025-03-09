import { z } from "astro:schema";
export const basicFormSchema = z.object({
  name: z.string().nonempty("Bruh ??"),
  description: z.string().optional(),
  bigL: z.boolean().refine((val) => val === true, {
    message: "Obv always big L",
  }),
});

export type ExpectedBasicForm = z.infer<typeof basicFormSchema>;
