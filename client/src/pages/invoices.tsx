import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Plus, 
  Download, 
  Send, 
  Eye,
  Calculator,
  Calendar,
  User,
  Building,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
  Mail,
  Smartphone
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";
import DocumentCamera from "@/components/camera/document-camera";

export default function Invoices() {
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleInvoiceData = (data: any) => {
    toast({
      title: "Nota fiscal processada!",
      description: `NF ${data.invoiceNumber} de ${formatCurrency(data.amount)} identificada`,
    });
  };

  // Dados do prestador de serviços (Marcelo)
  const serviceProvider = {
    name: "Marcelo Rymer",
    cnpj: "12.345.678/0001-90",
    profession: "Designer Gráfico",
    address: "Rua das Flores, 123, São Paulo - SP",
    phone: "(11) 99999-9999",
    email: "marcelo@designer.com",
    municipalRegistration: "123456789"
  };

  // Notas fiscais emitidas
  const invoices = [
    {
      id: "NFS-2025001",
      clientName: "Tech Solutions Ltda",
      clientCnpj: "98.765.432/0001-10",
      serviceDescription: "Criação de identidade visual completa",
      amount: 2200,
      issueDate: "2025-06-15",
      dueDate: "2025-07-15",
      status: "Paga",
      paymentDate: "2025-06-20",
      iss: 110, // 5% sobre o valor
      categoryCode: "07498", // Serviços de design
      type: "Serviço"
    },
    {
      id: "NFS-2025002", 
      clientName: "Clínica Bem Estar",
      clientCnpj: "11.222.333/0001-44",
      serviceDescription: "Design de materiais promocionais",
      amount: 850,
      issueDate: "2025-06-10",
      dueDate: "2025-07-10", 
      status: "Pendente",
      iss: 42.5,
      categoryCode: "07498",
      type: "Serviço"
    },
    {
      id: "NFS-2025003",
      clientName: "Dr. João Silva",
      clientCnpj: "123.456.789-00", // CPF para pessoa física
      serviceDescription: "Consulta psicológica - sessão terapêutica",
      amount: 180,
      issueDate: "2025-06-18",
      dueDate: "2025-06-18", // Pagamento à vista
      status: "Paga",
      paymentDate: "2025-06-18",
      iss: 9, // 5% sobre o valor
      categoryCode: "08630", // Atividade médica ambulatorial
      type: "Consulta"
    },
    {
      id: "NFS-2025004",
      clientName: "Maria Santos",
      clientCnpj: "987.654.321-00",
      serviceDescription: "Sessão de fisioterapia - reabilitação",
      amount: 120,
      issueDate: "2025-06-19",
      dueDate: "2025-06-19",
      status: "Paga",
      paymentDate: "2025-06-19", 
      iss: 6,
      categoryCode: "08690", // Outras atividades de atenção à saúde
      type: "Terapia"
    }
  ];

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === "Paga").reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices.filter(inv => inv.status === "Pendente").reduce((sum, inv) => sum + inv.amount, 0);
  const totalIss = invoices.reduce((sum, inv) => sum + inv.iss, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paga": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Vencida": return "bg-red-100 text-red-800";
      case "Cancelada": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Consulta": return User;
      case "Terapia": return User;
      case "Serviço": return Building;
      default: return FileText;
    }
  };

  const serviceCategories = [
    { code: "07498", name: "Serviços de design gráfico" },
    { code: "08630", name: "Atividade médica ambulatorial" },
    { code: "08690", name: "Outras atividades de atenção à saúde humana" },
    { code: "07420", name: "Serviços de fotografia" },
    { code: "07319", name: "Publicidade" },
    { code: "06204", name: "Consultoria em tecnologia" },
    { code: "08592", name: "Ensino de idiomas" },
    { code: "07112", name: "Serviços de engenharia" }
  ];

  const handleNewInvoice = () => {
    setNewInvoiceOpen(true);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewInvoiceOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notas Fiscais de Serviço</h1>
            <p className="text-gray-600 mt-2">Gerencie suas NFS-e para prestação de serviços</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setCameraOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Camera className="w-4 h-4 mr-2" />
              Foto Nota Fiscal
            </Button>
            <Button onClick={handleNewInvoice} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Manual
            </Button>
            <Button variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              Relatório ISS
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Faturado</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalInvoiced)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Valor Recebido</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pendente</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">ISS a Recolher</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalIss)}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="invoices">Notas Fiscais</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notas Fiscais Emitidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => {
                    const TypeIcon = getTypeIcon(invoice.type);
                    return (
                      <div key={invoice.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <TypeIcon className="w-5 h-5 text-gray-500" />
                            <div>
                              <h4 className="font-semibold">{invoice.id}</h4>
                              <p className="text-sm text-gray-500">{invoice.clientName}</p>
                              <p className="text-xs text-gray-400">{invoice.serviceDescription}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg">{formatCurrency(invoice.amount)}</p>
                            <p className="text-xs text-gray-500">ISS: {formatCurrency(invoice.iss)}</p>
                            <p className="text-xs text-gray-500">Emitida: {new Date(invoice.issueDate).toLocaleDateString()}</p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => handleViewInvoice(invoice)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from(new Set(invoices.map(inv => inv.clientName))).map((clientName, index) => {
                    const clientInvoices = invoices.filter(inv => inv.clientName === clientName);
                    const totalClient = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
                    const lastInvoice = clientInvoices.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())[0];
                    
                    return (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold">{clientName}</h4>
                        <p className="text-sm text-gray-500">{lastInvoice.clientCnpj}</p>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm">
                            <span>Total faturado</span>
                            <span className="font-semibold">{formatCurrency(totalClient)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Notas emitidas</span>
                            <span className="font-semibold">{clientInvoices.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Última nota</span>
                            <span className="font-semibold">{new Date(lastInvoice.issueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-3" variant="outline" size="sm">
                          Ver Histórico
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório Mensal - Junho 2025</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Notas emitidas</span>
                      <span className="font-semibold">{invoices.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receita bruta</span>
                      <span className="font-semibold">{formatCurrency(totalInvoiced)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ISS recolhido</span>
                      <span className="font-semibold">{formatCurrency(totalIss)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Receita líquida</span>
                      <span>{formatCurrency(totalInvoiced - totalIss)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo de Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Design gráfico</span>
                      <span className="font-semibold">{formatCurrency(3050)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consultas médicas</span>
                      <span className="font-semibold">{formatCurrency(180)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fisioterapia</span>
                      <span className="font-semibold">{formatCurrency(120)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Prestador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome/Razão Social</Label>
                    <Input value={serviceProvider.name} readOnly />
                  </div>
                  <div>
                    <Label>CNPJ/CPF</Label>
                    <Input value={serviceProvider.cnpj} readOnly />
                  </div>
                  <div>
                    <Label>Profissão/Atividade</Label>
                    <Input value={serviceProvider.profession} readOnly />
                  </div>
                  <div>
                    <Label>Inscrição Municipal</Label>
                    <Input value={serviceProvider.municipalRegistration} readOnly />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Endereço</Label>
                    <Input value={serviceProvider.address} readOnly />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input value={serviceProvider.phone} readOnly />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input value={serviceProvider.email} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal Nova NFS-e */}
        <Dialog open={newInvoiceOpen} onOpenChange={setNewInvoiceOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Emitir Nova NFS-e</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Dados do Cliente</h3>
                <div>
                  <Label>Nome/Razão Social</Label>
                  <Input placeholder="Nome do cliente" />
                </div>
                <div>
                  <Label>CPF/CNPJ</Label>
                  <Input placeholder="000.000.000-00" />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="cliente@email.com" />
                </div>
                <div>
                  <Label>Endereço</Label>
                  <Input placeholder="Endereço completo" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Dados do Serviço</h3>
                <div>
                  <Label>Descrição do Serviço</Label>
                  <Textarea placeholder="Descreva o serviço prestado..." />
                </div>
                <div>
                  <Label>Código do Serviço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar código" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((cat) => (
                        <SelectItem key={cat.code} value={cat.code}>
                          {cat.code} - {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Valor do Serviço</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
                <div>
                  <Label>Data de Vencimento</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="flex-1" onClick={() => setNewInvoiceOpen(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Emitir NFS-e
              </Button>
              <Button variant="outline" onClick={() => setNewInvoiceOpen(false)}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Camera Modal */}
        <DocumentCamera 
          open={cameraOpen} 
          onOpenChange={setCameraOpen}
          documentType="invoice"
          onDataExtracted={handleInvoiceData}
        />

        {/* Modal Visualizar NFS-e */}
        <Dialog open={viewInvoiceOpen} onOpenChange={setViewInvoiceOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nota Fiscal de Serviço - {selectedInvoice?.id}</DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-6">
                <div className="text-center border-b pb-4">
                  <h2 className="text-xl font-bold">NOTA FISCAL DE SERVIÇO ELETRÔNICA</h2>
                  <p className="text-gray-600">NFS-e Nº {selectedInvoice.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Prestador de Serviços</h3>
                    <p className="text-sm">{serviceProvider.name}</p>
                    <p className="text-sm">CNPJ: {serviceProvider.cnpj}</p>
                    <p className="text-sm">{serviceProvider.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Tomador de Serviços</h3>
                    <p className="text-sm">{selectedInvoice.clientName}</p>
                    <p className="text-sm">Doc: {selectedInvoice.clientCnpj}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Discriminação dos Serviços</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedInvoice.serviceDescription}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Código do serviço: {selectedInvoice.categoryCode}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Valores</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Valor dos serviços:</span>
                        <span>{formatCurrency(selectedInvoice.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ISS (5%):</span>
                        <span>{formatCurrency(selectedInvoice.iss)}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-1">
                        <span>Valor líquido:</span>
                        <span>{formatCurrency(selectedInvoice.amount - selectedInvoice.iss)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Informações</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Data de emissão:</span>
                        <span>{new Date(selectedInvoice.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vencimento:</span>
                        <span>{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedInvoice.status)}>
                          {selectedInvoice.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}