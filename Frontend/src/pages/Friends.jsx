import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, UserPlus, Search, Mail, UserMinus, Users, Plus } from "lucide-react"

const mockFriends = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "online",
    mutualFriends: 5,
    joinedDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "offline",
    mutualFriends: 3,
    joinedDate: "2024-02-15",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@company.com",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "online",
    mutualFriends: 8,
    joinedDate: "2024-01-20",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@company.com",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "offline",
    mutualFriends: 2,
    joinedDate: "2024-03-05",
  },
]

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState(mockFriends)
  const [newFriendEmail, setNewFriendEmail] = useState("")
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false)
  const navigate = useNavigate()

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddFriend = () => {
    if (newFriendEmail.trim()) {
      const newFriend = {
        id: Date.now(),
        name: newFriendEmail.split("@")[0],
        email: newFriendEmail,
        avatar: "/placeholder.svg?height=60&width=60",
        status: "offline",
        mutualFriends: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      }
      setFriends((prev) => [...prev, newFriend])
      setNewFriendEmail("")
      setIsAddFriendDialogOpen(false)
    }
  }

  const handleRemoveFriend = (friendId) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== friendId))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" className={'absolute cursor-pointer lg:py-5'} onClick={() => navigate("/dashboards")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboards
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Friends</h1>
          </div>
          <Dialog open={isAddFriendDialogOpen} onOpenChange={setIsAddFriendDialogOpen}>
            <DialogTrigger asChild>
              <Button className={'absolute cursor-pointer right-[2%]'}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Friend</DialogTitle>
                <DialogDescription>Send a friend request by email address</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter email address"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddFriendDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFriend} disabled={!newFriendEmail.trim()}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Friends ({friends.length})</CardTitle>
              <CardDescription>Connect and collaborate with your network</CardDescription>
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              {filteredFriends.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No friends found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try adjusting your search" : "Start building your network by adding friends"}
                  </p>
                  <Dialog open={isAddFriendDialogOpen} onOpenChange={setIsAddFriendDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Friend
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Friend</DialogTitle>
                        <DialogDescription>Send a friend request by email address</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Enter email address"
                          value={newFriendEmail}
                          onChange={(e) => setNewFriendEmail(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddFriendDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddFriend} disabled={!newFriendEmail.trim()}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Request
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                                friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{friend.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{friend.email}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <Badge variant={friend.status === "online" ? "default" : "secondary"}>
                              {friend.status}
                            </Badge>
                            <span className="text-muted-foreground">{friend.mutualFriends} mutual friends</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(friend.joinedDate).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Mail className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Friend</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {friend.name} from your friends list?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRemoveFriend(friend.id)}>
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Friends;