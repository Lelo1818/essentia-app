import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    initials?: string;
  };
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base", 
    xl: "w-12 h-12 text-lg"
  };

  // Usuário fictício padrão se não fornecido
  const defaultUser = {
    name: "Ana Silva",
    email: "ana.silva@email.com",
    initials: "AS",
    avatar: ""
  };

  const userData = user || defaultUser;
  const initials = userData.initials || userData.name?.split(' ').map(n => n[0]).join('') || "U";

  if (userData.avatar) {
    return (
      <img 
        src={userData.avatar}
        alt={userData.name}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-semibold text-white",
      sizes[size],
      className
    )}>
      {initials}
    </div>
  );
}

export { UserAvatar };
export default UserAvatar;