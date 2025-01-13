import { Flag } from "@pcc/shared";
import { useState } from "react";
import { ToolTip } from "../ToolTip/ToolTip";

export const FlagTag = ({ flag }: { flag: Flag }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      setShowTooltip(false);
    }
  };

  return (
    <span className="inline-block relative"
    style={{ scrollbarGutter: "unset" }}>
      <span
        className={`text-xs font-bold rounded px-2 py-1 z-10 border flex-row items-center gap-1 inline-flex relative`}
        style={{
          backgroundColor: `#${flag.bg_color}`,
          color: `#${flag.font_color}`,
          borderColor: `#${flag.border_color}`,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {flag.name}
        {flag.description ? (
          <ToolTip text={flag.description} showTooltip={showTooltip} />
        ) : null}
      </span>
    </span>
  );
};
