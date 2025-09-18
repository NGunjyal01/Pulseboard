import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useTeamsStore } from "@/store/useTeamsStore"
import { Building, Calendar, Activity, Lock, Globe, Crown, Shield, User } from "lucide-react"


const roleOptions = [
  { value: "owner", label: "Owner", icon: Crown, color: "text-yellow-600" },
  { value: "admin", label: "Admin", icon: Shield, color: "text-blue-600" },
  { value: "member", label: "Member", icon: User, color: "text-gray-600" },
]

const TeamInfoCard = () => {

    const {teamDetails} = useTeamsStore();

    const getRoleIcon = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.icon : "User"
    }

    const getRoleColor = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.color : "text-gray-600"
    }

    const {name, description, imageUrl, createdAt, role, members, dashboards} = teamDetails;

    const RoleIcon = getRoleIcon(role)

    return (
    <Card >
        <CardHeader className="relative pb-2 z-10">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback>
                    <Building className="h-8 w-8" />
                </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    {teamDetails.isPrivate ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : (
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
                <p className="text-muted-foreground mb-2">{description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    <span>Active {teamDetails.activity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <RoleIcon className={`h-4 w-4 ${getRoleColor(role)}`} />
                    <span className="capitalize">Your role: {role}</span>
                    </div>
                </div>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{members.length}</div>
                    <div className="text-sm text-muted-foreground">Total Members</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{teamDetails.members.filter((m) => m.role === "admin").length}</div>
                    <div className="text-sm text-muted-foreground">Admins</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{dashboards.length}</div>
                <div className="text-sm text-muted-foreground">Dashboards</div>
                </div>
            </div>
        </CardContent>
    </Card>
    )
}

export default TeamInfoCard;