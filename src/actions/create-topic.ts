"use server";

import { auth } from "@/auth";
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

interface createTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formstate: createTopicFormState,
  formData: FormData
): Promise<createTopicFormState> {
  //to-do revalidate home page after creating topic
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["you must be signed in to do this "],
      },
    };
  }

  return {
    errors: {},
  };
}
