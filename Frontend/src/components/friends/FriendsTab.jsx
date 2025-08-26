import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import { Search, Mail, UserMinus, Users } from "lucide-react"
import useFriendsStore from "@/store/useFriendsStore"
import { useEffect, useState } from "react"
import AddFriend from "./AddFriend"

const FriendsTab = ()=>{
    
    const [searchQuery, setSearchQuery] = useState("")
    const [newFriendEmail, setNewFriendEmail] = useState("")
    const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false)

    const { friends, fetchFriends, addFriend, removeFriend, loading } = useFriendsStore();

    const filteredFriends = friends.filter(
    (friend) =>
        friend.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddFriend = async () => {
        addFriend(newFriendEmail);
        setNewFriendEmail("");
        setIsAddFriendDialogOpen(false);
    }

    const handleRemoveFriend = (emailId) => {
        removeFriend(emailId);
    }

    useEffect(() => {
        fetchFriends()
    }, []);

    return (<Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>Your Friends ({friends.length})</CardTitle>
                    <CardDescription>Connect and collaborate with your network</CardDescription>
                </div>
                <AddFriend
                isOpen={isAddFriendDialogOpen}
                setIsOpen={setIsAddFriendDialogOpen}
                newFriendEmail={newFriendEmail}
                setNewFriendEmail={setNewFriendEmail}
                handleAddFriend={handleAddFriend}
                isLoading={loading}
                />
            </div>
            {friends.length!==0 && <div className="relative max-w-sm mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>}
        </CardHeader>
        <CardContent>
            {filteredFriends.length === 0 ? (
            <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No friends found</h3>
                <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search" : "Start building your network by adding friends"}
                </p>
                {friends.length===0 && <AddFriend
                    isOpen={isAddFriendDialogOpen}
                    setIsOpen={setIsAddFriendDialogOpen}
                    newFriendEmail={newFriendEmail}
                    setNewFriendEmail={setNewFriendEmail}
                    handleAddFriend={handleAddFriend}
                    isLoading={loading}
                />}
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFriends.map(friend =>{
                    const {firstName, lastName, email, imageUrl, createdAt} = friend
                    const name = `${firstName} ${lastName}`;
                    const initials = firstName[0]+lastName[0];
                    const status = 'online';
                    const mutualFriends = 1;
                    return(                
                    <Card key={friend.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={imageUrl} alt={name} />
                                <AvatarFallback>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                                status === "online" ? "bg-green-500" : "bg-gray-400"
                                }`}
                            />
                            </div>
                            <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{email}</p>
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <Badge variant={status === "online" ? "default" : "secondary"}>
                                        {status}
                                    </Badge>
                                    <span className="text-muted-foreground">{mutualFriends} mutual friends</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Joined {new Date(createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 bg-transparent cursor-pointer">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Message
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className={'cursor-pointer'}>
                                            <UserMinus className="h-4 w-4" />
                                        </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Remove Friend</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            Are you sure you want to remove {name} from your friends list?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className={'cursor-pointer'}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleRemoveFriend(email)} className={'cursor-pointer'}>
                                                Remove
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>)
                })}
            </div>
            )}
        </CardContent>
    </Card>)
}

export default FriendsTab;