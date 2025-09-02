import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Crown, Shield, User, UserMinus } from "lucide-react"
import { useTeamsStore } from "@/store/useTeamsStore"
import useAuthStore from "@/store/useAuthStore"


const roleOptions = [
  { value: "owner", label: "Owner", icon: Crown, color: "text-yellow-600" },
  { value: "admin", label: "Admin", icon: Shield, color: "text-blue-600" },
  { value: "member", label: "Member", icon: User, color: "text-gray-600" },
]


const MembersManagement = ({ isEditMode, onUpdateMemberRole, onRemoveMember, pendingRoleUpdates, pendingRemovals }) => {
    const { teamDetails } = useTeamsStore();
    const { user: currentUser } = useAuthStore();

    const isAdmin = teamDetails.role !== 'member';
    const isOwner = teamDetails.role === 'owner';

    const getRoleIcon = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.icon : User
    }

    const getRoleColor = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? role.color : "text-gray-600"
    }

    // Get effective role (pending update or current role)
    const getEffectiveRole = (memberId, currentRole) => {
        return pendingRoleUpdates[memberId] || currentRole;
    }

    // Check if a member is scheduled for removal
    const isMemberPendingRemoval = (memberId) => {
        return pendingRemovals.has(memberId);
    }

    // Check if user can modify a specific member's role
    const canModifyMember = (member) => {
        const currentUserMember = teamDetails.members.find(m => m.user._id === currentUser._id);

        // Users can't modify their own role (handled separately)
        if (member.user._id === currentUser._id) return false;

        // Owners can modify anyone
        if (currentUserMember?.role === 'owner') return true;

        // Admins can only modify members (not other admins or owners)
        if (currentUserMember?.role === 'admin') {
            return member.role === 'member';
        }

        // Members can't modify anyone
        return false;
    }

    return (
    <Card>
        <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
            {isEditMode ? "Edit roles and remove members" : "View team member details"}
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            {teamDetails.members.map((member) => {
            const { user, role: currentRole } = member;
            const { firstName, lastName, email, imageUrl, _id: id } = user;
            
            // Skip if member is pending removal
            if (isMemberPendingRemoval(id)) {
                return (
                <div key={id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-100 opacity-70">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />
                        <AvatarFallback>
                        {firstName[0]}{lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-medium">{firstName} {lastName}</h4>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                    </div>
                    <div className="text-sm text-red-600">
                    Scheduled for removal
                    </div>
                </div>
                );
            }
            
            const effectiveRole = getEffectiveRole(id, currentRole);
            const RoleIcon = getRoleIcon(effectiveRole);
            const name = `${firstName} ${lastName}`;
            const initials = firstName[0] + lastName[0];
            const canModify = canModifyMember(member);
            
            return (
                <div key={id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="relative">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={imageUrl} alt={name} />
                        <AvatarFallback>
                        {initials}
                        </AvatarFallback>
                    </Avatar>
                    </div>
                    <div>
                    <h4 className="font-medium">{name}</h4>
                    <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isEditMode && isAdmin && canModify ? (
                    <>
                        <Select
                        value={effectiveRole}
                        onValueChange={(newRole) => onUpdateMemberRole(id, newRole)}
                        >
                        <SelectTrigger className="w-32">
                            <div className="flex items-center gap-2">
                            <RoleIcon className={`h-4 w-4 ${getRoleColor(effectiveRole)}`} />
                            <SelectValue />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {roleOptions.map((role) => (
                            <SelectItem 
                                key={role.value} 
                                value={role.value}
                                disabled={role.value === 'owner' && !isOwner} // Only owners can assign owner role
                            >
                                <div className="flex items-center gap-2">
                                <role.icon className={`h-4 w-4 ${role.color}`} />
                                {role.label}
                                </div>
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                            <UserMinus className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Remove Member</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to remove {name} from {teamDetails.name}?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onRemoveMember(id)}>
                                Remove
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </>
                    ) : (
                    <div className="flex items-center gap-2">
                        <RoleIcon className={`h-4 w-4 ${getRoleColor(effectiveRole)}`} />
                        <span className="capitalize text-sm">{effectiveRole}</span>
                        {pendingRoleUpdates[id] && (
                        <span className="text-xs text-yellow-600">(pending)</span>
                        )}
                    </div>
                    )}
                </div>
                </div>
            );
            })}
        </div>
        </CardContent>
    </Card>
    );
};

export default MembersManagement;