export default function MinimalTest() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Sistema Online ✅</h1>
      <div style={{ 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        ✅ SERVIDOR FUNCIONANDO
      </div>
      <div style={{ marginBottom: '15px' }}>
        <a 
          href="/kids-simple" 
          style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#ff6b9d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          ✅ Flow Kids (Versão Mobile)
        </a>
        <a 
          href="/flow-simple" 
          style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#4285f4',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          ✅ Flow Principal (Versão Mobile)
        </a>
        <a 
          href="/" 
          style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#34a853',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          Voltar Ecossistema
        </a>
      </div>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Teste minimalista sem bibliotecas complexas
      </p>
    </div>
  );
}