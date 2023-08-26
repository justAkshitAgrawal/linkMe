import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface Props {
  setShowLinkInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkInput = ({ setShowLinkInput }: Props) => {
  return (
    <div>
      <div>
        <Label className="mb-2">Title</Label>
        <Input placeholder="Enter Title" />
      </div>
      <div className="mt-3">
        <Label className="mb-2">URL</Label>
        <Input placeholder="Enter Link URL" />
      </div>
      {/* <Label className="mb-2">Select Icon</Label> */}
      <Button
        className="text-lg self-start mt-4"
        onClick={() => {
          setShowLinkInput(false);
          // updateBio();
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default LinkInput;
