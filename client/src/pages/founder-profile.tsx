import { FounderProfile } from "@/components/founder-profile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function FounderProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Ecossistema</span>
            </Button>
          </Link>
        </div>

        <FounderProfile />
      </div>
    </div>
  );
}