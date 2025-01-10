import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface ToolTipProps {
  text: string;
  showTooltip: boolean;
}

export const ToolTip: React.FC<ToolTipProps> = ({ text, showTooltip }) => {
  return (
    <span>
      <FaInfoCircle className="cursor-pointer" />
      {
        <div
          className="absolute bottom-full mb-2 w-48 p-4 text-sm bg-white text-black rounded shadow-2xl text-wrap font-normal border border-gray-300"
          style={{
            opacity: showTooltip ? 1 : 0,
            visibility: showTooltip ? "visible" : "hidden",
            transition: "opacity 0.5s, visibility 0.5s",
          }}
        >
          {text}
        </div>
      }
    </span>
  );
};
