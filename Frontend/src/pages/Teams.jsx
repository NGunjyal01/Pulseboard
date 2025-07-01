import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  MoreVertical,
  Crown,
  Shield,
  Eye,
  Trash2,
  Building,
  Calendar,
  Activity,
  Lock,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router";

const mockTeams = [
//   {
//     id: 1,
//     name: "Sales Team",
//     description: "Focused on revenue growth and customer acquisition",
//     avatar: "/placeholder.svg?height=60&width=60",
//     isPrivate: false,
//     createdDate: "2024-01-15",
//     role: "admin",
//     members: [
//       {
//         id: 1,
//         name: "Sarah Chen",
//         email: "sarah@company.com",
//         role: "admin",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//       {
//         id: 2,
//         name: "Mike Johnson",
//         email: "mike@company.com",
//         role: "editor",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "offline",
//       },
//       {
//         id: 3,
//         name: "Alex Rivera",
//         email: "alex@company.com",
//         role: "viewer",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//       {
//         id: 4,
//         name: "Emma Wilson",
//         email: "emma@company.com",
//         role: "editor",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//     ],
//     dashboards: 5,
//     activity: "2 hours ago",
//   },
//   {
//     id: 2,
//     name: "Marketing Department",
//     description: "Campaign management and brand strategy",
//     avatar: "/placeholder.svg?height=60&width=60",
//     isPrivate: true,
//     createdDate: "2024-02-01",
//     role: "editor",
//     members: [
//       {
//         id: 5,
//         name: "David Brown",
//         email: "david@company.com",
//         role: "admin",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//       {
//         id: 6,
//         name: "Lisa Wang",
//         email: "lisa@company.com",
//         role: "editor",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "offline",
//       },
//       {
//         id: 7,
//         name: "Tom Wilson",
//         email: "tom@company.com",
//         role: "viewer",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//     ],
//     dashboards: 8,
//     activity: "1 day ago",
//   },
//   {
//     id: 3,
//     name: "Product Analytics",
//     description: "Data-driven product insights and metrics",
//     avatar: "/placeholder.svg?height=60&width=60",
//     isPrivate: false,
//     createdDate: "2024-03-10",
//     role: "viewer",
//     members: [
//       {
//         id: 8,
//         name: "Anna Garcia",
//         email: "anna@company.com",
//         role: "admin",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//       {
//         id: 9,
//         name: "Chris Lee",
//         email: "chris@company.com",
//         role: "editor",
//         avatar: "/placeholder.svg?height=32&width=32",
//         status: "online",
//       },
//     ],
//     dashboards: 3,
//     activity: "5 hours ago",
//   },
];

const roleOptions = [
  { value: "admin", label: "Admin", icon: Crown, color: "text-yellow-600" },
  { value: "editor", label: "Editor", icon: Shield, color: "text-blue-600" },
  { value: "viewer", label: "Viewer", icon: Eye, color: "text-gray-600" },
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [teams, setTeams] = useState(mockTeams);
  const navigate = useNavigate();

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || team.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteTeam = (teamId) => {
    setTeams((prev) => prev.filter((team) => team.id !== teamId));
  };

  const handleTeamClick = (teamId) => {
    navigate('/team/'+teamId);
  };

  const handleViewDetails = (e, teamId) => {
    e.stopPropagation();
    navigate('/team/'+teamId);
  };

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role);
    return roleOption ? roleOption.icon : Eye;
  };

  const getRoleColor = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role);
    return roleOption ? roleOption.color : "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" className={'cursor-pointer lg:py-5'} onClick={() => navigate('/dashboards')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboards
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Teams</h1>
          </div>
          <Button className={'cursor-pointer'} onClick={() => navigate('/createTeam')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Teams ({teams.length})</CardTitle>
              <CardDescription>Teams you're a member of or manage</CardDescription>
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
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
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
                  <Button className={'cursor-pointer'} onClick={() => navigate('/createTeam')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams.map((team) => {
                    const RoleIcon = getRoleIcon(team.role);
                    return (
                      <Card
                        key={team.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleTeamClick(team.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                                <AvatarFallback>
                                  <Building className="h-6 w-6" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{team.name}</h3>
                                  {team.isPrivate ? (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{team.description}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => handleViewDetails(e, team.id)}>
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
                                        Are you sure you want to delete "{team.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteTeam(team.id)}>
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
                                <RoleIcon className={`h-4 w-4 ${getRoleColor(team.role)}`} />
                                <span className="capitalize">{team.role}</span>
                              </div>
                              <Badge variant="secondary">{team.members.length} members</Badge>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Created {new Date(team.createdDate).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Activity className="h-4 w-4" />
                                <span>Active {team.activity}</span>
                              </div>
                              <span>{team.dashboards} dashboards</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {team.members.slice(0, 4).map((member) => (
                                  <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback className="text-xs">
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {team.members.length > 4 && (
                                  <div className="h-6 w-6 bg-muted border-2 border-background rounded-full flex items-center justify-center text-xs">
                                    +{team.members.length - 4}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Teams;