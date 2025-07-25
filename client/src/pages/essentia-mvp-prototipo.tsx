import { useState } from 'react';

export default function EssentiaMVPPrototipo() {
  const [telaAtual, setTelaAtual] = useState('tela1');
  const [emocao, setEmocao] = useState('Calmo');
  const [intencao, setIntencao] = useState('Foco');
  const [frase, setFrase] = useState('Quero viver com leveza');
  const [respostaIA, setRespostaIA] = useState('');

  const mostrar = (id: string) => {
    setTelaAtual(id);
  };

  const feedbackIA = () => {
    setRespostaIA("Sofia diz: 'Entendo o que você sente. Vamos clarear isso juntos.'");
  };

  const estilos = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f6f6f6',
      margin: 0,
      padding: 0,
      textAlign: 'center' as const,
      color: '#333',
      minHeight: '100vh'
    },
    container: { 
      padding: '20px' 
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      margin: '15px auto',
      maxWidth: '400px'
    },
    button: {
      backgroundColor: '#5cdb95',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      margin: '5px'
    },
    textarea: { 
      width: '90%', 
      height: '80px', 
      padding: '10px', 
      borderRadius: '8px', 
      border: '1px solid #ccc',
      fontSize: '14px'
    },
    select: {
      padding: '8px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '14px',
      margin: '5px'
    }
  };

  return (
    <div style={estilos.body}>
      {/* Tela 1 - Boas-vindas */}
      {telaAtual === 'tela1' && (
        <div style={estilos.container}>
          <h1>Bem-vindo(a) ao Essentia</h1>
          <p>Um convite para voltar ao seu centro.</p>
          <button 
            style={estilos.button}
            onClick={() => mostrar('tela2')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Começar minha jornada
          </button>
        </div>
      )}

      {/* Tela 2 - Mini-Onboarding */}
      {telaAtual === 'tela2' && (
        <div style={estilos.container}>
          <h2>Mini-Onboarding</h2>
          <p>Como você se sente hoje?</p>
          <select 
            style={estilos.select}
            value={emocao} 
            onChange={(e) => setEmocao(e.target.value)}
          >
            <option>Calmo</option>
            <option>Cansado</option>
            <option>Ansioso</option>
            <option>Feliz</option>
            <option>Triste</option>
          </select>
          <br /><br />
          
          <p>Qual sua principal intenção agora?</p>
          <select 
            style={estilos.select}
            value={intencao} 
            onChange={(e) => setIntencao(e.target.value)}
          >
            <option>Foco</option>
            <option>Clareza</option>
            <option>Energia</option>
            <option>Calma</option>
            <option>Propósito</option>
          </select>
          <br /><br />
          
          <p>Escolha uma frase:</p>
          <select 
            style={estilos.select}
            value={frase} 
            onChange={(e) => setFrase(e.target.value)}
          >
            <option>Quero viver com leveza</option>
            <option>Preciso organizar minha mente</option>
            <option>Busco energia e clareza</option>
          </select>
          <br /><br />
          
          <button 
            style={estilos.button}
            onClick={() => mostrar('dashboard')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Ver meus Medidores
          </button>
        </div>
      )}

      {/* Dashboard - Medidores */}
      {telaAtual === 'dashboard' && (
        <div style={estilos.container}>
          <h2>Sua Tríade de Medidores</h2>
          
          <div style={{...estilos.card, borderLeft: '8px solid #4da6ff'}}>
            <h3>🧭 Consciência</h3>
            <p>410 – Clareza em expansão</p>
          </div>
          
          <div style={{...estilos.card, borderLeft: '8px solid #ffd633'}}>
            <h3>🔋 Energia</h3>
            <p>320 – Oscilando, mas presente</p>
          </div>
          
          <div style={{...estilos.card, borderLeft: '8px solid #33cc66'}}>
            <h3>🔮 Coerência</h3>
            <p>68% – Emoção ainda não acompanhou a intenção</p>
          </div>
          
          <button 
            style={estilos.button}
            onClick={() => mostrar('portal')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Quero Harmonizar
          </button>
        </div>
      )}

      {/* Portal da Clareza */}
      {telaAtual === 'portal' && (
        <div style={estilos.container}>
          <h2>Portal da Clareza</h2>
          <p>Respire. Inspire a luz, expire a névoa. Visualize a clareza.</p>
          <textarea 
            style={estilos.textarea}
            placeholder="Qual é a única coisa que você precisa clarear agora?"
          />
          <br /><br />
          <button 
            style={estilos.button}
            onClick={() => mostrar('diario')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Salvar Reflexão
          </button>
        </div>
      )}

      {/* Diário Pessoal */}
      {telaAtual === 'diario' && (
        <div style={estilos.container}>
          <h2>Diário Pessoal</h2>
          <textarea 
            style={estilos.textarea}
            placeholder="Escreva aqui seu pensamento..."
          />
          <br /><br />
          <button 
            style={estilos.button}
            onClick={feedbackIA}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Enviar
          </button>
          {respostaIA && (
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
              {respostaIA}
            </p>
          )}
        </div>
      )}

      {/* SOS Simbólico */}
      {telaAtual === 'sos' && (
        <div style={estilos.container}>
          <h2>SOS Simbólico</h2>
          <p>Respire. Você está seguro.</p>
          <button 
            style={estilos.button}
            onClick={() => mostrar('portal')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Ir para Portal da Calma
          </button>
        </div>
      )}

      {/* Botão de navegação adicional para SOS (pode ser adicionado em qualquer tela) */}
      {telaAtual !== 'sos' && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <button 
            style={{...estilos.button, backgroundColor: '#ff6b6b'}}
            onClick={() => mostrar('sos')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            SOS
          </button>
        </div>
      )}
    </div>
  );
}