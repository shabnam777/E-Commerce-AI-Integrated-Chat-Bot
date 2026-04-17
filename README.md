# 🛍️ ShopBot AI — Project 1

> React 18 + TypeScript + Groq AI | Bilingual E-Commerce Chatbot

---

## Features
- 🤖 AI chat powered by Groq (llama-3.3-70b)
- 🌐 Bilingual — English & Hindi toggle
- 🛒 Product cards with carousel + drag scroll
- 📦 Order flow — Summary → Confirm → Placed
- 🔥 Deals banner with countdown timer
- ⚡ Quick action buttons (local, no API cost)
- 16 products across 4 categories

## Setup

```bash
# 1. Get free Groq API key from https://console.groq.com
# 2. Create .env file
echo "REACT_APP_GROQ_API_KEY=your_key_here" > .env

# 3. Install and run
npm install
npm start
```

## Project Structure (MVC)
```
src/
├── types/index.ts              ← All TypeScript interfaces
├── constants/
│   ├── products.ts             ← 16 products data
│   └── i18n.ts                 ← EN/HI translations + system prompt
├── services/
│   ├── groqService.ts          ← Groq API calls (MODEL)
│   └── messageParser.ts        ← Parse [PRODUCTS:], [CONFIRM_ORDER|] tags
├── hooks/
│   ├── useChat.ts              ← All chat state + logic (CONTROLLER)
│   └── useDragScroll.ts        ← Mouse drag for carousel
├── components/
│   ├── Header/                 ← Logo + language toggle
│   ├── DealsBanner/            ← Countdown timer banner
│   ├── Chat/ChatWindow.tsx     ← Message list renderer
│   ├── ProductCard/            ← Card + Modal
│   ├── OrderSummary/           ← Confirm + Placed cards
│   └── QuestionCard/           ← Quick buttons + Input bar
├── styles/
│   ├── global.css              ← CSS variables + animations
│   └── components.css          ← All component styles
├── App.tsx                     ← Root — wires everything
└── index.tsx                   ← React entry point
```

## AI Tag System
- `[PRODUCTS: p1, p2, p3]` → Renders product carousel
- `[CONFIRM_ORDER|product=X|price=Y|delivery=Z|savings=W]` → Order summary card
- `[ORDER_PLACED|product=X|price=Y|orderId=MB123|delivery=Z]` → Success card
