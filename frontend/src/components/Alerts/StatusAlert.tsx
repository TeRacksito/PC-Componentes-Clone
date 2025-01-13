import { forwardRef, useImperativeHandle, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

interface StatusAlertProps {
  timeout?: number;
}

export interface StatusAlertHandles {
  showAlert: (status: "success" | "error" | "warning", message: string) => void;
}

export const StatusAlert = forwardRef<StatusAlertHandles, StatusAlertProps>(
  ({ timeout = 3000 }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isTranslated, setIsTranslated] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"success" | "error" | "warning">(
      "success",
    );
    const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

    useImperativeHandle(ref, () => ({
      showAlert(status, message) {
        setStatus(status);
        setMessage(message);
        setIsVisible(true);
        setIsTranslated(true);

        if (timeouts.length) {
          timeouts.forEach((timeoutId) => {
            clearTimeout(timeoutId);
          });
          setTimeouts([]);
        }

        const timeout1 = setTimeout(
          () => {
            setIsTranslated(false);
          },
          Math.max(timeout - 150, 150),
        );

        const timeout2 = setTimeout(
          () => {
            setIsVisible(false);
          },
          Math.max(timeout, 300),
        );

        setTimeouts((prev) => [...prev, timeout1, timeout2]);
        return;
      },
    }));

    const alertClass =
      status === "success"
        ? "bg-green-500"
        : status === "error"
          ? "bg-red-500"
          : "bg-yellow-500";

    return (
      <div
        className={`z-1000 fixed bottom-0 right-0 mb-4 mr-4 max-w-xs px-4 py-3 rounded shadow-lg text-white transition-transform transform flex items-center gap-2 ${
          isVisible ? "visible" : "invisible"
        } ${isTranslated ? "translate-x-0" : "translate-x-full"} ${alertClass}`}
        style={{ scrollbarGutter: "unset" }}
      >
        {status === "success" ? (
          <FaCheckCircle />
        ) : status === "error" ? (
          <FaTimesCircle />
        ) : (
          <FaExclamationTriangle />
        )}
        {message}
      </div>
    );
  },
);
