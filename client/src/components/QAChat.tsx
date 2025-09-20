import { useState } from "react";
import { Send, MessageCircle, Loader2 } from "lucide-react";

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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Ask Questions About Your Document
      </h2>

      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Try asking one of these common questions:
          </p>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(question)}
                className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "question" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3xl p-4 rounded-lg ${
                message.type === "question"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.type === "answer" && (
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Legality AI
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div
                className={`text-xs mt-2 ${
                  message.type === "question"
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">
                  Analyzing document...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Ask a question about your document..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!currentQuestion.trim() || isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
