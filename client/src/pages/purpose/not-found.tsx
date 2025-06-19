import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

export default function PurposeNotFound() {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <Heart className="w-16 h-16 text-purple-300 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Caminho Não Encontrado</h1>
        <p className="text-xl text-gray-600 mb-8">
          Parece que você se desviou do seu caminho de autodescoberta.
        </p>
        <p className="text-gray-500 mb-8">
          Mas não se preocupe - às vezes é nos desvios que encontramos as maiores revelações sobre nós mesmos.
        </p>
      </div>
      
      <Link href="/">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Home className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </Link>
    </div>
  );
}