import { useEffect, useState } from "react";
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

    const { invitations, fetchInvitations, acceptInvite, rejectInvite } = useTeamsStore();

    const getRoleIcon = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.icon : Eye
    }

    const getRoleColor = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.color : "text-gray-600"
    }

    useEffect(()=>{
        fetchInvitations();
    },[])

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
            const {role,invitedBy,createdAt:inviteDate,team,_id:id} = invitation;
            const RoleIcon = getRoleIcon(role);
            const {firstName,lastName,email,imageUrl:inviterAvatar} = invitedBy;
            const InviterName = firstName+lastName;
            const initials = firstName[0]+lastName[0];
            const {name:teamName,description:teamDescription,imageUrl:teamAvatar,members} = team;
            return (
                <Card key={id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                        src={teamAvatar}
                        alt={teamName}
                        />
                        <AvatarFallback>
                        <Building className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{teamName}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                        {teamDescription}
                        </p>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                        <RoleIcon className={`h-4 w-4 ${getRoleColor(role)}`} />
                        <span className="capitalize">Role: {role}</span>
                        </div>
                        <Badge variant="secondary">{members.length} members</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={inviterAvatar} alt={InviterName}/>
                            <AvatarFallback className="text-xs">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span>Invited by {InviterName}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Invited {new Date(inviteDate).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2">
                        <Button size="sm" className="flex-1 cursor-pointer"
                        onClick={() => acceptInvite(id)}>
                            Accept
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent cursor-pointer"
                        onClick={() => rejectInvite(id)}>
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
