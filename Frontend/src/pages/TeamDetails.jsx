import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Save, X } from "lucide-react"
import TeamInfoCard from "@/components/teams/TeamInfoCard"
import MembersManagement from "@/components/teams/MembersManagement"
import DangerZone from "@/components/teams/DangerZone"
import InviteDialog from "@/components/teams/InviteDialog"
import { useNavigate, useParams } from "react-router"
import { useTeamsStore } from "@/store/useTeamsStore"
import useAuthStore from "@/store/useAuthStore"
import { toast } from "sonner"

const roleOptions = [
  { value: "admin", label: "Admin", icon: "Crown", color: "text-yellow-600" },
  { value: "editor", label: "Editor", icon: "Shield", color: "text-blue-600" },
  { value: "viewer", label: "Viewer", icon: "Eye", color: "text-gray-600" },
]

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { teamDetails, fetchTeamDetails, loading, updateMemberRole, removeMember } = useTeamsStore();
  const { user: currentUser } = useAuthStore();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [pendingRoleUpdates, setPendingRoleUpdates] = useState({});
  const [pendingRemovals, setPendingRemovals] = useState(new Set());

  const handleUpdateMemberRole = (memberId, newRole) => {
    // Check if user is trying to change their own role to a lower one
    if (memberId === currentUser._id) {
      const currentRole = teamDetails.members.find(m => m.user._id === memberId)?.role;
      
      // Prevent admin from demoting themselves to member
      if (currentRole === 'admin' && newRole === 'member') {
        toast.error("You cannot change your own role to a lower permission level");
        return;
      }
      
      // Prevent owner from changing their own role (there must always be at least one owner)
      if (currentRole === 'owner') {
        toast.error("Team must have at least one owner. Transfer ownership first.");
        return;
      }
    }
    
    setPendingRoleUpdates(prev => ({
      ...prev,
      [memberId]: newRole
    }));
  };

  const handleRemoveMember = (memberId) => {
    // Add to pending removals
    setPendingRemovals(prev => new Set(prev).add(memberId));
    
    // Remove from pending role updates if exists
    setPendingRoleUpdates(prev => {
      const newUpdates = { ...prev };
      delete newUpdates[memberId];
      return newUpdates;
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Process role updates
      for (const [memberId, newRole] of Object.entries(pendingRoleUpdates)) {
        await updateMemberRole(teamDetails._id, memberId, newRole);
      }
      
      // Process member removals
      for (const memberId of pendingRemovals) {
        await removeMember(teamDetails._id, memberId);
      }
      
      // Clear pending changes
      setPendingRoleUpdates({});
      setPendingRemovals(new Set());
      
      // Refresh team details
      await fetchTeamDetails(teamId);
      
      setIsEditMode(false);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Failed to save changes:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Reset pending changes
    setPendingRoleUpdates({});
    setPendingRemovals(new Set());
  };

  const handleDeleteTeam = () => {
    // Delete team logic
    navigate("/teams");
  };

  const handleLeaveTeam = () => {
    // Leave team logic
    navigate("/teams");
  };

  useEffect(() => {
    fetchTeamDetails(teamId);
  }, [teamId]);

  if (loading || !teamDetails) return <div>Loading...</div>;

  const isAdmin = teamDetails.role !== 'member';
  const isOwner = teamDetails.role === 'owner';
  const hasPendingChanges = Object.keys(pendingRoleUpdates).length > 0 || pendingRemovals.size > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" onClick={() => navigate("/teams")} className={'cursor-pointer absolute lg:py-5'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">{teamDetails.name}</h1>
          </div>
          <div className="flex gap-2 absolute right-[2%]">
            {!isEditMode && (
              <>
                {isAdmin && (
                  <>
                    <InviteDialog 
                      isOpen={isInviteDialogOpen} 
                      onOpenChange={setIsInviteDialogOpen}
                    />
                    <Button variant="outline" onClick={() => setIsEditMode(true)} className={'cursor-pointer'}>
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
                <Button onClick={handleSaveChanges} disabled={!hasPendingChanges}>
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
          <TeamInfoCard />
          
          <MembersManagement 
            isEditMode={isEditMode} 
            onUpdateMemberRole={handleUpdateMemberRole}
            onRemoveMember={handleRemoveMember}
            pendingRoleUpdates={pendingRoleUpdates}
            pendingRemovals={pendingRemovals}
          />
          
          {!isEditMode && (
            <DangerZone 
              onDeleteTeam={handleDeleteTeam}
              onLeaveTeam={handleLeaveTeam}
              isOwner={isOwner}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;