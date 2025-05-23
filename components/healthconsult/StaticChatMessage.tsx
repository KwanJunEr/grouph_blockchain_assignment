import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
  }
}

export default function StaticChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex max-w-[80%] rounded-lg p-4",
          isUser ? "bg-primary text-primary-foreground" : "bg-white border",
        )}
      >
        <div className="flex-shrink-0 mr-3">{isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}</div>

        <div className="flex-1">
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    </div>
  )
}
