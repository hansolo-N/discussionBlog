"use client";
import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";
import { useSession } from "next-auth/react";

export default function CreatePostForm() {
  const [formState, action] = useFormState(actions.createPost, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
              label={"Title"}
              name="title"
              placeholder="title of post"
              labelPlacement="outside"
            />
            <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
              name="content"
              label="Content"
              placeholder="content"
              labelPlacement="outside"
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-200">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
