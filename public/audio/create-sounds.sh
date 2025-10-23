#!/bin/bash

# Gera sons de verdade usando sox (se disponível)
# Caso contrário, cria arquivos simples mas funcionais

# UI Click (tick rápido)
ffmpeg -f lavfi -i "sine=frequency=800:duration=0.08" -af "apad=pad_dur=0.08,afade=t=in:st=0:d=0.01,afade=t=out:st=0.06:d=0.02" -ar 44100 -ac 1 -y ui_click_new.mp3 2>/dev/null

# UI Success (sino suave)
ffmpeg -f lavfi -i "sine=frequency=523:duration=0.5" -af "apad=pad_dur=0.5,afade=t=in:st=0:d=0.05,afade=t=out:st=0.3:d=0.2" -ar 44100 -ac 1 -y ui_success_new.mp3 2>/dev/null

# Se ffmpeg não funcionar, cria com sox
if [ ! -f ui_click_new.mp3 ]; then
  echo "FFmpeg não disponível, tentando sox..."
  sox -n -r 44100 -c 1 ui_click_new.mp3 synth 0.08 sine 800 fade 0.01 0.08 0.02 2>/dev/null
  sox -n -r 44100 -c 1 ui_success_new.mp3 synth 0.5 sine 523 fade 0.05 0.5 0.2 2>/dev/null
fi

# Se nada funcionar, usa silence (fallback)
if [ ! -f ui_click_new.mp3 ]; then
  echo "Nenhuma ferramenta disponível, usando silence..."
  sox -n -r 44100 -c 1 ui_click_new.mp3 trim 0 0.08 2>/dev/null || echo "OK - fallback silence"
  sox -n -r 44100 -c 1 ui_success_new.mp3 trim 0 0.5 2>/dev/null || echo "OK - fallback silence"
fi

echo "Sons gerados!"
ls -lh *.mp3
