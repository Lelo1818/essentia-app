import { useState, useMemo } from "react";
import logoUrl from "@assets/Logo Thera_1760542286894.jpg";

const BRAND = {
  bg: "#0f1a2a",
  gold: "#c6a86b",
  goldSoft: "#e5d6b0",
};

// Simulated market data generators
const generatePriceData = (days: number, basePrice: number, volatility: number) => {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * volatility;
    price = Math.max(price + change, basePrice * 0.8);
    data.push({ day: i, price: price, change });
  }
  return data;
};

const generateCandlesticks = (count: number) => {
  const data = [];
  let close = 127500;
  for (let i = 0; i < count; i++) {
    const open = close + (Math.random() - 0.5) * 200;
    const high = Math.max(open, close) + Math.random() * 150;
    const low = Math.min(open, close) - Math.random() * 150;
    close = open + (Math.random() - 0.48) * 250;
    data.push({ open, high, low, close, time: i });
  }
  return data;
};

const Logo = ({ size = 28 }: { size?: number }) => (
  <div className="flex items-center gap-3 select-none">
    <img 
      src={logoUrl} 
      alt="Thera Funding" 
      className="rounded-xl"
      style={{
        width: size * 1.8,
        height: size * 1.8,
      }}
    />
    <div>
      <div className="text-[14px] tracking-[0.18em] font-semibold" style={{ color: BRAND.gold }}>
        THERA
      </div>
      <div className="text-[10px] tracking-[0.32em] opacity-80" style={{ color: BRAND.gold }}>
        FUNDING
      </div>
    </div>
  </div>
);

const Button = ({ children, onClick, variant = "gold", size = "md", className = "" }: any) => {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.98] touch-manipulation min-h-[44px]";
  const sizes: Record<string, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-[0.95rem]",
    lg: "px-5 py-3.5 text-base",
  };
  const variants: Record<string, string> = {
    gold: "bg-[#c6a86b] text-[#0b1220] hover:opacity-90 active:opacity-80",
    ghost: "bg-transparent text-[#c6a86b] border-2 border-[#c6a86b] hover:bg-[#c6a86b] hover:text-[#0b1220]",
    dark: "bg-[#0b1220] text-[#c6a86b] border-2 border-[#c6a86b] hover:bg-[#0d1424]",
  };
  return (
    <button 
      onClick={onClick} 
      className={[base, sizes[size] || sizes.md, variants[variant] || variants.gold, className].join(" ")}
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
    > 
      {children}
    </button>
  );
};

const Chip = ({ children, tone = "gold" }: any) => (
  <span
    className={`px-2.5 py-1 rounded-full text-[11px] tracking-wide border ${
      tone === "gold"
        ? "text-[#c6a86b] border-[#c6a86b]"
        : "text-white/80 border-white/20"
    }`}
  >
    {children}
  </span>
);

