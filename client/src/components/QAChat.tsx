import { useState } from "react";
import { Send, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface QAChatProps {
  documentText: string;
}

interface ChatMessage {
  id: string;
  type: "question" | "answer";
  content: string;
  timestamp: Date;
}

export function QAChat({ documentText }: QAChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim() || isLoading) return;

    const questionMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "question",
      content: currentQuestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, questionMessage]);
    setCurrentQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          documentText: documentText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      const data = await response.json();

      const answerMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "answer",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, answerMessage]);
    } catch (error) {
      console.error("Error asking question:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "answer",
        content:
          "Sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What happens if I terminate this agreement early?",
    "What are my main obligations under this contract?",
    "Are there any automatic renewal clauses?",
    "What fees or penalties should I be aware of?",
    "What are the notice requirements?",
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-8 geist-bold">
        Ask Questions About Your Document
      </h2>

      {messages.length === 0 && (
        <div className="mb-8">
          <p className="text-muted-foreground mb-6 geist-regular">
            Try asking one of these common questions:
          </p>
          <div className="grid gap-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(question)}
                className="text-left p-4 bg-muted/30 hover:bg-muted/50 rounded-xl text-sm text-foreground transition-all hover:scale-[1.02] geist-regular border border-border"
              >
                <Sparkles className="h-4 w-4 inline mr-2 text-primary" />
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "question" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3xl p-5 rounded-xl ${
                message.type === "question"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-foreground border border-border"
              }`}
            >
              {message.type === "answer" && (
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary geist-medium">
                    Legality AI
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed geist-regular">
                {message.content}
              </p>
              <div
                className={`text-xs mt-3 geist-regular ${
                  message.type === "question"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted/50 p-5 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground geist-regular">
                  Analyzing document...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Ask a question about your document..."
          className="flex-1 p-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors geist-regular text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!currentQuestion.trim() || isLoading}
          size="lg"
          className="px-6 geist-medium"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
