
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus} from "lucide-react"

const IncomingRequestTab = () => {
    const incomingRequests=[];
    return (
    <Card>
        <CardHeader>
            <CardTitle>Incoming Friend Requests ({incomingRequests.length})</CardTitle>
            <CardDescription>People who want to connect with you</CardDescription>
        </CardHeader>
        <CardContent>
            {incomingRequests.length === 0 ? (
            <div className="text-center py-12">
                <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                <p className="text-muted-foreground">
                You don't have any incoming friend requests at the moment.
                </p>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incomingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                        <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                        <AvatarFallback>
                            {request.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{request.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{request.email}</p>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                        {request.mutualFriends} mutual friends
                        </div>
                        <div className="text-sm text-muted-foreground">
                        Sent {new Date(request.requestDate).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => handleAcceptRequest(request.id)}>
                            Accept
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleRejectRequest(request.id)}
                        >
                            Reject
                        </Button>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            )}
        </CardContent>
    </Card>
  )
}

export default IncomingRequestTab
