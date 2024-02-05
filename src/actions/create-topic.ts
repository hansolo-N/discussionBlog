"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
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
  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong "],
        },
      };
    }
  }
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
