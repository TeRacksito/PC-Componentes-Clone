import { Flag } from "@pcc/shared";

export const FlagTag = ({ flag }: { flag: Flag }) => {
  return (
    <span
      className={`bg-${flag.bg_color} text-${flag.font_color} text-xs font-bold rounded px-2 py-1 z-10 border border-${flag.border_color}`}
    >
      {flag.name}
    </span>
  );
};
