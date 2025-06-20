import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OCRSuccessAnimation } from "@/components/ui/success-animation";

interface DocumentCameraProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: 'payslip' | 'credit-card' | 'invoice' | 'bank-statement' | 'tax-document' | 'receipt';
  onDataExtracted: (data: any) => void;
}

export default function DocumentCamera({ open, onOpenChange, documentType, onDataExtracted }: DocumentCameraProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const documentLabels = {
    payslip: "Holerite",
    'credit-card': "Fatura de Cartão",
    invoice: "Nota Fiscal",
    'bank-statement': "Extrato Bancário", 
    'tax-document': "Documento Fiscal",
    receipt: "Recibo/Comprovante"
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível acessar a câmera",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processDocument = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    
    try {
      // Simulação de OCR - em produção usaria API real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let mockData: any = {};
      
      switch (documentType) {
        case 'payslip':
          mockData = {
            company: "Tech Solutions Ltda",
            employee: "Marcelo Rymer",
            period: "06/2025",
            grossSalary: 8500.00,
            netSalary: 6890.50,
            deductions: {
              inss: 935.00,
              irpf: 674.50
            },
            benefits: {
              valeAlimentacao: 600.00,
              valeTransporte: 180.00
            }
          };
          break;
          
        case 'credit-card':
          mockData = {
            bank: "Nubank",
            cardNumber: "**** **** **** 9012",
            dueDate: "2025-07-15",
            totalAmount: 2850.00,
            minimumPayment: 285.00,
            transactions: [
              { description: "Supermercado Extra", amount: 320.50, date: "2025-06-18" },
              { description: "Netflix", amount: 45.90, date: "2025-06-15" },
              { description: "Posto Shell", amount: 180.00, date: "2025-06-14" }
            ]
          };
          break;
          
        case 'invoice':
          mockData = {
            issuer: "Design Studio LTDA",
            recipient: "Cliente Exemplo",
            invoiceNumber: "NF-2025/001",
            issueDate: "2025-06-20",
            services: "Criação de identidade visual",
            amount: 2200.00,
            iss: 110.00,
            netAmount: 2090.00
          };
          break;
          
        case 'bank-statement':
          mockData = {
            bank: "Nubank",
            account: "12345-6",
            period: "06/2025",
            initialBalance: 5650.30,
            finalBalance: 8750.30,
            transactions: [
              { date: "2025-06-20", description: "TED Recebida", amount: 2200.00, type: "credit" },
              { date: "2025-06-19", description: "Pagamento Cartão", amount: -2850.00, type: "debit" },
              { date: "2025-06-01", description: "Salário", amount: 8500.00, type: "credit" }
            ]
          };
          break;
          
        case 'tax-document':
          mockData = {
            documentType: "Informe de Rendimentos",
            year: 2024,
            payer: "Tech Solutions Ltda",
            recipient: "Marcelo Rymer",
            totalIncome: 102000.00,
            incomeTax: 8500.00,
            inssContribution: 11220.00
          };
          break;
          
        case 'receipt':
          mockData = {
            merchant: "Supermercado Extra",
            date: "2025-06-20",
            time: "14:30",
            total: 320.50,
            paymentMethod: "Cartão de Crédito",
            items: [
              { description: "Arroz 5kg", quantity: 1, price: 25.90 },
              { description: "Feijão 1kg", quantity: 2, price: 8.50 },
              { description: "Carne bovina", quantity: 1, price: 45.80 }
            ]
          };
          break;
      }
      
      setExtractedData(mockData);
      setShowSuccess(true);
      
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Não foi possível extrair os dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmData = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setCapturedImage(null);
    setExtractedData(null);
    setIsProcessing(false);
    setShowSuccess(false);
    
    // Stop camera if running
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    onOpenChange(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setExtractedData(null);
    startCamera();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Fotografar {documentLabels[documentType]}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!capturedImage && !extractedData && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedMetadata={startCamera}
                />
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 bg-white text-black hover:bg-gray-100"
                    onClick={capturePhoto}
                  >
                    <Camera className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Posicione o {documentLabels[documentType].toLowerCase()} na área da câmera
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Ou selecionar da galeria
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}

          {capturedImage && !extractedData && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={capturedImage} 
                  alt="Documento capturado" 
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={retakePhoto} className="flex-1">
                  Tirar Nova Foto
                </Button>
                <Button 
                  onClick={processDocument} 
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Extrair Dados
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {extractedData && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Dados Extraídos</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  {documentType === 'payslip' && (
                    <>
                      <div className="flex justify-between">
                        <span>Empresa:</span>
                        <span className="font-semibold">{extractedData.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Funcionário:</span>
                        <span className="font-semibold">{extractedData.employee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salário Bruto:</span>
                        <span className="font-semibold">R$ {extractedData.grossSalary?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salário Líquido:</span>
                        <span className="font-semibold">R$ {extractedData.netSalary?.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  
                  {documentType === 'credit-card' && (
                    <>
                      <div className="flex justify-between">
                        <span>Banco:</span>
                        <span className="font-semibold">{extractedData.bank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vencimento:</span>
                        <span className="font-semibold">{new Date(extractedData.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor Total:</span>
                        <span className="font-semibold">R$ {extractedData.totalAmount?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pagamento Mínimo:</span>
                        <span className="font-semibold">R$ {extractedData.minimumPayment?.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  
                  {documentType === 'receipt' && (
                    <>
                      <div className="flex justify-between">
                        <span>Estabelecimento:</span>
                        <span className="font-semibold">{extractedData.merchant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span className="font-semibold">{extractedData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-semibold">R$ {extractedData.total?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Forma de Pagamento:</span>
                        <span className="font-semibold">{extractedData.paymentMethod}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={retakePhoto} className="flex-1">
                  Nova Foto
                </Button>
                <Button onClick={confirmData} className="flex-1">
                  Confirmar Dados
                </Button>
              </div>
            </div>
          )}
        </div>

        <OCRSuccessAnimation
          show={showSuccess}
          extractedData={extractedData}
          onComplete={() => {
            setShowSuccess(false);
            toast({
              title: "Documento processado!",
              description: `Dados extraídos do ${documentLabels[documentType]} com sucesso`,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}