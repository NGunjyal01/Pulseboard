import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useDashboardSocket } from "@/hooks/useDashboardSocket"
import useDashboardStore from "@/store/useDashboardStore"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

const CommentsTab = () => {
    
    const [ newComment,setNewComment] = useState('');
    const { dashboardId,comments } = useDashboardStore();
    const { sendComment } = useDashboardSocket(dashboardId);
    
    const onAddComment = ()=>{
        sendComment(newComment);
        setNewComment('');
    }

    return (
    <>
        <div className="space-y-4">
        {comments.map((comment) =>{
            const {_id:id,user,text,chartId,createdAt} = comment;
            const {firstName,lastName,imageUrl:avatar} = user;
            const name = `${firstName} ${lastName}`;
            const initials = firstName[0]+lastName[0];
            return (
            <div key={id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{name}</span>
                        <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
                    </div>
                    <p className="text-sm">{text}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                        {chartId}
                    </Badge>
                </div>
            </div>)}
        )}
        </div>

        <div className="border-t pt-4">
        <div className="flex gap-2">
            <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
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