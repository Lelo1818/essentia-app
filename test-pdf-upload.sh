#!/bin/bash

# Teste para upload de PDF usando curl

echo "Criando arquivo PDF de teste..."

# Cria um arquivo PDF simples usando echo (simulação)
echo "Criando um arquivo de teste simples"
echo "%PDF-1.4" > test.pdf
echo "1 0 obj" >> test.pdf
echo "<<" >> test.pdf
echo "/Type /Catalog" >> test.pdf
echo "/Pages 2 0 R" >> test.pdf
echo ">>" >> test.pdf
echo "endobj" >> test.pdf
echo "2 0 obj" >> test.pdf
echo "<<" >> test.pdf
echo "/Type /Pages" >> test.pdf
echo "/Kids [3 0 R]" >> test.pdf
echo "/Count 1" >> test.pdf
echo ">>" >> test.pdf
echo "endobj" >> test.pdf
echo "3 0 obj" >> test.pdf
echo "<<" >> test.pdf
echo "/Type /Page" >> test.pdf
echo "/Parent 2 0 R" >> test.pdf
echo ">>" >> test.pdf
echo "endobj" >> test.pdf
echo "xref" >> test.pdf
echo "0 4" >> test.pdf
echo "0000000000 65535 f" >> test.pdf
echo "0000000010 00000 n" >> test.pdf
echo "0000000079 00000 n" >> test.pdf
echo "0000000173 00000 n" >> test.pdf
echo "trailer" >> test.pdf
echo "<<" >> test.pdf
echo "/Size 4" >> test.pdf
echo "/Root 1 0 R" >> test.pdf
echo ">>" >> test.pdf
echo "startxref" >> test.pdf
echo "253" >> test.pdf
echo "%%EOF" >> test.pdf

echo "Arquivo PDF criado: test.pdf"
echo "Testando upload..."

# Testa o upload do PDF
curl -X POST \
  -F "pdf=@test.pdf" \
  "http://localhost:5000/api/ai/analyze-pdf"

echo ""
echo "Teste concluído!"