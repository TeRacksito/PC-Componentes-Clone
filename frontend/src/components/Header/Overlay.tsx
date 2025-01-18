import { useEscapeKey } from "../../hooks/onClickOutside";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  useEscapeKey(onClose);

  return (
    <div
      className={
        "fixed inset-0 bg-black/50 z-40 cursor-pointer backdrop-blur-[1.5px] " +
        (isOpen ? "block" : "hidden")
      }
      onClick={onClose}
      aria-hidden="true"
    ></div>
  );
};
