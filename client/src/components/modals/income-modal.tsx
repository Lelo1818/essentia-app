import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIncomeSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { INCOME_FREQUENCIES } from "@/types";

interface IncomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = insertIncomeSchema.extend({
  amount: z.string().min(1, "Valor é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export default function IncomeModal({ open, onOpenChange }: IncomeModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      frequency: "mensal",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const createIncomeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        description: data.description,
        amount: data.amount,
        frequency: data.frequency,
        date: data.date,
        userId: 1
      };
      console.log("Sending income payload:", payload);
      return apiRequest("POST", "/api/incomes", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incomes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Renda adicionada",
        description: "Sua renda foi registrada com sucesso!",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a renda. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createIncomeMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Renda</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Salário, Freelance..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
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
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INCOME_FREQUENCIES.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
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
              <Button 
                type="submit" 
                className="flex-1 gradient-primary"
                disabled={createIncomeMutation.isPending}
              >
                {createIncomeMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
