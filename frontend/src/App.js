import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <PipelineToolbar />
      <PipelineUI />
      <div style={{
        borderTop: '1px solid #cbd5e1',
        backgroundColor: 'white',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'Center'
      }}>
      <SubmitButton />
      </div>
      
    </div>
  );
}

export default App;
