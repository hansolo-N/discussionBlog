"use server";
import { revalidatePath } from "next/cache";
import { Redirect } from "next";
import { z } from "zod";
import { db } from "@/db";
import type { Post } from "@prisma/client";
import paths from "@/paths";
import { auth } from "@/auth";

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
  formState: createPostFormState,
  formData: FormData
): Promise<createPostFormState> {
  //revalidate topic show page after creating post
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    {
      errors: result.error.flatten().fieldErrors;
    }
  }

  return {
    errors: {},
  };
}
