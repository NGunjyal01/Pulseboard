import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Mail, Users } from "lucide-react"
import FriendsTab from "@/components/friends/FriendsTab"
import IncomingRequestTab from "@/components/friends/IncomingRequestTab"
import OutgoingRequestTab from "@/components/friends/OutgoingRequestTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Friends = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" onClick={()=>navigate('/dashboards')} className={"absolute lg:py-5 cursor-pointer"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboards
          </Button>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Friends</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Friends & Connections</h1>
            <p className="text-muted-foreground">Manage your network and friend requests</p>
          </div>

          <Tabs defaultValue="friends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends" className={'cursor-pointer'}>
                <Users className="h-4 w-4 mr-2" />
                Friends 
              </TabsTrigger>
              <TabsTrigger value="incoming" className={'cursor-pointer'}>
                <UserPlus className="h-4 w-4 mr-2" />
                Incoming 
              </TabsTrigger>
              <TabsTrigger value="outgoing" className={'cursor-pointer'}>
                <Mail className="h-4 w-4 mr-2" />
                Sent
              </TabsTrigger>
            </TabsList>

            {/* Friends Tab */}
            <TabsContent value="friends">
              <FriendsTab/>
            </TabsContent>

            {/* Incoming Requests Tab */}
            <TabsContent value="incoming">
              <IncomingRequestTab/>
            </TabsContent>

            {/* Outgoing Requests Tab */}
            <TabsContent value="outgoing">
              <OutgoingRequestTab/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Friends
