import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { ArrowLeft, UserPlus, Search, Mail, UserMinus, Users, Plus, Loader2 } from "lucide-react"


const AddFriend = ({ isOpen, setIsOpen, newFriendEmail, setNewFriendEmail, handleAddFriend, isLoading }) => {

  const handleClose = (open)=>{
    if(open){
      setIsOpen(true);
    }
    else{
      setNewFriendEmail('');
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={'text-foreground'}>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>Send a friend request by email address</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter email address"
            value={newFriendEmail}
            onChange={(e) => setNewFriendEmail(e.target.value)}
            className={'text-foreground'}
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              className="cursor-pointer text-foreground" 
              onClick={() => {setNewFriendEmail(''); setIsOpen(false);}}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddFriend} 
              className="cursor-pointer"
              disabled={!newFriendEmail.trim() || isLoading}
            >
              {!isLoading && <Mail className="h-4 w-4 mr-2" />}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Processing..." : "Send Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriend;