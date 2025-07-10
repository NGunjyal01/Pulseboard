import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User, Building, Loader2 } from 'lucide-react';
import CollaboratorItem from './CollaboratorItem';
import { mockFriends, mockTeams } from './constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useDashboardStore from '@/store/useDashboardStore';
import { updateStep1BasicInfo } from '@/services/dashboardAPI';
import { toast } from 'sonner';

const Step1BasicInfo = ({ onCancel }) => {
  const {dashboardData,dashboardId,setDashboardData,step,setStep} = useDashboardStore();
  const [isLoading,setIsLoading] = useState(false);
  const addCollaborator = (item) => {
    if (!dashboardData.collaborators.find(c => c.id === item.id)) {
      setDashboardData({
        collaborators: [...dashboardData.collaborators, { ...item, role: "viewer" }],
      });
    }
  };

  const removeCollaborator = (id) => {
    setDashboardData({
      collaborators: dashboardData.collaborators.filter(c => c.id !== id),
    });
  };

  const updateCollaboratorRole = (id, role) => {
    setDashboardData({
      collaborators: dashboardData.collaborators.map(c =>
        c.id === id ? { ...c, role } : c
      ),
    });
  };

  const handleNext = async() => {
    setIsLoading(true);
    try{
      const updatedFields = {};
      const {title,description,collaborators} = dashboardData;
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
      if (collaborators) updatedFields.collaborators = collaborators;
      console.log(dashboardId,updatedFields)
      const result = await updateStep1BasicInfo(dashboardId,updatedFields);
      console.log(result);
      step < 3 && setStep(step + 1);
    }catch(error){
      // toast.error("Error while step1");
    }finally{
      setIsLoading(false);
    }
  }

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
                  key={collaborator.id}
                  collaborator={collaborator}
                  onRoleChange={updateCollaboratorRole}
                  onRemove={removeCollaborator}
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
                {mockFriends
                  .filter(friend => !dashboardData.collaborators.find(c => c.id === friend.id))
                  .map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {friend.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{friend.name}</p>
                          <p className="text-xs text-muted-foreground">{friend.email}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(friend)} className={"cursor-pointer"}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="teams" className="space-y-2">
                {mockTeams
                  .filter(team => !dashboardData.collaborators.find(c => c.id === team.id))
                  .map(team => (
                    <div key={team.id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={team.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            <Building className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{team.name}</p>
                          <p className="text-xs text-muted-foreground">{team.members} members</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(team)} className={"cursor-pointer"}>
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
          <Button variant="outline" onClick={onCancel} className={"cursor-pointer"}>
            Cancel
          </Button>
          <Button onClick={handleNext} disabled={!dashboardData.title.trim() || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Processing..." : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default Step1BasicInfo;