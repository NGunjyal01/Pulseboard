import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, X, Search, Upload, Building, UserPlus, Crown, Shield, Eye, User, Mail, Plus,} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router"
import useFriendsStore from "@/store/useFriendsStore"
import { useTeamsStore } from "@/store/useTeamsStore"

const roleOptions = [
  // { value: "admin", label: "Admin", icon: Crown, description: "Full access to team settings and data" },
  { value: "admin", label: "Admin", icon: Shield },
  { value: "member", label: "Member", icon: User },
]

const CreateTeam = () => {

  const { friends, fetchFriends } = useFriendsStore();
  const { createTeam, sendInvite } = useTeamsStore();

  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    avatar: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [emailInvite, setEmailInvite] = useState("")
  const navigate = useNavigate();
  
  const handleMemberToggle = (friend) => {
    const isSelected = selectedMembers.find((m) => m._id === friend._id)
    if (isSelected) {
      setSelectedMembers((prev) => prev.filter((m) => m.id !== id))
    } else {
      setSelectedMembers((prev) => [
        ...prev,
        {
          ...friend,
          role: "member",
        },
      ])
    }
  }

  const updateMemberRole = (memberId, role) => {
    setSelectedMembers((prev) => prev.map((member) => (member._id === memberId ? { ...member, role } : member)))
  }

  const removeMember = (memberId) => {
    setSelectedMembers((prev) => prev.filter((member) => member._id !== memberId))
  }

  const handleCreateTeam = () => {
    createTeam({
      ...teamData,
      members: selectedMembers,
    },navigate);
  }

  const getRoleIcon = (role) => {
    const roleOption = roleOptions.find((r) => r.value === role)
    return roleOption ? roleOption.icon : User
  }

  const handleEmailInvite = ()=>{

  }

  useEffect(()=>{
    fetchFriends();
  },[])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" className={'absolute cursor-pointer lg:py-5'} onClick={() => navigate('/teams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
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
                  <AvatarImage src={teamData.avatar} alt="Team Avatar" />
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
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="friends" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="friends" className={'cursor-pointer'}>
                  <User className="h-4 w-4 mr-2" />
                  Friends
                </TabsTrigger>
                {/* <TabsTrigger value="email" className={'cursor-pointer'}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger> */}
              </TabsList>

              <TabsContent value="friends" className="space-y-2">
                {friends.length === 0 ?
                <div className="text-center mt-1">
                  <h1 className="text-sm">No Friends Found</h1>
                </div> : friends.filter((friend) => !selectedMembers.find((c) => c._id === friend._id))
                  .map((friend) => {

                    const {firstName, lastName, email, imageUrl, createdAt, _id:id} = friend
                    const name = `${firstName} ${lastName}`;
                    const initials = firstName[0]+lastName[0];

                    return(
                    <div key={id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={imageUrl} />
                          <AvatarFallback className="text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">{email}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleMemberToggle(friend)} className={'cursor-pointer'}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  )})}
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
                  onClick={handleEmailInvite}
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
                  console.log(member)
                  const {firstName, lastName, email, imageUrl, createdAt, _id:id, role} = member
                  const name = `${firstName} ${lastName}`;
                  const initials = firstName[0]+lastName[0];
                  return (
                    <div key={id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={imageUrl} alt={name} />
                          <AvatarFallback>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{name}</h4>
                          <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={role} onValueChange={(role) => updateMemberRole(id, role)}>
                          <SelectTrigger className="w-32 cursor-pointer">
                            <SelectValue>
                              <div className="flex items-center gap-2">
                                <RoleIcon className="h-4 w-4" />
                                <span className="text-sm">
                                  {roleOptions.find((r) => r.value === role)?.label}
                                </span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value} className={'cursor-pointer'}>
                                <div className="flex items-center gap-2">
                                  <role.icon className="h-4 w-4" />
                                  <div className="font-medium">{role.label}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => removeMember(id)} className={'cursor-pointer'}>
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
                <div className="text-2xl font-bold">{selectedMembers.length+1}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Owner</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{selectedMembers.filter((m) => m.role === "admin").length}</div>
                <div className="text-sm text-muted-foreground">Admin</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={()=>navigate('/teams')} className={'cursor-pointer'}>
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