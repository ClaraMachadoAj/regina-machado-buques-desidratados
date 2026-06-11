# Regina Machado Buques Desidratados

Aplicacao institucional e comercial criada em React, TypeScript e Vite para apresentar o trabalho artesanal de preservacao de buques de casamento.

Nome recomendado para o repositorio: `regina-machado-buques-desidratados`.

## Stack

- React + TypeScript + Vite no frontend
- Express no backend para endpoints de conteudo e contato
- Vitest + Testing Library + Supertest para testes unitarios e integracao
- Playwright para testes end-to-end responsivos
- ESLint + Prettier para qualidade de codigo

## Como rodar

```bash
npm install
npm run dev:full
```

Frontend: http://127.0.0.1:5173  
API: http://127.0.0.1:4174/api/site

## Testes

```bash
npm test
npm run test:e2e
```

## Configuracao do WhatsApp

Edite `src/config/contact.ts` e substitua `55NUMERODOTELEFONE` pelo numero real com DDI e DDD, apenas digitos.
