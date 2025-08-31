import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Plus, Building } from "lucide-react";
import { useNavigate } from "react-router";
import MyTeamsTab from "@/components/teams/MyTeamsTab";
import InvitationsTab from "@/components/teams/InvitationsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Teams = ()=> {

  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" onClick={()=>navigate('/dashboards')} className={"absolute lg:py-5 cursor-pointer"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboards
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Teams</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Teams & Collaboration</h1>
            <p className="text-muted-foreground">Manage your teams and team invitations</p>
          </div>

          <Tabs defaultValue="teams" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teams" className={'cursor-pointer'}>
                <Users className="h-4 w-4 mr-2" />
                My Teams 
              </TabsTrigger>
              <TabsTrigger value="invitations" className={'cursor-pointer'}>
                <Building className="h-4 w-4 mr-2" />
                Invitations 
              </TabsTrigger>
            </TabsList>

            {/* My Teams Tab */}
            <TabsContent value="teams">
              <MyTeamsTab/>
            </TabsContent>

            {/* Team Invitations Tab */}
            <TabsContent value="invitations">
              <InvitationsTab/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Teams;