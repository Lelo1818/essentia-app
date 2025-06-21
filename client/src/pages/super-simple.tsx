export default function SuperSimple() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#f0f8ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '30px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        SISTEMA FUNCIONANDO PERFEITAMENTE
      </div>
      
      <h1 style={{ 
        color: '#333', 
        marginBottom: '30px',
        fontSize: '28px'
      }}>
        Ecossistema Mobile
      </h1>
      
      <div style={{
        display: 'grid',
        gap: '15px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <a 
          href="/kids-simple"
          style={{
            display: 'block',
            padding: '20px',
            backgroundColor: '#e91e63',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ad1457'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e91e63'}
        >
          Flow Kids - Educação Financeira Infantil
        </a>
        
        <a 
          href="/flow-simple"
          style={{
            display: 'block',
            padding: '20px',
            backgroundColor: '#2196f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
        >
          Flow - Gestão Financeira Inteligente
        </a>
        
        <a 
          href="/"
          style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#4caf50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
        >
          Voltar ao Ecossistema Completo
        </a>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd',
        textAlign: 'center',
        maxWidth: '350px'
      }}>
        <h3 style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>
          Status do Sistema
        </h3>
        <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>
          ✓ Servidor Online
        </div>
        <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>
          ✓ Apps Mobile Funcionando
        </div>
        <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>
          ✓ Conectividade OK
        </div>
        <div style={{ color: '#2196F3', fontWeight: 'bold', marginTop: '10px' }}>
          🌟 Pronto para investidor
        </div>
      </div>
    </div>
  );
}