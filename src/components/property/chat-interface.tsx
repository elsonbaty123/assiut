"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { Agent } from "@/types";
import { cn } from "@/lib/utils";

interface Message {
  sender: "user" | "agent";
  text: string;
}

interface ChatInterfaceProps {
  agent: Agent;
}

export function ChatInterface({ agent }: ChatInterfaceProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isSending]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    setTimeout(() => {
      const agentReply: Message = {
        sender: "agent",
        text: t('agentReply'),
      };
      setMessages((prev) => [...prev, agentReply]);
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow h-80 p-4 border rounded-t-lg" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              {t('startConversation')}
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn("flex items-end gap-2", 
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.sender === "agent" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn("max-w-[80%] rounded-lg p-3",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isSending && (
             <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t-0 border rounded-b-lg bg-background">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('typeYourMessage')}
          disabled={isSending}
          autoComplete="off"
        />
        <Button type="submit" size="icon" aria-label={t('sendMessage')} disabled={isSending || !inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
