"use client";

import { ReactElement, useState } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type Props = {
  alwaysOpen?: boolean;
  children: ReactElement | ReactElement[];
};

export default function TooltipOverwrite({ alwaysOpen, children }: Props): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <RadixTooltip.Root open={alwaysOpen || open} delayDuration={0} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
    </RadixTooltip.Root>
  );
}
