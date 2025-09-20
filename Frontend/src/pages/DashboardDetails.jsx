import { useEffect } from "react"
import DashboardHeader from "@/components/dashboard/DashboardDetails/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardDetails/DashboardSidebar"
import ChartGrid from "@/components/dashboard/DashboardDetails/CharGrid"
import { useParams } from "react-router"
import useDashboardStore from "@/store/useDashboardStore"
import Loading from "@/components/Loading"

const DashboardDetails = () => {
  const { dashboardId } = useParams();
  const { fetchDashboardDetails,loading,fetched,resetDashboardDetails } = useDashboardStore();

  useEffect(() => {
    if (dashboardId) {
      fetchDashboardDetails(dashboardId);
    }
    return(()=>resetDashboardDetails())
  }, [dashboardId]);
    if(loading&&!fetched)    return <Loading/>

    return (
    <div className="min-h-screen bg-background text-foreground">
        <DashboardHeader/>
        <div className="flex">
          <ChartGrid />    
          <DashboardSidebar/>
        </div>
    </div>
    )
}

export default DashboardDetails
