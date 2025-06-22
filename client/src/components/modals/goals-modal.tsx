import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Simplified schema without strict validation
const goalFormSchema = z.object({
  title: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  targetAmount: z.string().min(1, "Valor da meta é obrigatório"),
  currentAmount: z.string().optional(),
  targetDate: z.string().optional(),
  category: z.string().optional(),
  priority: z.string().optional(),
});
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface GoalsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  targetAmount: z.string().min(1, "Valor da meta é obrigatório"),
  currentAmount: z.string().default("0"),
  targetDate: z.string().optional(),
  category: z.string().default("outros"),
  priority: z.string().default("média"),
});

type FormData = z.infer<typeof goalFormSchema>;

export default function GoalsModal({ open, onOpenChange }: GoalsModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      targetAmount: "",
      currentAmount: "0",
      targetDate: "",
      category: "outros",
      priority: "média",
    },
  });

  const createGoalMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        title: data.title,
        description: data.description || "",
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount || "0",
        targetDate: data.targetDate || "",
        category: data.category || "outros",
        priority: data.priority || "média",
        userId: 1
      };
      console.log("Creating goal with payload:", payload);
      return apiRequest("POST", "/api/goals", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Meta criada",
        description: "Sua meta foi criada com sucesso!",
      });
      form.reset({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        targetDate: "",
        category: "outros",
        priority: "média",
      });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error creating goal:", error);
      toast({
        title: "Erro",
        description: `Não foi possível criar a meta: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createGoalMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Meta</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Viagem para Europa, Carro Novo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Meta (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0,00" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Atual (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0,00" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Alvo (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <InteractiveButton 
                type="submit" 
                className="flex-1 gradient-primary"
                disabled={createGoalMutation.isPending}
                soundType="success"
              >
                {createGoalMutation.isPending ? "Criando..." : "Criar Meta"}
              </InteractiveButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
