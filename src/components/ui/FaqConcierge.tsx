"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Loader2 } from "lucide-react";
import { CAFE_KNOWLEDGE_BASE } from "@/data/faq-knowledge";

interface ChatMessage {
  id: string;
  sender: "user" | "concierge";
  text: string;
}

const QUICK_QUESTIONS = [
  "What is oak maturation?",
  "Where are your beans sourced?",
  "What are your opening hours?",
  "Do I need a reservation?",
  "Do you host private events?",
];

export default function FaqConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "concierge",
      text: "Greetings. I am the Ember & Oak Concierge. Inquire with me regarding our micro-batch roast profiles, 72-hour oak maturation, table reservations, or evening listening hours.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const msgIdCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || query.trim();
    if (!textToSend || isLoading) return;

    msgIdCounter.current += 1;
    const userMsg: ChatMessage = {
      id: `user-${msgIdCounter.current}`,
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToSend }),
      });

      const data = await res.json();
      const answer = data.answer || "I apologize, I am unable to access the roastery archives right now. Please inquire directly at hello@emberandoak.com.";

      msgIdCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `concierge-${msgIdCounter.current}`,
          sender: "concierge",
          text: answer,
        },
      ]);
    } catch {
      // Offline fallback: find closest match from local knowledge base
      const matched = CAFE_KNOWLEDGE_BASE.find(
        (k) =>
          textToSend.toLowerCase().includes(k.category) ||
          k.question.toLowerCase().split(" ").some((w) => w.length > 3 && textToSend.toLowerCase().includes(w))
      );

      msgIdCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `concierge-${msgIdCounter.current}`,
          sender: "concierge",
          text: matched
            ? matched.answer
            : "I can only speak to documented Ember & Oak coffee sourcing, roasting, hours, and bookings. Please reach out to our team at hello@emberandoak.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Roastery Concierge AI"
        className={`fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 py-3 bg-[#231C16] border border-[#B97845]/50 text-[#F3EBDD] shadow-2xl hover:border-[#B97845] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97845] ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Sparkles className="w-4 h-4 text-[#B97845] group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium">
          Roastery Concierge
        </span>
      </button>

      {/* Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="w-full sm:max-w-md h-[85vh] sm:h-[620px] bg-[#17120F] border border-[#F3EBDD]/15 flex flex-col shadow-2xl text-[#F3EBDD] animate-in fade-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#F3EBDD]/10 flex items-center justify-between bg-[#0E0B09]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-none border border-[#B97845] flex items-center justify-center bg-[#231C16]">
                  <Sparkles className="w-4 h-4 text-[#B97845]" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-[#F3EBDD]">
                    The Oak Concierge
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B97845]">
                    AI Sommelier & Inquiries
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Concierge"
                className="p-1.5 text-[#F3EBDD]/60 hover:text-[#F3EBDD] transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2.5 ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.sender === "concierge" && (
                    <div className="w-6 h-6 border border-[#B97845]/40 flex items-center justify-center bg-[#231C16] flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-[#B97845]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] text-xs leading-relaxed p-3.5 ${
                      m.sender === "user"
                        ? "bg-[#B97845] text-[#17120F] font-medium"
                        : "bg-[#231C16] border border-[#F3EBDD]/10 text-[#F3EBDD]/90"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === "user" && (
                    <div className="w-6 h-6 border border-[#F3EBDD]/20 flex items-center justify-center bg-[#17120F] flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#F3EBDD]/70" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center space-x-2 text-[#B97845] text-xs py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="tracking-widest uppercase text-[10px]">
                    Consulting roastery records...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Chips */}
            <div className="p-3 border-t border-[#F3EBDD]/10 bg-[#0E0B09]/50 overflow-x-auto flex gap-2 no-scrollbar">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap text-[11px] px-2.5 py-1 bg-[#231C16] hover:bg-[#3B3A2D] text-[#F3EBDD]/80 border border-[#F3EBDD]/10 hover:border-[#B97845]/50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#0E0B09] border-t border-[#F3EBDD]/10 flex items-center space-x-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about coffee, roast profiles, or tables..."
                className="flex-1 bg-[#17120F] border border-[#F3EBDD]/15 px-3 py-2 text-xs text-[#F3EBDD] placeholder:text-[#F3EBDD]/40 focus:outline-none focus:border-[#B97845]"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                aria-label="Send message"
                className="px-3.5 py-2 bg-[#B97845] text-[#17120F] disabled:opacity-40 hover:bg-[#d48b52] transition-colors focus:outline-none"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
