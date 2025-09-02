import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Mail } from "lucide-react"
import { useTeamsStore } from "@/store/useTeamsStore"
import useFriendsStore from "@/store/useFriendsStore"


const InviteDialog = ({ isOpen, onOpenChange }) => {

    const { teamDetails, sendInvite, addMembers } = useTeamsStore();
    const { friends, fetchFriends } = useFriendsStore();

    const [inviteEmail, setInviteEmail] = useState("")
    const [selectedFriends, setSelectedFriends] = useState([])
    const [inviteMethod, setInviteMethod] = useState("friends")
    console.log(friends)

    const handleInviteMembers = async() => {
        if (!teamDetails) return

        if (inviteMethod === "email" && inviteEmail.trim()) {
            sendInvite(teamDetails._id,inviteEmail,'member');
            setInviteEmail("")
        } else if (inviteMethod === "friends" && selectedFriends.length > 0) {
            addMembers(teamDetails._id,selectedFriends);
            setSelectedFriends([])
        }

        onOpenChange(false)
    }

    useEffect(()=>{
        fetchFriends();
    },[])

    return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
        <Button className={'cursor-pointer'}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
        </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>Add members to {teamDetails.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <Tabs value={inviteMethod} onValueChange={setInviteMethod}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="friends" className={'cursor-pointer'}>From Friends</TabsTrigger>
                    <TabsTrigger value="email" className={'cursor-pointer'}>By Email</TabsTrigger>
                </TabsList>

                <TabsContent value="friends" className="space-y-4">
                    <div className="max-h-60 overflow-y-auto space-y-2">
                    {friends
                        .filter((friend) => !teamDetails.members.find((member) => member.user._id === friend._id))
                        .map((friend) => {
                            const {firstName, lastName, email, imageUrl, _id:id} = friend
                            const name = `${firstName} ${lastName}`;
                            const initials = firstName[0]+lastName[0];
                            return(
                            <div key={id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                                <Checkbox className={'cursor-pointer'}
                                checked={selectedFriends.includes(id)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedFriends((prev) => [...prev, id])
                                    } else {
                                        setSelectedFriends((prev) => prev.filter((id) => id !== id))
                                    }
                                }}
                                />
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={imageUrl} alt={name} />
                                    <AvatarFallback>
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{name}</p>
                                    <p className="text-sm text-muted-foreground">{email}</p>
                                </div>
                            </div>)})}
                    </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-3">
                    <Label htmlFor="invite-email" className={'mt-1'}>Email Address</Label>
                    <Input
                        id="invite-email"
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                    />
                </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} className={'cursor-pointer'}>
                    Cancel
                </Button>
                <Button
                    onClick={handleInviteMembers}
                    className={'cursor-pointer'}
                    disabled={
                    (inviteMethod === "email" && !inviteEmail.trim()) ||
                    (inviteMethod === "friends" && selectedFriends.length === 0)
                    }
                >
                    {inviteMethod==='friends' ? 'Add' :<>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invite</>}
                </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    )
}

export default InviteDialog;