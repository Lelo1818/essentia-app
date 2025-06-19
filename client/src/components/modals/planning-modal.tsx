import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBudgetSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/financial-utils";
import { useState, useEffect } from "react";

interface PlanningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = insertBudgetSchema.extend({
  fixedExpenses: z.string(),
  variableExpenses: z.string(),
  savings: z.string(),
  leisure: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function PlanningModal({ open, onOpenChange }: PlanningModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [totalAllocation, setTotalAllocation] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedExpenses: "0",
      variableExpenses: "0",
      savings: "0",
      leisure: "0",
    },
  });

  const { data: budget } = useQuery({
    queryKey: ["/api/budget"],
    enabled: open,
  });

  const { data: summary } = useQuery({
    queryKey: ["/api/financial-summary"],
    enabled: open,
  });

  useEffect(() => {
    if (budget) {
      form.setValue("fixedExpenses", budget.fixedExpenses);
      form.setValue("variableExpenses", budget.variableExpenses);
      form.setValue("savings", budget.savings);
      form.setValue("leisure", budget.leisure);
    }
  }, [budget, form]);

  // Watch form values to calculate total
  const watchedValues = form.watch();
  useEffect(() => {
    const total = Object.values(watchedValues).reduce((sum, value) => {
      return sum + (parseFloat(value as string) || 0);
    }, 0);
    setTotalAllocation(total);
  }, [watchedValues]);

  const saveBudgetMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        fixedExpenses: parseFloat(data.fixedExpenses),
        variableExpenses: parseFloat(data.variableExpenses),
        savings: parseFloat(data.savings),
        leisure: parseFloat(data.leisure),
        userId: 1 // Mock user ID
      };
      return apiRequest("POST", "/api/budget", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/budget"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Planejamento salvo",
        description: "Sua alocação de renda foi salva com sucesso!",
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o planejamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    saveBudgetMutation.mutate(data);
  };

  const totalIncome = summary?.totalIncome || 0;
  const remainingIncome = totalIncome - totalAllocation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Planejamento de Alocação</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Renda Total do Mês:</span>
            <span className="font-semibold">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Total Alocado:</span>
            <span className="font-semibold">{formatCurrency(totalAllocation)}</span>
          </div>
          <div className={`flex justify-between text-sm mt-1 font-semibold ${
            remainingIncome >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>Restante:</span>
            <span>{formatCurrency(remainingIncome)}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fixedExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas Fixas (R$)</FormLabel>
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
              name="variableExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas Variáveis (R$)</FormLabel>
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
              name="savings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poupança (R$)</FormLabel>
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
              name="leisure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lazer (R$)</FormLabel>
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
            
            {remainingIncome < 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  ⚠️ Você está alocando mais do que sua renda permite. 
                  Ajuste os valores para equilibrar seu orçamento.
                </p>
              </div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 gradient-primary"
                disabled={saveBudgetMutation.isPending || remainingIncome < 0}
              >
                {saveBudgetMutation.isPending ? "Salvando..." : "Salvar Planejamento"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
