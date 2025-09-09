import { MessageCircle, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CommentsTab = ({ comments, newComment, onCommentChange, onAddComment }) => {
    return (
    <>
        <div className="space-y-4">
        {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                <AvatarFallback>
                {comment.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.user}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm">{comment.message}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                {comment.chartId}
                </Badge>
            </div>
            </div>
        ))}
        </div>

        <div className="border-t pt-4">
        <div className="flex gap-2">
            <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="min-h-[80px]"
            />
        </div>
        <Button size="sm" className="mt-2 w-full" onClick={onAddComment} disabled={!newComment.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send Comment
        </Button>
        </div>
    </>
    )
}

export default CommentsTab