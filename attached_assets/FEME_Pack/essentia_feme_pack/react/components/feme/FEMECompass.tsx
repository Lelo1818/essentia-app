import React from "react";

export function FEMECompass({
  values = { fisico: 6, energetico: 7, mental: 5, espiritual: 6 },
  coherence = 68,
  onHarmonize
}: {
  values?: { fisico:number; energetico:number; mental:number; espiritual:number };
  coherence?: number;
  onHarmonize?: ()=>void;
}){
  const scale = (n:number)=> Math.max(0, Math.min(1, n/10));
  const s = {
    "--kFisico": String(0.8 + 0.4*scale(values.fisico)),
    "--kEnergetico": String(0.8 + 0.4*scale(values.energetico)),
    "--kMental": String(0.8 + 0.4*scale(values.mental)),
    "--kEspiritual": String(0.8 + 0.4*scale(values.espiritual)),
  } as React.CSSProperties;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1220] p-4">
      <div className="relative grid md:grid-cols-2 gap-0 items-stretch">
        <div className="relative min-h-[320px]">
          <Petals style={s}/>
          <CenterSeal value={coherence} onHarmonize={onHarmonize}/>
          <Labels/>
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-center gap-3 text-white/90">
          <h3 className="text-xl md:text-2xl font-semibold">Minha Bússola Hoje</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Meter label="Físico" value={values.fisico}/>
            <Meter label="Energético" value={values.energetico}/>
            <Meter label="Mental" value={values.mental}/>
            <Meter label="Espiritual" value={values.espiritual}/>
          </div>
          <div className="text-sm text-white/70">
            Selo de Coerência: <b>{coherence}%</b> — <i>emoção ainda não acompanhou a intenção</i>.
          </div>
        </div>
      </div>
    </div>
  );
}

function Meter({label, value}:{label:string; value:number}){
  return (
    <div className="p-2 rounded-lg border border-white/10 bg-white/5">
      <div className="flex justify-between"><span>{label}</span><span className="font-semibold">{value}/10</span></div>
      <div className="h-2 mt-2 bg-white/10 rounded overflow-hidden">
        <div className="h-2 bg-[#8AA8FF]" style={{width: `${Math.max(0, Math.min(10,value))*10}%`}}/>
      </div>
    </div>
  )
}

function Labels(){
  return (
    <div className="absolute inset-0 pointer-events-none select-none text-white/90">
      <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-sm">Físico</div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">Energético</div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-sm">Mental</div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm">Espiritual</div>
    </div>
  )
}

function CenterSeal({value, onHarmonize}:{value:number; onHarmonize?:()=>void}){
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg">
      <div className="text-sm text-white/70">Coerência</div>
      <div className="text-2xl font-bold text-white">{value}%</div>
      <button onClick={onHarmonize} className="mt-2 px-3 py-1.5 text-xs rounded-md bg-[#6FD6C3] text-[#071613] font-semibold">
        Quero harmonizar
      </button>
    </div>
  )
}

function Petals({style}:{style?:React.CSSProperties}){
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" style={style} aria-hidden>
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8AA8FF"/>
          <stop offset="100%" stopColor="#6FD6C3"/>
        </radialGradient>
      </defs>
      <g transform="translate(300,300)">
        <g opacity="0.9">
          <g transform="scale(var(--kFisico,1))">
            <path d="M0,-160 C55,-160 100,-115 100,-62 C100,0 55,34 0,34 C-55,34 -100,0 -100,-62 C-100,-115 -55,-160 0,-160 Z"
                  fill="url(#g1)" fillOpacity="0.23" stroke="#8AA8FF" strokeOpacity="0.35" strokeWidth="1"/>
          </g>
          <g transform="rotate(90) scale(var(--kEnergetico,1))">
            <path d="M160,0 C160,-55 115,-100 62,-100 C0,-100 -34,-55 -34,0 C-34,55 0,100 62,100 C115,100 160,55 160,0 Z"
                  fill="url(#g1)" fillOpacity="0.23" stroke="#6FD6C3" strokeOpacity="0.35" strokeWidth="1"/>
          </g>
          <g transform="rotate(180) scale(var(--kMental,1))">
            <path d="M0,160 C-55,160 -100,115 -100,62 C-100,0 -55,-34 0,-34 C55,-34 100,0 100,62 C100,115 55,160 0,160 Z"
                  fill="url(#g1)" fillOpacity="0.23" stroke="#8AA8FF" strokeOpacity="0.35" strokeWidth="1"/>
          </g>
          <g transform="rotate(270) scale(var(--kEspiritual,1))">
            <path d="M-160,0 C-160,55 -115,100 -62,100 C0,100 34,55 34,0 C34,-55 0,-100 -62,-100 C-115,-100 -160,-55 -160,0 Z"
                  fill="url(#g1)" fillOpacity="0.23" stroke="#6FD6C3" strokeOpacity="0.35" strokeWidth="1"/>
          </g>
        </g>
      </g>
    </svg>
  )
}
