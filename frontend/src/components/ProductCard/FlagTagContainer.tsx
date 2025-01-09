import { Flag } from "@pcc/shared";
import { FlagTag } from "./FlagTag";

export const FlagTagContainer = ({ flags }: { flags: Flag[] }) => {
  return (
    <div className="flex flex-col flex-wrap gap-2 absolute bottom-0 left-0">
      {flags.map((flag) => (
        <FlagTag key={flag.id} flag={flag} />
      ))}
    </div>
  );
}