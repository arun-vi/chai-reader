export default function Loading() {
  // Return basic inline skeleton instead of loader component
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      opacity: 0.5
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #f3f3f3',
        borderTopColor: '#007bff',
        borderRadius: '50%'
      }} />
    </div>
  );
}