const Card = ({ title, subtitle, right, children, className = "" }: any) => (
  <div className={`rounded-2xl bg-[#0f1725] border border-white/10 p-4 md:p-5 ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div>
        {title && <div className="text-white/90 font-semibold text-sm md:text-base">{title}</div>}
        {subtitle && <div className="text-white/50 text-xs mt-0.5">{subtitle}</div>}
      </div>
      {right}
    </div>
    {children}
  </div>
);

const Metric = ({ label, value, delta }: any) => (
  <div>
    <div className="text-white/60 text-xs">{label}</div>
    <div className="text-white font-semibold text-lg md:text-xl mt-1">{value}</div>
    {delta && (
      <div className={`text-xs mt-1 ${delta.startsWith("-") ? "text-red-400" : "text-emerald-400"}`}>{delta}</div>
    )}
  </div>
);

type Route = "login" | "dashboard" | "journal" | "game" | "reports" | "community" | "pipeline";

export default function Thera() {
  const [route, setRoute] = useState<Route>("login");
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const go = (r: Route) => {
    setRoute(r);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: BRAND.bg }}>
      {route !== "login" && (
        <TopBar onNavigate={go} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      )}

      {route === "login" && <ScreenLogin onEnter={(u: string) => { setUser({ name: u }); go("dashboard"); }} onGuest={() => go("game")} />}
      {route === "dashboard" && <ScreenDashboard onNavigate={go} />}
      {route === "journal" && <ScreenJournal />}
      {route === "game" && <ScreenGame onNavigate={go} />}
      {route === "reports" && <ScreenReports />}
      {route === "community" && <ScreenCommunity />}
      {route === "pipeline" && <ScreenPipeline />}

      <Footer />
    </div>
  );
}

const TopBar = ({ onNavigate, mobileMenuOpen, setMobileMenuOpen }: any) => (
  <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[#0f1a2a]/90 bg-[#0f1a2a] border-b border-white/10">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <Logo />
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-2">
        <NavBtn onClick={() => onNavigate("dashboard")}>Dashboard</NavBtn>
        <NavBtn onClick={() => onNavigate("journal")}>Diário</NavBtn>
        <NavBtn onClick={() => onNavigate("game")}>Game Mode</NavBtn>
        <NavBtn onClick={() => onNavigate("reports")}>Relatórios</NavBtn>
        <NavBtn onClick={() => onNavigate("community")}>Comunidade</NavBtn>
        <NavBtn onClick={() => onNavigate("pipeline")}>Pipeline</NavBtn>
      </nav>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg text-[#c6a86b] hover:bg-white/5 touch-manipulation min-h-[44px] min-w-[44px]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        data-testid="button-mobile-menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden border-t border-white/10 bg-[#0f1a2a]">
        <nav className="flex flex-col p-4 gap-2">
          <MobileNavBtn onClick={() => onNavigate("dashboard")}>📊 Dashboard</MobileNavBtn>
          <MobileNavBtn onClick={() => onNavigate("journal")}>📝 Diário</MobileNavBtn>
          <MobileNavBtn onClick={() => onNavigate("game")}>🎮 Game Mode</MobileNavBtn>
          <MobileNavBtn onClick={() => onNavigate("reports")}>📈 Relatórios</MobileNavBtn>
          <MobileNavBtn onClick={() => onNavigate("community")}>👥 Comunidade</MobileNavBtn>
          <MobileNavBtn onClick={() => onNavigate("pipeline")}>🎯 Pipeline</MobileNavBtn>
        </nav>
      </div>
    )}
  </div>
);

const NavBtn = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition text-sm touch-manipulation min-h-[44px]"
    data-testid={`nav-${children?.toString().toLowerCase()}`}
  >
    {children}
  </button>
);

const MobileNavBtn = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="px-4 py-3 rounded-lg text-white/90 bg-white/5 hover:bg-white/10 transition text-left touch-manipulation min-h-[44px]"
    data-testid={`mobile-nav-${children?.toString().split(' ')[1]?.toLowerCase()}`}
  >
    {children}
  </button>
);

const Footer = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 text-center text-white/30 text-xs">
    © {new Date().getFullYear()} Thera Funding · Game→Real · Diário Emocional · IA de Consistência
  </div>
);

// ---- Screens ----

const ScreenLogin = ({ onEnter, onGuest }: any) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="grid place-items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f1725] p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <Logo size={34} />
        </div>
        <h1 className="text-center text-white text-xl md:text-2xl font-semibold">Operar é fácil. Evoluir é o que diferencia.</h1>
        <p className="text-center text-white/60 text-sm mt-2">Entre para a liga que conecta <b>disciplina</b>, <b>comunidade</b> e <b>capital</b>.</p>

        <div className="mt-6 space-y-3">
          <input
            className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-[rgba(198,168,107,0.35)] text-base"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-email"
          />
          <input
            type="password"
            className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-[rgba(198,168,107,0.35)] text-base"
            placeholder="Senha"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            data-testid="input-senha"
          />
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-2">
          <Button className="flex-1" onClick={() => onEnter(email || "Trader")}>Entrar</Button>
          <Button className="flex-1" variant="ghost" onClick={onGuest}>Entrar como Convidado</Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card title="Diferencial 1" subtitle="Game → Real" >
            <p className="text-white/70 text-sm">Destaque-se no <b>Game Mode</b> e receba <b>convite automático</b> para avaliação na mesa real.</p>
          </Card>
          <Card title="Diferencial 2" subtitle="Diário Emocional + Técnico" >
            <p className="text-white/70 text-sm">Registre setups e emoções. A IA detecta padrões e sugere <b>freios de risco</b>.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ScreenDashboard = ({ onNavigate }: any) => {
  const performanceData = useMemo(() => generatePriceData(7, 50000, 400), []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <h2 className="text-white text-xl md:text-2xl font-semibold">Painel</h2>
        <Chip>Conta Demo</Chip>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card><Metric label="Capital Alocado" value="$50.000" delta="+0%" /></Card>
        <Card><Metric label="P/L Hoje" value="+$340" delta="+0.7%" /></Card>
        <Card><Metric label="Taxa de Acerto (30d)" value="54%" delta="+3pp" /></Card>
        <Card><Metric label="Consistência" value="Ótima" delta="" /></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <Card title="Performance (7d)" right={<Chip>live data</Chip>} className="lg:col-span-2">
          <div className="rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 p-4">
            <LineChart data={performanceData} height={140} />
          </div>
        </Card>
        <Card title="Ações rápidas">
          <div className="grid gap-2">
            <Button onClick={() => onNavigate("journal")}>Novo Trade / Diário</Button>
            <Button variant="ghost" onClick={() => onNavigate("game")}>Abrir Game Mode</Button>
            <Button variant="dark" onClick={() => onNavigate("reports")}>Ver Relatórios</Button>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card title="Feedback Inteligente" subtitle="IA de Consistência">
          <ul className="text-white/80 text-sm list-disc pl-5 space-y-2">
            <li>Seu risco médio por trade subiu 18% em dias de <i>euforia</i>. Sugerimos limite automático.</li>
            <li>Maior precisão entre 10h–12h. Evite operar após 3 <i>stops</i> seguidos.</li>
            <li>Setup X performa melhor em contratos mini. Ajustar alocação.</li>
          </ul>
        </Card>
        <Card title="Ranking Semanal" right={<Chip>liga interna</Chip>}>
          <ol className="text-white/80 text-sm space-y-1">
            <li>1º @Lobo – +4.3%</li>
            <li>2º @Gaia – +3.8%</li>
            <li>3º @Orion – +3.2%</li>
            <li>…</li>
          </ol>
        </Card>
        <Card title="Pipeline" subtitle="Trilha para operar capital da mesa" className="md:col-span-2 lg:col-span-1">
          <p className="text-white/70 text-sm">Jogue → Consistência ≥ 20 sessões → Envio automático de relatório → Convite.</p>
          <div className="mt-3"><Button onClick={() => onNavigate("pipeline")}>Ver pipeline</Button></div>
        </Card>
      </div>
    </div>
  );
};

const ScreenJournal = () => {
  const [form, setForm] = useState({
    symbol: "WINM25",
    side: "Compra",
    size: 1,
    setup: "Quebra de canal",
    emotion: "Confiante",
    result: "+120",
    notes: "Entrei com confirmação. Poderia ter protegido antes."
  });

  const set = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">Diário de Trades</h2>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Registrar Trade">
          <div className="grid gap-3">
            <Row label="Ativo"><Input value={form.symbol} onChange={(e: any) => set("symbol", e.target.value)} /></Row>
            <Row label="Lado"><Select value={form.side} onChange={(e: any) => set("side", e.target.value)} options={["Compra", "Venda"]} /></Row>
            <Row label="Tamanho"><Input type="number" value={form.size} onChange={(e: any) => set("size", e.target.value)} /></Row>
            <Row label="Setup"><Input value={form.setup} onChange={(e: any) => set("setup", e.target.value)} /></Row>
            <Row label="Emoção"><Select value={form.emotion} onChange={(e: any) => set("emotion", e.target.value)} options={["Confiante", "Eufórico", "Ansioso", "Calmo", "Com Medo", "Irritado"]} /></Row>
            <Row label="Resultado"><Input value={form.result} onChange={(e: any) => set("result", e.target.value)} /></Row>
            <Row label="Notas"><Textarea value={form.notes} onChange={(e: any) => set("notes", e.target.value)} /></Row>
            <div className="flex flex-col md:flex-row gap-2">
              <Button className="flex-1">Salvar</Button>
              <Button className="flex-1" variant="ghost">Upload Screenshot</Button>
            </div>
          </div>
        </Card>

        <Card title="Padrões Emocionais" subtitle="últimos 30 dias" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <MiniBar label="Euforia" value={42} />
            <MiniBar label="Ansiedade" value={25} />
            <MiniBar label="Confiança" value={61} />
          </div>
          <p className="text-white/60 text-sm mt-4">Sugestão: habilite <b>freio de risco</b> ao detectar <i>euforia</i> + 2 wins consecutivos.</p>
        </Card>
      </div>
    </div>
  );
};

const ScreenGame = ({ onNavigate }: any) => {
  const candleData = useMemo(() => generateCandlesticks(40), []);
  const [currentPrice, setCurrentPrice] = useState(127500);
  const [position, setPosition] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [accountBalance, setAccountBalance] = useState(50000);
  const [boleta, setBoleta] = useState({ qty: 1, stop: '', gain: '', orderType: 'Mercado' });
  const [priceHistory, setPriceHistory] = useState<number[]>([127500]);
  
  // Simulate real-time price updates (1s interval)
  useState(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 30;
        const newPrice = Math.max(prev + change, 125000);
        setPriceHistory(h => [...h.slice(-30), newPrice]);
        return newPrice;
      });
    }, 1000);
    return () => clearInterval(interval);
  });
  
  // Generate order book
  const orderBook = useMemo(() => {
    const book: any = { buy: [], sell: [] };
    for (let i = 0; i < 5; i++) {
      book.buy.push({ price: currentPrice - (i + 1) * 25, qty: Math.floor(Math.random() * 50) + 10 });
      book.sell.push({ price: currentPrice + (i + 1) * 25, qty: Math.floor(Math.random() * 50) + 10 });
    }
    return book;
  }, [currentPrice]);
  
  const executeTrade = (side: 'buy' | 'sell') => {
    if (position) return; // Already in position
    const entryPrice = currentPrice;
    const stopPrice = boleta.stop ? parseInt(boleta.stop) : (side === 'buy' ? entryPrice - 200 : entryPrice + 200);
    const gainPrice = boleta.gain ? parseInt(boleta.gain) : (side === 'buy' ? entryPrice + 300 : entryPrice - 300);
    
    const newPosition = {
      side,
      qty: boleta.qty,
      entryPrice,
      stop: stopPrice,
      gain: gainPrice,
      pnl: 0
    };
    setPosition(newPosition);
  };
  
  const closePosition = () => {
    if (!position) return;
    const exitPrice = currentPrice;
    const pnl = position.side === 'buy' 
      ? (exitPrice - position.entryPrice) * position.qty
      : (position.entryPrice - exitPrice) * position.qty;
    
    setTrades(prev => [...prev, { ...position, exitPrice, pnl, time: new Date().toLocaleTimeString() }]);
    setAccountBalance(prev => prev + pnl);
    setPosition(null);
    setBoleta({ qty: 1, stop: '', gain: '', orderType: 'Mercado' });
  };
  
  // Update position P&L in real-time using useEffect
  useState(() => {
    if (!position) return;
    
    const pnl = position.side === 'buy'
      ? (currentPrice - position.entryPrice) * position.qty
      : (position.entryPrice - currentPrice) * position.qty;
    
    setPosition((prev: any) => prev ? { ...prev, pnl } : null);
    
    // Auto close on stop/gain
    if ((position.side === 'buy' && currentPrice <= position.stop) ||
        (position.side === 'sell' && currentPrice >= position.stop) ||
        (position.side === 'buy' && currentPrice >= position.gain) ||
        (position.side === 'sell' && currentPrice <= position.gain)) {
      setTimeout(closePosition, 100);
    }
  });
  
  const sessionPnL = trades.reduce((sum, t) => sum + t.pnl, 0) + (position?.pnl || 0);
  const totalBalance = accountBalance + (position?.pnl || 0);
  const isUp = priceHistory.length >= 2 && currentPrice > priceHistory[priceHistory.length - 2];
  
  const maxPrice = Math.max(...priceHistory.slice(-10));
  const minPrice = Math.min(...priceHistory.slice(-10));
  const spread = orderBook.sell[0]?.price - orderBook.buy[0]?.price;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-white text-xl md:text-2xl font-semibold">Game Mode – Trader Academy</h2>
          <Chip>live simulation</Chip>
        </div>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="text-white/60 text-sm">Saldo Total:</div>
            <div className={`font-bold text-lg ${totalBalance >= 50000 ? 'text-emerald-400' : 'text-red-400'}`}>
              R$ {totalBalance.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-white/60 text-sm">Sessão:</div>
            <div className={`font-semibold ${sessionPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {sessionPnL >= 0 ? '+' : ''}{sessionPnL.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Chart */}
        <Card title="WINM25" right={<Chip tone={isUp ? "green" : "red"}>R$ {currentPrice.toFixed(0)}</Chip>} className="lg:col-span-8">
          <div className="mb-3 grid grid-cols-4 gap-2 text-xs">
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-white/50">Máxima (10min)</div>
              <div className="text-emerald-400 font-semibold">{maxPrice.toFixed(0)}</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-white/50">Mínima (10min)</div>
              <div className="text-red-400 font-semibold">{minPrice.toFixed(0)}</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-white/50">Spread</div>
              <div className="text-white font-semibold">{spread.toFixed(0)} pts</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="text-white/50">Volume</div>
              <div className="text-[#c6a86b] font-semibold">High</div>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 p-3">
            <CandlestickChart data={candleData} height={220} />
          </div>
          {position && (
            <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Posição Aberta</span>
                <span className={`font-bold ${position.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {position.side === 'buy' ? '🟢 COMPRADO' : '🔴 VENDIDO'} {position.qty}x
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-white/50">Entrada</div>
                  <div className="text-white font-semibold">{position.entryPrice.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-white/50">Atual</div>
                  <div className="text-white font-semibold">{currentPrice.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-white/50">P&L</div>
                  <div className={`font-bold ${position.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    R$ {position.pnl.toFixed(2)}
                  </div>
                </div>
                <div>
                  <Button size="sm" variant="dark" onClick={closePosition} className="w-full">Zerar</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        {/* Order Book & Boleta */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="Book de Ofertas" subtitle="níveis 1-5">
            <div className="space-y-1">
              {orderBook.sell.reverse().map((order: any, i: number) => (
                <div key={`sell-${i}`} className="flex justify-between text-xs py-1 px-2 bg-red-500/10 rounded">
                  <span className="text-red-400">{order.price.toFixed(0)}</span>
                  <span className="text-white/60">{order.qty}</span>
                </div>
              ))}
              <div className="flex justify-center py-2">
                <div className="text-[#c6a86b] font-bold text-lg">{currentPrice.toFixed(0)}</div>
              </div>
              {orderBook.buy.map((order: any, i: number) => (
                <div key={`buy-${i}`} className="flex justify-between text-xs py-1 px-2 bg-emerald-500/10 rounded">
                  <span className="text-emerald-400">{order.price.toFixed(0)}</span>
                  <span className="text-white/60">{order.qty}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Boleta Rápida" subtitle={position ? "posição aberta" : "mercado"}>
            <div className="space-y-3">
              <Row label="Tipo de Ordem">
                <Select 
                  value={boleta.orderType}
                  onChange={(e: any) => setBoleta({...boleta, orderType: e.target.value})}
                  options={["Mercado", "Limitada", "Stop"]}
                  disabled={!!position}
                />
              </Row>
              <Row label="Quantidade (contratos)">
                <Input 
                  type="number" 
                  value={boleta.qty} 
                  onChange={(e: any) => setBoleta({...boleta, qty: parseInt(e.target.value) || 1})}
                  disabled={!!position}
                  placeholder="1"
                />
              </Row>
              <Row label="Stop Loss (pts)">
                <Input 
                  type="text" 
                  value={boleta.stop} 
                  onChange={(e: any) => setBoleta({...boleta, stop: e.target.value})}
                  placeholder="Ex: 127300"
                  disabled={!!position}
                />
              </Row>
              <Row label="Take Profit (pts)">
                <Input 
                  type="text" 
                  value={boleta.gain} 
                  onChange={(e: any) => setBoleta({...boleta, gain: e.target.value})}
                  placeholder="Ex: 127800"
                  disabled={!!position}
                />
              </Row>
              {!position ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => executeTrade('buy')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    COMPRAR
                  </Button>
                  <Button onClick={() => executeTrade('sell')} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                    VENDER
                  </Button>
                </div>
              ) : (
                <Button onClick={closePosition} className="w-full bg-[#c6a86b] hover:bg-[#d4b876] text-[#0b1220] font-bold">
                  ZERAR POSIÇÃO
                </Button>
              )}
              <div className="text-white/40 text-xs text-center">
                Risco: {(boleta.qty * 5).toFixed(0)} BRL por contrato
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card title="Histórico da Sessão" subtitle={`${trades.length} trades executados`} className="md:col-span-2">
          {trades.length === 0 ? (
            <div className="text-center text-white/40 py-8 text-sm">Nenhum trade executado ainda. Comece a operar!</div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {trades.map((trade: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={trade.side === 'buy' ? 'text-emerald-400' : 'text-red-400'}>
                      {trade.side === 'buy' ? '↑' : '↓'}
                    </span>
                    <span className="text-white/80">{trade.qty}x WINM25</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">{trade.entryPrice.toFixed(0)} → {trade.exitPrice.toFixed(0)}</span>
                    <span className={`font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                    </span>
                    <span className="text-white/40">{trade.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <Card title="Regras" subtitle="para convite automático">
          <ul className="text-white/80 text-xs space-y-2">
            <li>✔ Respeite stop loss</li>
            <li>✔ Máx. 2% risco por trade</li>
            <li>✔ 20 sessões consistentes</li>
            <li>✔ Preencha diário 90%</li>
          </ul>
          <div className="mt-3"><Button size="sm" onClick={() => onNavigate("pipeline")}>Ver pipeline</Button></div>
        </Card>
      </div>
    </div>
  );
};

const ScreenReports = () => {
  const consistencyData = useMemo(() => generatePriceData(20, 60, 8), []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">Relatórios & Insights</h2>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Consistência" subtitle="média móvel 20 sessões">
          <div className="rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 p-3">
            <LineChart data={consistencyData} height={150} />
          </div>
          <p className="text-white/70 text-sm mt-3">Você está acima da linha de consistência em 13/20 sessões. Bom trabalho.</p>
        </Card>
        <Card title="Acerto por Horário" subtitle="últimos 30 dias">
          <HeatmapMock />
          <p className="text-white/60 text-sm mt-3">Melhor janela: 10h–12h. Evite operar depois de 15h.</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card title="Por Setup"><BarList items={[
          { label: "Quebra de canal", value: 68 },
          { label: "Pullback", value: 52 },
          { label: "Range", value: 37 },
        ]} /></Card>
        <Card title="Por Emoção"><BarList items={[
          { label: "Confiante", value: 61 },
          { label: "Calmo", value: 55 },
          { label: "Eufórico", value: 29 },
        ]} /></Card>
        <Card title="Por Ativo"><BarList items={[
          { label: "WIN", value: 64 },
          { label: "WDO", value: 41 },
          { label: "Ações", value: 23 },
        ]} /></Card>
      </div>

      <div className="mt-4">
        <Card title="Exportar para Avaliação da Mesa" subtitle="relatório PDF pronto para revisão">
          <div className="flex flex-wrap gap-2">
            <Chip>Consistência ≥ 20 sessões</Chip>
            <Chip>Risco controlado</Chip>
            <Chip>Diário 90% completo</Chip>
          </div>
          <div className="mt-3 flex flex-col md:flex-row gap-2">
            <Button className="flex-1">Gerar PDF</Button>
            <Button className="flex-1" variant="ghost">Enviar à Thera Funding</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ScreenCommunity = () => (
  <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
    <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">Comunidade</h2>
    <div className="grid gap-4">
      <Post user="@Gaia" text="Três parciais e stop no ponto de entrada. Disciplina > ego." />
      <Post user="@Orion" text="Comecei a registrar emoções no diário. Menos euforia, mais consistência." />
      <Post user="@Lince" text="Missão concluída: 5 sessões respeitando DD. Bora ranking!" />
    </div>
  </div>
);

const Post = ({ user, text }: any) => (
  <div className="rounded-2xl bg-[#0f1725] border border-white/10 p-4 md:p-5">
    <div className="text-white/80 text-sm"><b>{user}</b> · agora</div>
    <div className="text-white mt-1">{text}</div>
    <div className="mt-3 flex gap-2">
      <Button variant="ghost" size="sm">Curtir</Button>
      <Button variant="ghost" size="sm">Comentar</Button>
    </div>
  </div>
);

const ScreenPipeline = () => (
  <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
    <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">Pipeline Game → Real</h2>
    <p className="text-white/70">Trilha objetiva para operar capital da mesa sem burocracia.</p>

    <div className="mt-6 grid gap-3">
      <Stage n={1} title="Entrar no Game Mode" desc="Simule com delay de 15s, sem risco real." chips={["Conta Demo", "Ranking semanal"]} />
      <Stage n={2} title="Consistência" desc="20 sessões com risco controlado e diário preenchido." chips={["Risk guard", "Janelas ideais"]} />
      <Stage n={3} title="Relatório Automático" desc="Gere o PDF e envie para avaliação em 1 clique." chips={["Sem planilha", "Sem e-mail"]} />
      <Stage n={4} title="Convite & Alocação" desc="Receba convite para operar capital da Thera Funding." chips={["Monitoramento contínuo", "Mentoria opcional"]} />
    </div>
  </div>
);

const Stage = ({ n, title, desc, chips = [] }: any) => (
  <div className="rounded-2xl bg-[#0f1725] border border-white/10 p-4 md:p-5">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl grid place-items-center text-[#0b1220] font-bold text-lg md:text-xl flex-shrink-0" style={{ background: BRAND.gold }}>{n}</div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-sm md:text-base">{title}</div>
        <div className="text-white/70 text-xs md:text-sm mt-1">{desc}</div>
        <div className="mt-2 flex flex-wrap gap-2">{chips.map((c: string, i: number) => <Chip key={i}>{c}</Chip>)}</div>
      </div>
    </div>
  </div>
);

// ---- UI helpers ----

const Row = ({ label, children }: any) => (
  <label className="grid gap-1">
    <span className="text-white/60 text-xs">{label}</span>
    {children}
  </label>
);

const Input = (props: any) => (
  <input
    {...props}
    className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-[rgba(198,168,107,0.35)] text-base touch-manipulation"
  />
);

const Textarea = (props: any) => (
  <textarea
    {...props}
    rows={3}
    className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-[rgba(198,168,107,0.35)] text-base touch-manipulation"
  />
);

const Select = ({ options = [], ...rest }: any) => (
  <select
    {...rest}
    className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-[rgba(198,168,107,0.35)] text-base touch-manipulation"
  >
    {options.map((op: string) => (
      <option key={op} value={op} className="bg-[#0f1725]">{op}</option>
    ))}
  </select>
);

const MiniBar = ({ label, value }: any) => (
  <div>
    <div className="flex items-center justify-between text-white/70 text-xs">
      <span>{label}</span><span>{value}%</span>
    </div>
    <div className="h-2 mt-1 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full transition-all duration-300" style={{ width: `${value}%`, background: BRAND.gold }} />
    </div>
  </div>
);

const BarList = ({ items }: any) => (
  <div className="space-y-3">
    {items.map((it: any) => (
      <MiniBar key={it.label} label={it.label} value={it.value} />
    ))}
  </div>
);

const HeatmapMock = () => (
  <div className="grid grid-cols-6 gap-1">
    {Array.from({ length: 24 }).map((_, i) => (
      <div key={i} className="h-8 rounded" style={{ background: `rgba(198,168,107, ${0.15 + (i % 6) * 0.12})` }} />
    ))}
  </div>
);

// Visual Chart Components
const LineChart = ({ data, height = 160 }: any) => {
  const padding = 20;
  const width = 100;
  
  const maxPrice = Math.max(...data.map((d: any) => d.price));
  const minPrice = Math.min(...data.map((d: any) => d.price));
  const priceRange = maxPrice - minPrice;
  
  const points = data.map((d: any, i: number) => {
    const x = (i / (data.length - 1)) * (100 - padding * 2) + padding;
    const y = height - ((d.price - minPrice) / priceRange) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');
  
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND.gold} stopOpacity="0.3" />
          <stop offset="100%" stopColor={BRAND.gold} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={BRAND.gold}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`${padding},${height} ${points} ${100 - padding},${height}`}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

const CandlestickChart = ({ data, height = 200 }: any) => {
  const padding = 10;
  const width = 100;
  const candleWidth = (width - padding * 2) / data.length * 0.6;
  
  const maxPrice = Math.max(...data.map((d: any) => d.high));
  const minPrice = Math.min(...data.map((d: any) => d.low));
  const priceRange = maxPrice - minPrice;
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      {data.map((d: any, i: number) => {
        const x = (i / data.length) * (width - padding * 2) + padding + candleWidth / 2;
        const isGreen = d.close > d.open;
        const color = isGreen ? "#10b981" : "#ef4444";
        
        const openY = height - ((d.open - minPrice) / priceRange) * (height - padding * 2) - padding;
        const closeY = height - ((d.close - minPrice) / priceRange) * (height - padding * 2) - padding;
        const highY = height - ((d.high - minPrice) / priceRange) * (height - padding * 2) - padding;
        const lowY = height - ((d.low - minPrice) / priceRange) * (height - padding * 2) - padding;
        
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY) || 1;
        
        return (
          <g key={i}>
            <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1" opacity="0.8" />
            <rect
              x={x - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
              opacity="0.9"
            />
          </g>
        );
      })}
    </svg>
  );
};
