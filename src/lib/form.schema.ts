import { z } from "astro:schema";
export const basicFormSchema = z.object({
  projectName: z.string().nonempty(),
  description: z.string().optional(),
  bigL: z.boolean().refine((val) => val === true, {
    message: "Never not L",
  }),
});

export type ExpectedBasicForm = z.infer<typeof basicFormSchema>;
