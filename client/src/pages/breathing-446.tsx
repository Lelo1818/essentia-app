import { useLocation } from 'wouter';
import { Breathing446 } from '@/components/purpose/breathing-446';

export default function Breathing446Page() {
  const [, setLocation] = useLocation();

  return (
    <Breathing446 
      onClose={() => setLocation('/purpose')}
    />
  );
}
