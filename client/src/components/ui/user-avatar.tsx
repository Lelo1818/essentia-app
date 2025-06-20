import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, User, Settings } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showEditButton?: boolean;
  showUserInfo?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

export default function UserAvatar({ size = "md", showEditButton = false, showUserInfo = false }: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [userName, setUserName] = useState("Marcelo Rymer");
  const [userEmail, setUserEmail] = useState("marcelo@flowapp.com");
  const { playSuccess, playClick } = useSoundEffects();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
        playSuccess();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = () => {
    // Generate a colorful avatar based on initials
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const colorClass = colors[userName.charCodeAt(0) % colors.length];
    
    return (
      <div className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center text-white font-bold ${size === 'xl' ? 'text-2xl' : size === 'lg' ? 'text-lg' : 'text-sm'}`}>
        {initials}
      </div>
    );
  };

  const AvatarComponent = () => (
    <div className="relative group">
      {avatarUrl ? (
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      ) : (
        generateAvatar()
      )}
      
      {showEditButton && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-1 -right-1 rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={playClick}
            >
              <Settings className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {avatarUrl ? (
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarUrl} alt={userName} />
                      <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Label htmlFor="avatar-upload">
                    <InteractiveButton size="sm" soundType="click" asChild>
                      <div className="cursor-pointer">
                        <Camera className="w-4 h-4 mr-2" />
                        Foto
                      </div>
                    </InteractiveButton>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {avatarUrl && (
                    <InteractiveButton 
                      size="sm" 
                      variant="outline"
                      soundType="click"
                      onClick={() => {
                        setAvatarUrl("");
                        playSuccess();
                      }}
                    >
                      Remover
                    </InteractiveButton>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userName">Nome</Label>
                  <Input
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              </div>

              <InteractiveButton 
                className="w-full" 
                soundType="success"
                onClick={() => {
                  setIsOpen(false);
                  playSuccess();
                }}
              >
                Salvar Alterações
              </InteractiveButton>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  if (showUserInfo) {
    return (
      <div className="flex items-center space-x-3">
        <AvatarComponent />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
      </div>
    );
  }

  return <AvatarComponent />;
}