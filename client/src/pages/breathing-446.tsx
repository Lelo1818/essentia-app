import { useLocation } from 'wouter';
import { Breathing446 } from '@/components/purpose/breathing-446';

export default function Breathing446Page() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Respiração 4-4-6</h1>
        <p className="text-sm text-gray-600 mt-1">
          Inspire 4s • Segure 4s • Expire 6s — 6 ciclos. Fones recomendados 🎧
        </p>
      </div>
      <Breathing446 
        onClose={() => setLocation('/purpose')}
      />
    </div>
  );
}
