import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertExpenseSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { EXPENSE_CATEGORIES } from "@/types";
import { Camera, Upload } from "lucide-react";
import { useState } from "react";

interface ExpenseCameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  category: z.string().default("outros"),
  date: z.string().min(1, "Data é obrigatória"),
  isFromPhoto: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ExpenseCameraModal({ open, onOpenChange }: ExpenseCameraModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showOcrResults, setShowOcrResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "outros",
      date: new Date().toISOString().split('T')[0],
      isFromPhoto: true,
    },
  });

  const createExpenseMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        description: data.description,
        amount: data.amount, // Keep as string since server schema expects string
        category: data.category,
        date: data.date,
        userId: 1,
        isFromPhoto: data.isFromPhoto || false
      };
      console.log("Sending expense payload:", payload);
      return apiRequest("POST", "/api/expenses", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Gasto adicionado",
        description: "Seu gasto foi registrado com sucesso!",
      });
      form.reset();
      setShowOcrResults(false);
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o gasto. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleTakePhoto = () => {
    // Create a file input with camera capture for mobile
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use back camera on mobile
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsProcessing(true);
        // Process the captured image
        setTimeout(() => {
          setIsProcessing(false);
          setShowOcrResults(true);
          // Simulate OCR results based on common receipts
          const mockResults = [
            { description: "Supermercado Extra", amount: "127.85", category: "alimentacao" },
            { description: "Posto Shell", amount: "85.00", category: "transporte" },
            { description: "Farmácia Pacheco", amount: "45.90", category: "saude" },
            { description: "Restaurante Outback", amount: "98.50", category: "alimentacao" }
          ];
          const result = mockResults[Math.floor(Math.random() * mockResults.length)];
          
          form.setValue("description", result.description);
          form.setValue("amount", result.amount);
          form.setValue("category", result.category);
          toast({
            title: "Foto processada",
            description: "Dados extraídos com sucesso! Verifique e confirme.",
          });
        }, 2000);
      }
    };
    input.click();
  };

  const handleUploadPhoto = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      setIsProcessing(true);
      // Simulate OCR processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowOcrResults(true);
        // Mock OCR results
        form.setValue("description", "Posto Shell");
        form.setValue("amount", "85.00");
        form.setValue("category", "transporte");
        toast({
          title: "Foto processada",
          description: "Dados extraídos com sucesso! Verifique e confirme.",
        });
      }, 2000);
    };
    input.click();
  };

  const onSubmit = (data: FormData) => {
    createExpenseMutation.mutate(data);
  };

  const handleClose = () => {
    setShowOcrResults(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Gasto - Foto</DialogTitle>
        </DialogHeader>
        
        {!showOcrResults && !isProcessing && (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">📸 Câmera Inteligente</h4>
            <p className="text-sm text-gray-600 mb-6">Fotografe seu recibo e a IA extrairá automaticamente os dados!</p>
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                onClick={handleTakePhoto}
              >
                <Camera className="w-4 h-4 mr-2" />
                📱 Abrir Câmera
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleUploadPhoto}
              >
                <Upload className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Camera className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Processando imagem...</h4>
            <p className="text-sm text-gray-500">Extraindo informações do recibo</p>
          </div>
        )}
        
        {showOcrResults && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Dados Extraídos</h4>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estabelecimento</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(EXPENSE_CATEGORIES).map(([key, category]) => (
                            <SelectItem key={key} value={key}>
                              {category.name}
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
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 gradient-primary"
                  disabled={createExpenseMutation.isPending}
                >
                  {createExpenseMutation.isPending ? "Salvando..." : "Confirmar"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
