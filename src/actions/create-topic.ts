"use server";

import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "must be at lowercase letters with dashes and no spaces",
    }),
  description: z.string().min(10),
});

export async function createTopic(formData: FormData) {
  //to-do revalidate home page after creating topic
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
  }
}
