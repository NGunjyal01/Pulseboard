import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  UserPlus,
  Crown,
  Shield,
  Eye,
  Trash2,
  Edit,
  Building,
  Calendar,
  Activity,
  Lock,
  Globe,
  UserMinus,
  Mail,
  Save,
  X,
} from "lucide-react";

// Mock data
const mockTeams = [
  {
    id: 1,
    name: "Sales Team",
    description: "Focused on revenue growth and customer acquisition",
    avatar: "/placeholder.svg?height=60&width=60",
    isPrivate: false,
    createdDate: "2024-01-15",
    role: "admin",
    members: [
      {
        id: 1,
        name: "Sarah Chen",
        email: "sarah@company.com",
        role: "admin",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
      {
        id: 2,
        name: "Mike Johnson",
        email: "mike@company.com",
        role: "editor",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "offline",
      },
      {
        id: 3,
        name: "Alex Rivera",
        email: "alex@company.com",
        role: "viewer",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
      {
        id: 4,
        name: "Emma Wilson",
        email: "emma@company.com",
        role: "editor",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
    ],
    dashboards: 5,
    activity: "2 hours ago",
  },
  {
    id: 2,
    name: "Marketing Department",
    description: "Campaign management and brand strategy",
    avatar: "/placeholder.svg?height=60&width=60",
    isPrivate: true,
    createdDate: "2024-02-01",
    role: "editor",
    members: [
      {
        id: 5,
        name: "David Brown",
        email: "david@company.com",
        role: "admin",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
      {
        id: 6,
        name: "Lisa Wang",
        email: "lisa@company.com",
        role: "editor",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "offline",
      },
      {
        id: 7,
        name: "Tom Wilson",
        email: "tom@company.com",
        role: "viewer",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
    ],
    dashboards: 8,
    activity: "1 day ago",
  },
];

const mockFriends = [
  { id: 10, name: "John Doe", email: "john@company.com", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 11, name: "Jane Smith", email: "jane@company.com", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 12, name: "Bob Wilson", email: "bob@company.com", avatar: "/placeholder.svg?height=32&width=32" },
];

const roleOptions = [
  { value: "admin", label: "Admin", icon: Crown, color: "text-yellow-600" },
  { value: "editor", label: "Editor", icon: Shield, color: "text-blue-600" },
  { value: "viewer", label: "Viewer", icon: Eye, color: "text-gray-600" },
];

const TeamDetails = ({ teamId = 1 }) => {
  const [team, setTeam] = useState(() => mockTeams.find((t) => t.id === teamId));
  const [isEditMode, setIsEditMode] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [inviteMethod, setInviteMethod] = useState("friends");

  if (!team) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Team Not Found</h1>
          <p className="text-muted-foreground mb-4">The team you're looking for doesn't exist.</p>
          <Button onClick={() => console.log("Navigate to teams")}>Back to Teams</Button>
        </div>
      </div>
    );
  }

  const handleUpdateMemberRole = (memberId, newRole) => {
    setTeam((prev) =>
      prev
        ? {
            ...prev,
            members: prev.members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)),
          }
        : null
    );
  };

  const handleRemoveMember = (memberId) => {
    setTeam((prev) =>
      prev
        ? {
            ...prev,
            members: prev.members.filter((member) => member.id !== memberId),
          }
        : null
    );
  };

  const handleInviteMembers = () => {
    if (!team) return;

    if (inviteMethod === "email" && inviteEmail.trim()) {
      const newMember = {
        id: Date.now(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: "viewer",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "offline",
      };

      setTeam((prev) =>
        prev
          ? {
              ...prev,
              members: [...prev.members, newMember],
            }
          : null
      );
      setInviteEmail("");
    } else if (inviteMethod === "friends" && selectedFriends.length > 0) {
      const friendsToAdd = mockFriends.filter((friend) => selectedFriends.includes(friend.id));
      const newMembers = friendsToAdd.map((friend) => ({
        ...friend,
        role: "viewer",
        status: "offline",
      }));

      setTeam((prev) =>
        prev
          ? {
              ...prev,
              members: [...prev.members, ...newMembers],
            }
          : null
      );
      setSelectedFriends([]);
    }

    setIsInviteDialogOpen(false);
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    console.log("Saving team changes...");
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleDeleteTeam = () => {
    console.log("Deleting team...");
  };

  const handleLeaveTeam = () => {
    console.log("Leaving team...");
  };

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role);
    return roleOption ? roleOption.icon : Eye;
  };

  const getRoleColor = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role);
    return roleOption ? roleOption.color : "text-gray-600";
  };

  const isAdmin = team.role === "admin";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button variant="ghost" size="sm" onClick={() => console.log("Navigate back")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">{team.name}</h1>
          </div>
          <div className="flex gap-2">
            {!isEditMode && (
              <>
                {isAdmin && (
                  <>
                    <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Invite Team Member</DialogTitle>
                          <DialogDescription>Add members to {team.name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Tabs value={inviteMethod} onValueChange={setInviteMethod}>
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="friends">From Friends</TabsTrigger>
                              <TabsTrigger value="email">By Email</TabsTrigger>
                            </TabsList>

                            <TabsContent value="friends" className="space-y-4">
                              <div className="max-h-60 overflow-y-auto space-y-2">
                                {mockFriends
                                  .filter((friend) => !team.members.find((member) => member.id === friend.id))
                                  .map((friend) => (
                                    <div
                                      key={friend.id}
                                      className="flex items-center space-x-3 p-2 hover:bg-muted rounded"
                                    >
                                      <Checkbox
                                        checked={selectedFriends.includes(friend.id)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setSelectedFriends((prev) => [...prev, friend.id]);
                                          } else {
                                            setSelectedFriends((prev) => prev.filter((id) => id !== friend.id));
                                          }
                                        }}
                                      />
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                                        <AvatarFallback>
                                          {friend.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{friend.name}</p>
                                        <p className="text-sm text-muted-foreground">{friend.email}</p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="email" className="space-y-4">
                              <div>
                                <Label htmlFor="invite-email">Email Address</Label>
                                <Input
                                  id="invite-email"
                                  placeholder="Enter email address"
                                  value={inviteEmail}
                                  onChange={(e) => setInviteEmail(e.target.value)}
                                />
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleInviteMembers}
                              disabled={
                                (inviteMethod === "email" && !inviteEmail.trim()) ||
                                (inviteMethod === "friends" && selectedFriends.length === 0)
                              }
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Send Invite
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={() => setIsEditMode(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </>
                )}
              </>
            )}
            {isEditMode && (
              <>
                <Button variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {/* Team Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                  <AvatarFallback>
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{team.name}</h1>
                    {team.isPrivate ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{team.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created {new Date(team.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      <span>Active {team.activity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const RoleIcon = getRoleIcon(team.role);
                        return (
                          <>
                            <RoleIcon className={`h-4 w-4 ${getRoleColor(team.role)}`} />
                            <span className="capitalize">Your role: {team.role}</span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{team.members.length}</div>
                  <div className="text-sm text-muted-foreground">Total Members</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{team.members.filter((m) => m.role === "admin").length}</div>
                  <div className="text-sm text-muted-foreground">Admins</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{team.members.filter((m) => m.role === "editor").length}</div>
                  <div className="text-sm text-muted-foreground">Editors</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{team.dashboards}</div>
                  <div className="text-sm text-muted-foreground">Dashboards</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Management */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                {isEditMode ? "Edit roles and remove members" : "View team member details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.members.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                              member.status === "online" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditMode && isAdmin ? (
                          <>
                            <Select
                              value={member.role}
                              onValueChange={(role) => handleUpdateMemberRole(member.id, role)}
                            >
                              <SelectTrigger className="w-32">
                                <div className="flex items-center gap-2">
                                  <RoleIcon className={`h-4 w-4 ${getRoleColor(member.role)}`} />
                                  <SelectValue />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {roleOptions.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
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
                                    Are you sure you want to remove {member.name} from {team.name}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRemoveMember(member.id)}>
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <RoleIcon className={`h-4 w-4 ${getRoleColor(member.role)}`} />
                            <span className="capitalize text-sm">{member.role}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          {!isEditMode && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>{isAdmin ? "Permanently delete this team" : "Leave this team"}</CardDescription>
              </CardHeader>
              <CardContent>
                {isAdmin ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Team
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Team</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{team.name}"? This action cannot be undone and will remove
                          all team data, dashboards, and member access.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteTeam}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Team
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <UserMinus className="h-4 w-4 mr-2" />
                        Leave Team
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Leave Team</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to leave "{team.name}"? You'll lose access to team dashboards and need
                          to be re-invited to rejoin.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLeaveTeam}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Leave Team
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;