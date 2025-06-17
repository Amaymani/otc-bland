export interface Exchange {
  id: string;
  name: string;
  apiUrl: string;
}

export interface TradingSymbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: string;
}

export interface OrderDetails {
  exchange: string;
  symbol: string;
  currentPrice: string;
  quantity: string;
  orderPrice: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VoiceState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
}