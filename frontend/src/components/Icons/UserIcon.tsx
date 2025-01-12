import { useAuth } from "../../contexts/AuthContext";

interface UserIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  username?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ username, ...props }) => {
  const { auth } = useAuth();

  return (
    <img
      src={`https://api.dicebear.com/9.x/initials/svg?seed=${auth.client?.username}`}
      alt="User icon"
      className="w-8 h-8 rounded-full"
      {...props}
    />
  );
};
