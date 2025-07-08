import { useToast } from "@/hooks/use-toast";

export function useInteractiveActions() {
  const { toast } = useToast();

  const handleFinancialAction = (action: string, amount?: number, description?: string) => {
    switch (action) {
      case "add-income":
        toast({
          title: "Renda Adicionada!",
          description: `R$ ${amount?.toLocaleString('pt-BR') || '0'} foi registrado como renda`,
          variant: "default"
        });
        break;
      case "add-expense":
        toast({
          title: "Gasto Registrado",
          description: `R$ ${amount?.toLocaleString('pt-BR') || '0'} em ${description || 'categoria'}`,
          variant: "default"
        });
        break;
      case "add-goal":
        toast({
          title: "Meta Criada!",
          description: `Nova meta de R$ ${amount?.toLocaleString('pt-BR') || '0'} foi adicionada`,
          variant: "default"
        });
        break;
      case "investment-aport":
        toast({
          title: "Aporte Realizado!",
          description: `R$ ${amount?.toLocaleString('pt-BR') || '0'} investido em ${description}`,
          variant: "default"
        });
        break;
      default:
        toast({
          title: "Ação Executada",
          description: description || "Funcionalidade será implementada em breve",
          variant: "default"
        });
    }
  };

  const handleEducationAction = (action: string, courseName?: string) => {
    switch (action) {
      case "start-course":
        toast({
          title: "Curso Iniciado!",
          description: `Começando curso: ${courseName}`,
          variant: "default"
        });
        break;
      case "complete-lesson":
        toast({
          title: "Lição Concluída!",
          description: `Você ganhou +10 XP em ${courseName}`,
          variant: "default"
        });
        break;
      case "create-content":
        toast({
          title: "Conteúdo Criado!",
          description: "Novo material adicionado à sua biblioteca",
          variant: "default"
        });
        break;
      default:
        toast({
          title: "Ação Educacional",
          description: "Funcionalidade em desenvolvimento",
          variant: "default"
        });
    }
  };

  return {
    handleFinancialAction,
    handleEducationAction
  };
}