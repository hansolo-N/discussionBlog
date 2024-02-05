"use client ";
import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });
  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">New Topic </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="font-bold text-lg p-2">Create New Topic</h3>
              <div className="">
                <Input
                  name="name"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Name"
                  isInvalid={!!formState.errors.name}
                  errorMessage={formState.errors.name?.join(", ")}
                />
              </div>

              <div className="">
                <Textarea
                  name="description"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Describe your topic"
                  isInvalid={!!formState.errors.description}
                  errorMessage={formState.errors.description?.join(", ")}
                />
              </div>

              {formState.errors._form ? (
                <div className="p-2 bg-red-200 border border-red-400">
                  {formState.errors._form?.join(", ")}
                </div>
              ) : null}
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
