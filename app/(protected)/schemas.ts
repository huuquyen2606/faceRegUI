import * as z from "zod";

const addAnUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  image: z.any(),
  note: z.string(),
});

type AddAnUserSchema = z.infer<typeof addAnUserSchema>;

export { addAnUserSchema };
export type { AddAnUserSchema };
