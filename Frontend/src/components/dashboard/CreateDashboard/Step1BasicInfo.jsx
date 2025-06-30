// src/components/dashboard/CreateDashboard/Step1BasicInfo.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User, Building } from 'lucide-react';
import CollaboratorItem from './CollaboratorItem';
import { mockFriends, mockTeams } from './constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Step1BasicInfo = ({ dashboardData, setDashboardData, onNext, onCancel }) => {
  const addCollaborator = (item) => {
    if (!dashboardData.collaborators.find(c => c.id === item.id)) {
      setDashboardData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, { ...item, role: "viewer" }],
      }));
    }
  };

  const removeCollaborator = (id) => {
    setDashboardData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(c => c.id !== id),
    }));
  };

  const updateCollaboratorRole = (id, role) => {
    setDashboardData(prev => ({
      ...prev,
      collaborators: prev.collaborators.map(c => 
        c.id === id ? { ...c, role } : c
      ),
    }));
  };

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
            onChange={e => setDashboardData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of what this dashboard will show..."
            value={dashboardData.description}
            onChange={e => setDashboardData(prev => ({ ...prev, description: e.target.value }))}
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
                <TabsTrigger value="friends">
                  <User className="h-4 w-4 mr-2" />
                  Friends
                </TabsTrigger>
                <TabsTrigger value="teams">
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
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(friend)}>
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
                      <Button size="sm" variant="outline" onClick={() => addCollaborator(team)}>
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
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onNext} disabled={!dashboardData.title.trim()}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default Step1BasicInfo;