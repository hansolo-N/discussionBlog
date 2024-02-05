"use server";
import { revalidatePath } from "next/cache";
import { Redirect } from "next";
import { z } from "zod";
import { db } from "@/db";
import type { Post, Topic } from "@prisma/client";
import paths from "@/paths";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface createPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: createPostFormState,
  formData: FormData
): Promise<createPostFormState> {
  //revalidate topic show page after creating post
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
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
        _form: ["you must be signed in to create a post"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["cannot find topic"],
      },
    };
  }

  let post: Topic;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
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
          _form: ["Failed to create Post"],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
