import React from "react";
export function PortalUau({ videoSrc, question="Qual é a pergunta que move seu dia?", answer="Respire. Nomeie o próximo passo. E dê um passo pequeno agora.", cta="Começar ritual", onDone }:{ videoSrc?:string; question?:string; answer?:string; cta?:string; onDone?:()=>void; }){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1220]">
      <div className="relative grid lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[420px]">
          {videoSrc ? (videoSrc.endsWith(".mp4") ? <video src={videoSrc} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" /> : <iframe src={videoSrc} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden>
                <defs><radialGradient id="g" cx="50%" cy="50%"><stop offset="0%" stopColor="#8AA8FF"/><stop offset="100%" stopColor="#6FD6C3"/></radialGradient></defs>
                <circle cx="110" cy="110" r="96" fill="none" stroke="url(#g)" strokeOpacity=".25" strokeWidth="10"/>
                <circle cx="110" cy="110" r="96" fill="none" stroke="url(#g)" strokeWidth="10">
                  <animate attributeName="r" values="96;80;96" dur="14s" keyTimes="0;0.57;1" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.85;1" dur="14s" keyTimes="0;0.57;1" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/30" />
        </div>
        <div className="p-6 lg:p-8 flex flex-col justify-center gap-4">
          <h3 className="text-2xl lg:text-3xl font-semibold">Portal Imersivo</h3>
          <p className="text-base lg:text-lg text-white/80">{question}</p>
          <p className="text-sm lg:text-base text-white/70">{answer}</p>
          <button onClick={onDone} className="px-5 py-3 rounded-xl font-bold bg-[#6FD6C3] text-[#071613] border border-emerald-200/30 shadow">{cta}</button>
        </div>
      </div>
      <div className="absolute right-2 bottom-2 text-[10px] opacity-40 select-none">CONFIDENCIAL — Essentia — Marcelo Rymer — rymerlelo@gmail.com</div>
    </div>
  );
}