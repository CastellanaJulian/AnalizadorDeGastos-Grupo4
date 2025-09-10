import { useState, useEffect } from 'react';
import { Transaction } from '@/types/transaction';
import { fetchTransactions } from '@/services/transactionService';
import { TransactionTable } from '@/components/TransactionTable';
import FormularioMovimiento from '@/components/FormularioMovimiento';
import { ExpenseSummary } from '@/components/ExpenseSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, TrendingUp, Calculator, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
      toast({
        title: "Transacciones cargadas",
        description: `Se cargaron ${data.length} movimientos exitosamente.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las transacciones.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Analizador Financiero
              </h1>
              <p className="text-muted-foreground mt-1">
                Analiza tus gastos y recibe recomendaciones inteligentes
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadTransactions}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <Button variant="default" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Formulario para agregar movimientos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Agregar nuevo movimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <FormularioMovimiento onAgregado={loadTransactions} />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <ExpenseSummary transactions={transactions} />
          <Separator />

          {/* Transactions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Detalle de Movimientos</h2>
            </div>
            
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Cargando transacciones...</p>
                </CardContent>
              </Card>
            ) : (
              <TransactionTable transactions={transactions} />
            )}
          </div>

          {/* Future Features */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Próximas Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Integración con Mercado Pago</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Categorización automática con IA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Recomendaciones personalizadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Gráficos avanzados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Exportar reportes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Alertas de gastos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
