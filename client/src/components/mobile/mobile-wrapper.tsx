import { ReactNode } from 'react';

interface MobileWrapperProps {
  children: ReactNode;
  title: string;
  backUrl?: string;
  backgroundColor?: string;
}

export function MobileWrapper({ 
  children, 
  title, 
  backUrl = "/", 
  backgroundColor = "bg-gradient-to-br from-blue-50 to-purple-50" 
}: MobileWrapperProps) {
  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <a 
            href={backUrl} 
            className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            ← Voltar
          </a>
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
          <div className="w-16"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}