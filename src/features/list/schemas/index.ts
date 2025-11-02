import { z } from "zod";

export const listItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
});

export type ListFormData = z.infer<typeof listItemSchema>;
