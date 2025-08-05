# App WhatsApp

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mateus-da-silva-machados-projects/v0-app-whats-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ZKARrA3zgTO)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Configuração

### Variáveis de Ambiente

Para configurar a aplicação, você precisa definir as seguintes variáveis de ambiente:

1. Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

2. Edite o arquivo `.env.local` com suas configurações:

- `NEXT_PUBLIC_API_BASE_URL`: URL base da API Evolution
- `NEXT_PUBLIC_API_KEY`: Chave de API para autenticação

### Exemplo de configuração:
```env
NEXT_PUBLIC_API_BASE_URL=https://sua-api.com
NEXT_PUBLIC_API_KEY=sua-chave-de-api
```

## Deployment

Your project is live at:

**[https://vercel.com/mateus-da-silva-machados-projects/v0-app-whats-app](https://vercel.com/mateus-da-silva-machados-projects/v0-app-whats-app)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/ZKARrA3zgTO](https://v0.dev/chat/projects/ZKARrA3zgTO)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository