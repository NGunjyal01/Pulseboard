import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Users,
  X,
  Search,
  Upload,
  Building,
  UserPlus,
  Crown,
  Shield,
  Eye,
  User,
  Mail,
  Plus,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router"

const mockFriends = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    skills: ["Analytics", "Design"],
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    skills: ["Development", "Backend"],
  },
  {
    id: 3,
    name: "Alex Rivera",
    email: "alex@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    skills: ["Marketing", "Strategy"],
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    skills: ["Product", "UX"],
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    skills: ["Sales", "Business"],
  },
]

const roleOptions = [
  { value: "admin", label: "Admin", icon: Crown, description: "Full access to team settings and data" },
  { value: "editor", label: "Editor", icon: Shield, description: "Can edit dashboards and invite members" },
  { value: "viewer", label: "Viewer", icon: Eye, description: "Can view dashboards and comment" },
]

const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    avatar: "",
    isPrivate: false,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [emailInvite, setEmailInvite] = useState("")
  const navigate = useNavigate();

  const filteredFriends = mockFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  
  const handleMemberToggle = (friend) => {
    const isSelected = selectedMembers.find((m) => m.id === friend.id)
    if (isSelected) {
      setSelectedMembers((prev) => prev.filter((m) => m.id !== friend.id))
    } else {
      setSelectedMembers((prev) => [
        ...prev,
        {
          ...friend,
          role: "viewer",
        },
      ])
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(
        filteredFriends.map((friend) => ({
          ...friend,
          role: "viewer",
        }))
      )
    }
    setSelectAll(!selectAll)
  }

  const updateMemberRole = (memberId, role) => {
    setSelectedMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, role } : member)))
  }

  const removeMember = (memberId) => {
    setSelectedMembers((prev) => prev.filter((member) => member.id !== memberId))
  }

  const handleCreateTeam = () => {
    console.log("Creating team:", {
      ...teamData,
      members: selectedMembers,
    })
    // In a real app, you would navigate to the dashboards page
    console.log("Navigating to dashboards")
  }

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role)
    return roleOption ? roleOption.icon : Eye
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" className={'absolute cursor-pointer lg:py-5'} onClick={() => navigate('/teams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Friends
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Create New Team</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Team Information
            </CardTitle>
            <CardDescription>Set up your team details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={teamData.avatar || "/placeholder.svg"} alt="Team Avatar" />
                  <AvatarFallback>
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 bg-transparent">
                  <Upload className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="e.g., Marketing Team, Product Analytics"
                    value={teamData.name}
                    onChange={(e) => setTeamData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea
                    id="team-description"
                    placeholder="Brief description of your team's purpose and goals..."
                    value={teamData.description}
                    onChange={(e) => setTeamData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="private-team"
                checked={teamData.isPrivate}
                onCheckedChange={(checked) => setTeamData((prev) => ({ ...prev, isPrivate: !!checked }))}
              />
              <Label htmlFor="private-team" className="text-sm">
                Make this team private (invite-only)
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Add Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add Team Members
            </CardTitle>
            <CardDescription className={'my-1'}>Select friends to add to your team and assign their roles</CardDescription>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search friends by name, email, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 my-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
                <Label htmlFor="select-all" className="text-sm">
                  Select All
                </Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="friends" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="friends">
                  <User className="h-4 w-4 mr-2" />
                  Friends
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Building className="h-4 w-4 mr-2" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="friends" className="space-y-2">
                {mockFriends
                  .filter((friend) => !selectedMembers.find((c) => c.id === friend.id))
                  .map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {friend.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{friend.name}</p>
                          <p className="text-xs text-muted-foreground">{friend.email}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleMemberToggle(friend)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="teams" className="space-y-2">
                <div>Teams are not yet implemented</div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-invite">Email Address</Label>
                  <Input
                    id="email-invite"
                    type="email"
                    placeholder="colleague@company.com"
                    value={emailInvite}
                    onChange={(e) => setEmailInvite(e.target.value)}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (emailInvite.trim()) {
                      const newCollaborator = {
                        id: Date.now(),
                        name: emailInvite.split("@")[0],
                        email: emailInvite,
                        avatar: "/placeholder.svg?height=40&width=40",
                        role: "viewer",
                        skills: [],
                      }
                      setSelectedMembers((prev) => [...prev, newCollaborator])
                      setEmailInvite("")
                    }
                  }}
                  disabled={!emailInvite.trim()}
                  className="w-full"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Send Invite
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Team Members & Roles ({selectedMembers.length})
              </CardTitle>
              <CardDescription>Configure roles and permissions for selected team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedMembers.map((member) => {
                  const RoleIcon = getRoleIcon(member.role)
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {member.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={member.role} onValueChange={(role) => updateMemberRole(member.id, role)}>
                          <SelectTrigger className="w-32">
                            <SelectValue>
                              <div className="flex items-center gap-2">
                                <RoleIcon className="h-4 w-4" />
                                <span className="text-sm">
                                  {roleOptions.find((r) => r.value === member.role)?.label}
                                </span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <role.icon className="h-4 w-4" />
                                  <div>
                                    <div className="font-medium">{role.label}</div>
                                    <div className="text-xs text-muted-foreground">{role.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => removeMember(member.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Team Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{selectedMembers.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{selectedMembers.filter((m) => m.role === "admin").length}</div>
                <div className="text-sm text-muted-foreground">Admins</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{selectedMembers.filter((m) => m.role === "editor").length}</div>
                <div className="text-sm text-muted-foreground">Editors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => console.log("Cancel team creation")}>
            Cancel
          </Button>
          <Button onClick={handleCreateTeam} disabled={!teamData.name.trim() || selectedMembers.length === 0}>
            <Users className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTeam;