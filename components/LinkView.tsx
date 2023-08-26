import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import LinkInput from "./LinkInput";

const LinkView = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);

  return (
    <div className="bg-white/5 ring ring-ring w-[35vw] h-fit rounded-md p-5">
      {!showLinkInput && (
        <Button className="text-lg " onClick={() => setShowLinkInput(true)}>
          <PlusCircledIcon className="h-5 w-5 mr-2" />
          New Link
        </Button>
      )}
      {showLinkInput && <LinkInput setShowLinkInput={setShowLinkInput} />}
    </div>
  );
};

export default LinkView;
