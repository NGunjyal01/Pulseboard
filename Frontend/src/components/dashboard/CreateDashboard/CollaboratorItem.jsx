// src/components/dashboard/CreateDashboard/CollaboratorItem.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Users, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import useCreateDashboardStore from '@/store/useCreateDashboardStore';

const CollaboratorItem = ({ collaborator }) => {

  const { removeCollaborator,updateCollaboratorRole } = useCreateDashboardStore();

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={collaborator.imageUrl} />
          <AvatarFallback>
            {collaborator.type === "team" ? (
              <Building className="h-4 w-4" />
            ) : (
              collaborator.firstName
            )}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{collaborator.name}</p>
            {collaborator.type === "team" && (
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {collaborator.members} members
              </Badge>
            )}
          </div>
          {collaborator.email && (
            <p className="text-xs text-muted-foreground">{collaborator.email}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={collaborator.role}
          onValueChange={role => updateCollaboratorRole(collaborator, role)}
        >
          <SelectTrigger className="w-24 cursor-pointer" >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer" className={"cursor-pointer"}>Viewer</SelectItem>
            <SelectItem value="editor" className={"cursor-pointer"}>Editor</SelectItem>
            <SelectItem value="admin" className={"cursor-pointer"}>Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={() => removeCollaborator(collaborator)} className={"cursor-pointer"}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CollaboratorItem;