import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface QuickNavButtonProps {
  showHome?: boolean;
  showBack?: boolean;
  backUrl?: string;
}

export default function QuickNavButton({ showHome = true, showBack = false, backUrl = '/' }: QuickNavButtonProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {showBack && (
        <Link href={backUrl}>
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </Link>
      )}
      
      {showHome && (
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
            <Home className="w-4 h-4 mr-1" />
            Início
          </Button>
        </Link>
      )}
    </div>
  );
}