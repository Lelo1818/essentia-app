export default function DashboardWorking() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>
          Ecossistema Digital
        </h1>
        <h2 style={{ fontSize: '24px', color: '#666', marginBottom: '40px' }}>
          Lelão - Dashboard Principal
        </h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '3px solid #10b981'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>💰</div>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Flow</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            Gestão Financeira Completa
          </p>
          <button 
            onClick={() => window.location.href = '/flow'}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Acessar Flow
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '3px solid #3b82f6'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>📚</div>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>EduVibe</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            Plataforma Educacional com IA
          </p>
          <button 
            onClick={() => window.location.href = '/eduvibe'}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Acessar EduVibe
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '3px solid #8b5cf6'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>💜</div>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Essentia</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            Desenvolvimento Pessoal
          </p>
          <button 
            onClick={() => window.location.href = '/purpose'}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Acessar Essentia
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '3px solid #ec4899'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>👨‍👩‍👧‍👦</div>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Flow Kids</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
            Educação Financeira Infantil
          </p>
          <button 
            onClick={() => window.location.href = '/kids-standalone'}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#ec4899',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Acessar Flow Kids
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '50px', 
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        padding: '30px',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>
          Status do Sistema
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', color: '#10b981', fontWeight: 'bold' }}>100%</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Operacional</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', color: '#3b82f6', fontWeight: 'bold' }}>4</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Apps Ativos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', color: '#8b5cf6', fontWeight: 'bold' }}>24/7</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Disponível</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', color: '#ec4899', fontWeight: 'bold' }}>✓</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Pronto</div>
          </div>
        </div>
      </div>
    </div>
  );
}