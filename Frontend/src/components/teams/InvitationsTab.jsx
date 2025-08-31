import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import { ArrowLeft, Users, Plus, Search, MoreVertical, Crown, Shield, Eye, Trash2, Building, Calendar, Activity, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router";
import { useTeamsStore } from "@/store/useTeamsStore";
const roleOptions = [
  { value: "admin", label: "Admin", icon: Crown, color: "text-yellow-600" },
  { value: "editor", label: "Editor", icon: Shield, color: "text-blue-600" },
  { value: "viewer", label: "Viewer", icon: Eye, color: "text-gray-600" },
]
const InvitationsTab = () => {

    const {invitations} = useTeamsStore();
    console.log(invitations.length)

  const handleAcceptTeamInvite = (inviteId) => {
    const invitation = invitations.find((inv) => inv.id === inviteId)
    if (invitation) {
      // Add to teams list (simplified - in real app would call API)
      const newTeam = {
        id: invitation.id,
        name: invitation.teamName,
        description: invitation.teamDescription,
        avatar: invitation.teamAvatar,
        isPrivate: false,
        createdDate: new Date().toISOString().split("T")[0],
        role: invitation.role,
        members: [], // Would be populated from API
        dashboards: 0,
        activity: "Just joined",
      }
      setTeams((prev) => [...prev, newTeam])
      // Remove from invitations
      
    }
  }

  const handleRejectTeamInvite = (inviteId) => {
    
  }

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role)
    return roleOption ? roleOption.icon : Eye
  }

  const getRoleColor = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role)
    return roleOption ? roleOption.color : "text-gray-600"
  }
    return (
    <Card>
    <CardHeader>
        <CardTitle>Team Invitations ({invitations.length})</CardTitle>
        <CardDescription>Teams that have invited you to join</CardDescription>
    </CardHeader>
    <CardContent>
        {invitations.length === 0 ? (
        <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team invitations</h3>
            <p className="text-muted-foreground">
            You don't have any pending team invitations at the moment.
            </p>
        </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => {
            const RoleIcon = getRoleIcon(invitation.role)
            return (
                <Card key={invitation.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                        src={invitation.teamAvatar || "/placeholder.svg"}
                        alt={invitation.teamName}
                        />
                        <AvatarFallback>
                        <Building className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{invitation.teamName}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                        {invitation.teamDescription}
                        </p>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                        <RoleIcon className={`h-4 w-4 ${getRoleColor(invitation.role)}`} />
                        <span className="capitalize">Role: {invitation.role}</span>
                        </div>
                        <Badge variant="secondary">{invitation.memberCount} members</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-5 w-5">
                        <AvatarImage
                            src={invitation.inviterAvatar || "/placeholder.svg"}
                            alt={invitation.invitedBy}
                        />
                        <AvatarFallback className="text-xs">
                            {invitation.invitedBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                        </Avatar>
                        <span>Invited by {invitation.invitedBy}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Invited {new Date(invitation.inviteDate).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2">
                        <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAcceptTeamInvite(invitation.id)}
                        >
                        Accept
                        </Button>
                        <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleRejectTeamInvite(invitation.id)}
                        >
                        Reject
                        </Button>
                    </div>
                    </div>
                </CardContent>
                </Card>
            )
            })}
        </div>
        )}
    </CardContent>
    </Card>
    )
}

export default InvitationsTab
