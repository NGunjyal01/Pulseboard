import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User, Building, Loader2 } from 'lucide-react';
import CollaboratorItem from './CollaboratorItem';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useCreateDashboardStore from '@/store/useCreateDashboardStore';
import useFriendsStore from '@/store/useFriendsStore';
import { useTeamsStore } from '@/store/useTeamsStore';
import CancelButton from './CancelButton';

const Step1BasicInfo = () => {

  const { friends,fetchFriends } = useFriendsStore();
  const { teams,fetchTeams } = useTeamsStore();

  const { dashboardData,setDashboardData,addCollaborator,completeStep1:handleNext,loading } = useCreateDashboardStore();

  useEffect(()=>{
    fetchFriends();
    fetchTeams();
  },[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧾 Basic Information</CardTitle>
        <CardDescription>Set up your dashboard details and invite collaborators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Dashboard Title</Label>
          <Input
            id="title"
            placeholder="e.g., Sales Performance Q4"
            value={dashboardData.title}
            onChange={e => setDashboardData({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of what this dashboard will show..."
            value={dashboardData.description}
            onChange={e => setDashboardData({ description: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <Label>Collaborators & Roles</Label>

          {/* Current Collaborators */}
          {dashboardData.collaborators.length > 0 && (
            <div className="space-y-2">
              {dashboardData.collaborators.map(collaborator => (
                <CollaboratorItem
                  key={collaborator.userId || collaborator.teamId}
                  collaborator={collaborator}
                />
              ))}
            </div>
          )}

          {/* Add Collaborators */}
          <div className="border rounded-lg p-4">
            <Tabs defaultValue="friends" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="friends" className={"cursor-pointer"}>
                  <User className="h-4 w-4 mr-2" />
                  Friends
                </TabsTrigger>
                <TabsTrigger value="teams" className={"cursor-pointer"}>
                  <Building className="h-4 w-4 mr-2" />
                  Teams
                </TabsTrigger>
              </TabsList>

              <TabsContent value="friends" className="space-y-2">
                {friends
                  .filter(friend => !dashboardData.collaborators.find(c => c.userId === friend._id))
                  .map(friend => {
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
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(friend,'friend')} className={"cursor-pointer"}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  )
                  })}
              </TabsContent>

              <TabsContent value="teams" className="space-y-2">
                {teams
                  .filter(team => !dashboardData.collaborators.find(c => c.teamId === team._id))
                  .map(team => (
                    <div key={team._id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={team.imageUrl} />
                          <AvatarFallback className="text-xs">
                            <Building className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{team.name}</p>
                          <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(team,'team')} className={"cursor-pointer"}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add Team
                      </Button>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-between">
          <CancelButton/>
          <Button onClick={handleNext} disabled={!dashboardData.title.trim() || loading} className={'cursor-pointer'}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Processing..." : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default Step1BasicInfo;