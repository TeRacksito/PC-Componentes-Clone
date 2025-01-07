import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  label: string;
  to?: string;
  queryParams?: { [key: string]: string | number };
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  to,
  queryParams,
  onClick,
  disabled = false,
  className = "",
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (to) {
      navigate(to);
    } else if (queryParams) {
      const searchParams = new URLSearchParams(location.search);
      Object.keys(queryParams).forEach((key) => {
        searchParams.set(key, queryParams[key].toString());
      });

      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={className + " cursor-pointer"}
    >
      {label}
    </button>
  );
};
