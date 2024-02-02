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
  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">New Topic </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.createTopic}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="font-bold text-lg p-2">Create New Topic</h3>
              <div className="">
                <Input
                  name="name"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Name"
                />
              </div>

              <div className="">
                <Textarea
                  name="description"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Describe your topic"
                />
              </div>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
