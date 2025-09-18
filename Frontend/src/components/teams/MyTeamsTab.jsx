import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import { ArrowLeft, Users, Plus, Search, MoreVertical, Crown, Shield, Eye, Trash2, Building, Calendar, Activity, Lock, Globe, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useTeamsStore } from "@/store/useTeamsStore";
import useAuthStore from "@/store/useAuthStore";


const roleOptions = [
  { value: "owner", label: "Owner", icon: Crown, color: "text-yellow-600" },
  { value: "admin", label: "Admin", icon: Shield, color: "text-blue-600" },
  { value: "member", label: "Member", icon: User, color: "text-gray-600" },
]
// const roleOptions = [
//   { value: "admin", label: "Admin", icon: Crown, description: "Full access to team settings and data" },
//   { value: "editor", label: "Editor", icon: Shield, description: "Can edit dashboards and invite members" },
//   { value: "viewer", label: "Viewer", icon: Eye, description: "Can view dashboards and comment" },
// ]

const MyTeamsTab = () => {
    
    const { teams, fetchTeams } = useTeamsStore();
    const { user } = useAuthStore();

    const [searchQuery, setSearchQuery] = useState("")
    const [filterRole, setFilterRole] = useState("all")
    const navigate = useNavigate(); 

    const filteredTeams = teams.filter((team) => {
        const matchesSearch =
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase()))
        const member = team.members.find(m => m.user === user._id);
        const role = member ? member.role : 'member';

        const matchesRole = filterRole === "all" || role === filterRole
        return matchesSearch && matchesRole
    })

    const handleDeleteTeam = (teamId) => {
    
    }

    const handleTeamClick = (teamId) => {
        navigate(`/team/${teamId}`)
    }

    const handleViewDetails = (e, teamId) => {
        e.stopPropagation()
        navigate(`/team/${teamId}`)
    }

    const getRoleIcon = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.icon : User
    }

    const getRoleColor = (role) => {
        const roleOption = roleOptions.find((r) => r.value === role)
        return roleOption ? roleOption.color : "text-gray-600"
    }

    useEffect(()=>{
        fetchTeams();
    },[])

    return (
    <Card>
    <CardHeader>
        <div className="flex items-center justify-between">
        <div>
            <CardTitle>Your Teams ({teams.length})</CardTitle>
            <CardDescription>Teams you're a member of or manage</CardDescription>
        </div>
        <Button onClick={() => navigate("/createTeam")} className={'cursor-pointer'}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
        </Button>
        </div>
        <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-40 cursor-pointer">
                <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="all" className={'cursor-pointer'}>All Roles</SelectItem>
            <SelectItem value="owner" className={'cursor-pointer'}>Owner</SelectItem>
            <SelectItem value="admin" className={'cursor-pointer'}>Admin</SelectItem>
            <SelectItem value="member" className={'cursor-pointer'}>Member</SelectItem>
            </SelectContent>
        </Select>
        </div>
    </CardHeader>
    <CardContent>
        {filteredTeams.length === 0 ? (
        <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground mb-4">
            {searchQuery || filterRole !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first team to get started"}
            </p>
            <Button onClick={() => navigate("/createTeam")} className={'cursor-pointer'}>
                <Plus className="h-4 w-4 mr-2" />
                Create Team
            </Button>
        </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => {
            const member = team.members.find(m => m.user === user._id);
            const role = member ? member.role : null;
            const RoleIcon = getRoleIcon(role)
            const {_id:id,imageUrl,name,description,createdAt,members,dashboards} = team;
            return (
                <Card
                key={id}
                className='cursor-pointer group relative overflow-hidden hover:shadow-xl hover:scale-[102%] ease-in-out transition-transform duration-300'
                onClick={() => handleTeamClick(id)}
                >
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                        <AvatarImage src={imageUrl} alt={name} />
                        <AvatarFallback>
                            <Building className="h-6 w-6" />
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{name}</h3>
                            {/* {team.isPrivate ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            )} */}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleViewDetails(e, id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Team
                            </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Team</AlertDialogTitle>
                                <AlertDialogDescription>
                                Are you sure you want to delete "{name}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTeam(id)}>
                                Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                        <RoleIcon className={`h-4 w-4 ${getRoleColor(role)}`} />
                        <span className="capitalize">{role}</span>
                        </div>
                        <Badge variant="secondary">{members.length} members</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Created {new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                        <span>{dashboards.length} dashboards</span>
                    </div>

                    {/* <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Activity className="h-4 w-4" />
                            <span>Active {team.activity}</span>
                        </div>
                        <span>{dashboards} dashboards</span>
                    </div> */}

                    {/* Member Avatars */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                        {members.slice(0, 4).map((member) => (
                            <Avatar key={member._id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.imageUrl} alt={member.name} />
                            <AvatarFallback className="text-xs">
                                {}
                            </AvatarFallback>
                            </Avatar>
                        ))}
                        {members.length > 4 && (
                            <div className="h-6 w-6 bg-muted border-2 border-background rounded-full flex items-center justify-center text-xs">
                            +{team.members.length - 4}
                            </div>
                        )}
                        </div>
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

export default MyTeamsTab
