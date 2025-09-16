import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/DashboardDetails/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardDetails/DashboardSidebar"
import ChartGrid from "@/components/dashboard/DashboardDetails/CharGrid"
import { useParams } from "react-router"
import useDashboardStore from "@/store/useDashboardStore"

export const mockCollaborators = [
  { id: 1, name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", isOnline: true },
  { id: 2, name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", isOnline: true },
  { id: 3, name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32", isOnline: false },
]


const DashboardDetails = () => {
  const { dashboardId } = useParams();
  const { fetchDashboardDetails,loading,fetched,resetDashboardDetails } = useDashboardStore();
  const [dashboardTitle, setDashboardTitle] = useState("Sales Performance Q4")
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("comments")

  const handleTitleSave = () => {
    setIsEditing(false)
    // Save title logic here
  }

  useEffect(() => {
    if (dashboardId) {
      fetchDashboardDetails(dashboardId); // always fetch when visiting page
    }
    return(()=>resetDashboardDetails())
  }, [dashboardId]);
    if(loading&&!fetched)    return<div>Loading</div>

    return (
    <div className="min-h-screen bg-background text-foreground">
        <DashboardHeader
        dashboardTitle={dashboardTitle}
        isEditing={isEditing}
        onTitleChange={setDashboardTitle}
        onTitleSave={handleTitleSave}
        onEditToggle={() => setIsEditing(!isEditing)}
        collaborators={mockCollaborators}
        />
        
        <div className="flex">
        <div className="flex-1 p-6">
            <ChartGrid />
        </div>  
        
        <DashboardSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
        />
        </div>
    </div>
    )
}

export default DashboardDetails
