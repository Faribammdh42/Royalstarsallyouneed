
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  sender: string;
  text: string;
  isMe: boolean;
}

export function ChatBubble({ sender, text, isMe }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%]",
        isMe ? "items-end self-end" : "items-start self-start"
      )}
    >
      <div
        className={cn(
          "rounded-xl px-4 py-2",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm">{text}</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1 px-1">
        {sender}
      </span>
    </div>
  );
}
