export function BuildId() {
  const buildId = (window as any).__BUILD_ID__ || 'dev';
  
  return (
    <div style={{ fontSize: 10, opacity: 0.6, textAlign: 'center', padding: 8 }}>
      build: {String(buildId)}
    </div>
  );
}
