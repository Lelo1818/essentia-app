import { useState } from 'react';

export default function EssentiaDemoAvancado() {
  const [telaAtual, setTelaAtual] = useState('inicio');
  const [resposta, setResposta] = useState('');

  const mostrar = (id: string) => {
    setTelaAtual(id);
  };

  const respostaIA = () => {
    setResposta("Sofia diz: 'Entendo o que você sente. Vamos clarear isso juntos.'");
  };

  const estilos = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      margin: 0,
      padding: 0,
      color: '#333',
      minHeight: '100vh'
    },
    h1h2: { 
      fontWeight: 600, 
      textAlign: 'center' as const 
    },
    container: { 
      padding: '20px', 
      textAlign: 'center' as const 
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      margin: '15px auto',
      maxWidth: '500px'
    },
    button: {
      backgroundColor: '#5cdb95',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '15px'
    },
    textarea: {
      width: '90%',
      height: '90px',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc'
    },
    ul: { 
      textAlign: 'left' as const, 
      maxWidth: '500px', 
      margin: 'auto', 
      lineHeight: 1.8 
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
      {/* Tela Início */}
      {telaAtual === 'inicio' && (
        <div style={estilos.container}>
          <h1 style={estilos.h1h2}>Essentia</h1>
          <p>A bússola para despertar seu propósito interior e reencontrar equilíbrio. Mais que um aplicativo, uma jornada de transformação pessoal.</p>
          <button 
            style={estilos.button}
            onClick={() => mostrar('onboarding')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Começar minha jornada
          </button>
        </div>
      )}

      {/* Onboarding */}
      {telaAtual === 'onboarding' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>Seu Ponto de Partida</h2>
          <p>Como você se sente hoje?</p>
          <select style={estilos.select}>
            <option>Calmo</option>
            <option>Cansado</option>
            <option>Ansioso</option>
            <option>Motivado</option>
            <option>Triste</option>
          </select>
          <br /><br />
          
          <p>O que mais busca agora?</p>
          <select style={estilos.select}>
            <option>Clareza</option>
            <option>Equilíbrio</option>
            <option>Energia</option>
            <option>Propósito</option>
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

      {/* Dashboard */}
      {telaAtual === 'dashboard' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>Sua Tríade Essentia</h2>
          
          <div style={{...estilos.card, borderLeft: '8px solid #4da6ff'}}>
            <h3>🧭 Consciência</h3>
            <p>410 – Clareza em expansão.<br />Você está vendo sua vida com mais nitidez.</p>
          </div>
          
          <div style={{...estilos.card, borderLeft: '8px solid #ffd633'}}>
            <h3>🔋 Energia</h3>
            <p>320 – Oscilando, mas presente.<br />Seu corpo pede pausas conscientes.</p>
          </div>
          
          <div style={{...estilos.card, borderLeft: '8px solid #33cc66'}}>
            <h3>🔮 Coerência</h3>
            <p>68% – Emoção e intenção ainda precisam se alinhar.</p>
          </div>
          
          <button 
            style={estilos.button}
            onClick={() => mostrar('portais')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Explorar Portais
          </button>
        </div>
      )}

      {/* Portais */}
      {telaAtual === 'portais' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>Portais da Jornada</h2>
          <p>Estes são alguns dos portais disponíveis (total de 46):</p>
          <ul style={estilos.ul}>
            <li>Portal da Clareza</li>
            <li>Portal da Presença</li>
            <li>Portal da Escuta</li>
            <li>Portal do Perdão</li>
            <li>Portal da Resiliência</li>
            <li>Portal da Intuição</li>
            <li>Portal do Legado</li>
            <li>... (e muitos outros até 46)</li>
          </ul>
          <button 
            style={estilos.button}
            onClick={() => mostrar('portalClareza')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Portal da Clareza
          </button>
        </div>
      )}

      {/* Portal da Clareza */}
      {telaAtual === 'portalClareza' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>Portal da Clareza</h2>
          <p>
            Propósito: Dissipar a confusão mental e restaurar o foco.<br /><br />
            Prática: Inspire profundamente. Ao expirar, imagine uma névoa se dissipando e uma luz clara surgindo.
          </p>
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

      {/* Diário */}
      {telaAtual === 'diario' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>Diário Pessoal</h2>
          <textarea 
            style={estilos.textarea}
            placeholder="Escreva aqui seu pensamento..."
          />
          <br /><br />
          <button 
            style={estilos.button}
            onClick={respostaIA}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Enviar
          </button>
          {resposta && (
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
              {resposta}
            </p>
          )}
          <button 
            style={estilos.button}
            onClick={() => mostrar('dashboard')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Voltar ao Dashboard
          </button>
        </div>
      )}

      {/* SOS */}
      {telaAtual === 'sos' && (
        <div style={estilos.container}>
          <h2 style={estilos.h1h2}>SOS Essentia</h2>
          <p>Respire. Você está seguro. Vamos juntos encontrar calma.</p>
          <button 
            style={estilos.button}
            onClick={() => mostrar('portalClareza')}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Portal da Calma
          </button>
        </div>
      )}

      {/* Botão SOS fixo */}
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