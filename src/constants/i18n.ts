// src/constants/i18n.ts
// English and Hindi translations

export const TRANSLATIONS = {
  en: {
    greeting: "Hi! I'm ShopBot AI 🛍️ How can I help you today?",
    inputPlaceholder: "Ask me anything...",
    quickButtons: {
      recommendations: "🎯 Recommendations",
      trackOrder: "📦 Track Order",
      returnPolicy: "↩️ Return Policy",
      bestDeals: "🔥 Best Deals",
    },
    orderConfirm: "Confirm Order",
    orderCancel: "Cancel",
    orderPlaced: "Order Placed! 🎉",
    categories: {
      Electronics: "Electronics",
      Sports: "Sports",
      Beauty: "Beauty",
      Bags: "Bags",
    },
    budget: {
      question: "What's your budget?",
      options: ["Under ₹500", "₹500 - ₹2000", "₹2000 - ₹10000", "Above ₹10000"],
    },
    trackOrderMsg:
      "Your order #MB293847 is out for delivery! 🚚\n\nEstimated delivery: Today by 6 PM\nTracking: IN293847MB",
    returnPolicyMsg:
      "📋 Our Return Policy:\n\n✅ 10-day easy returns\n✅ Free pickup from your door\n✅ Instant refund to original payment method\n✅ No questions asked for damaged items",
  },
  hi: {
    greeting: "नमस्ते! मैं ShopBot AI हूँ 🛍️ आज मैं आपकी कैसे मदद कर सकता हूँ?",
    inputPlaceholder: "कुछ भी पूछें...",
    quickButtons: {
      recommendations: "🎯 सुझाव",
      trackOrder: "📦 ऑर्डर ट्रैक",
      returnPolicy: "↩️ वापसी नीति",
      bestDeals: "🔥 बेस्ट डील्स",
    },
    orderConfirm: "ऑर्डर कन्फर्म करें",
    orderCancel: "रद्द करें",
    orderPlaced: "ऑर्डर हो गया! 🎉",
    categories: {
      Electronics: "इलेक्ट्रॉनिक्स",
      Sports: "स्पोर्ट्स",
      Beauty: "ब्यूटी",
      Bags: "बैग्स",
    },
    budget: {
      question: "आपका बजट क्या है?",
      options: ["₹500 से कम", "₹500 - ₹2000", "₹2000 - ₹10000", "₹10000 से ऊपर"],
    },
    trackOrderMsg:
      "आपका ऑर्डर #MB293847 डिलीवरी के लिए निकल चुका है! 🚚\n\nअनुमानित डिलीवरी: आज शाम 6 बजे\nट्रैकिंग: IN293847MB",
    returnPolicyMsg:
      "📋 हमारी वापसी नीति:\n\n✅ 10-दिन की आसान वापसी\n✅ आपके दरवाजे से मुफ्त पिकअप\n✅ मूल भुगतान विधि पर तत्काल रिफंड\n✅ क्षतिग्रस्त वस्तुओं के लिए कोई सवाल नहीं",
  },
};

export const GROQ_SYSTEM_PROMPT = `You are ShopBot AI, a friendly and helpful e-commerce shopping assistant.

You help users find products, give recommendations, and handle orders.

AVAILABLE PRODUCTS (use these IDs only):
- Electronics: p1 (Sony Headphones ₹24999), p2 (AirPods Pro ₹19999), p3 (Samsung TV ₹54999), p9 (Fossil Smartwatch ₹14999), p13 (boAt Headphones ₹1299)
- Sports: p4 (Nike Air Max ₹7495), p5 (Adidas Ultraboost ₹8999), p10 (Yoga Mat ₹999), p15 (Puma Bottle ₹499)
- Beauty: p6 (Lakme Foundation ₹449), p7 (Maybelline Concealer ₹299), p11 (L'Oreal Serum ₹799), p16 (Nykaa Lipstick ₹349)
- Bags: p8 (Wildcraft Backpack ₹1799), p12 (Herschel Backpack ₹5499), p14 (Fastrack Handbag ₹2299)

RULES:
1. When showing products, ALWAYS use this exact tag: [PRODUCTS: id1, id2, id3]
2. When user wants to order, use: [CONFIRM_ORDER|product=Product Name|price=₹XXXX|delivery=3-5 days|savings=₹XXX]
3. When order is confirmed, use: [ORDER_PLACED|product=Product Name|price=₹XXXX|orderId=MBXXXXXX|delivery=3-5 days]
4. NEVER show product details in plain text when you can show them as cards
5. Be conversational and friendly
6. For budget recommendations, suggest 2-3 relevant products`;

export type TranslationKey = keyof typeof TRANSLATIONS.en;
