// src/app/firm/support/page.tsx
"use client";

import { useState } from "react";
import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SupportChatPage() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Welcome to PayVibe support for Firms! How can I help you today?" },
        { from: "bot", text: "You can ask about client onboarding, payment processing, or compliance." },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: "user", text: input }]);
        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { from: "bot", text: `I've received your query about "${input}". Let me find the relevant information...` }]);
        }, 1000);
        setInput("");
    };

    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Support Chat</h1>
                    <p className="text-muted-foreground">
                        Get instant help from our AI assistant or connect with a support agent.
                    </p>
                </div>
                <Card className="h-[600px] flex flex-col">
                    <CardHeader>
                        <CardTitle>AI Support Assistant</CardTitle>
                        <CardDescription>Powered by GPT-4 with RAG</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow p-0">
                        <ScrollArea className="h-full p-6">
                            <div className="space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                                        {msg.from === 'bot' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback><Bot /></AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.from === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                         {msg.from === 'user' && (
                                            <Avatar className="h-8 w-8">
                                                 <AvatarFallback><User /></AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <Input 
                                placeholder="Type your message..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </Card>
            </div>
        </FirmLayout>
    );
}
