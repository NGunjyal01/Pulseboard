import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router";
import useDashboardListStore from "@/store/useDashboardListStore";
import { getAllDashboard } from "@/services/dashboardAPI";
import useCreateDashboardStore from "@/store/useCreateDashboardStore";

const Dashboards = () => {
    const {dashboards,setDashboards} = useDashboardListStore();
    const { handleCreateDashboardClick } = useCreateDashboardStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDashboards, setFilteredDashboards] = useState(dashboards);
    const [viewMode, setViewMode] = useState('grid');
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchDashboards = async () => {
        try {
            const data = await getAllDashboard(); // assuming this returns an array
            setDashboards(data.dashboards); // update Zustand store
            setFilteredDashboards(data.dashboards); // update local filtered copy
            } catch (err) {
            console.error("Failed to fetch dashboards:", err);
            }
        };
        console.log('caleed')
        fetchDashboards();
    },[]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const baseList = dashboards;
        if (query.trim() === "") {
            setFilteredDashboards(baseList);
        } else {
            const filtered = baseList.filter((dashboard) =>
            [dashboard.title, dashboard.description, dashboard.owner?.name ?? ""]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
            );
            setFilteredDashboards(filtered);
        }
    };
    const handleDashboardClick = (id) => {
        navigate(`/dashboard/${id}`);
    };

    return (
    <Layout>
        <div className="space-y-6 text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboards</h1>
            <p className="text-sm lg:text-base text-muted-foreground mt-2">
                Manage and view your data dashboards
            </p>
            </div>
            {filteredDashboards.length !== 0 && !isMobile && <div className="flex items-center gap-2">
                <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={'cursor-pointer hover:bg-primary/40 hover:text-primary-foreground'}
                >
                    <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={'cursor-pointer hover:bg-primary/40 hover:text-primary-foreground'}
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button className="gap-2 cursor-pointer" onClick={()=> {handleCreateDashboardClick(); navigate('/createDashboard')}}>
                    <Plus className="w-4 h-4" />
                    Create Dashboard
                </Button>
            </div>}
        </div>

        {/* Search Input */}
        {isMobile && <div className="flex flex-col gap-6">
            <div className="">
                <Button className="gap-2 cursor-pointer" onClick={()=> {handleCreateDashboardClick(); navigate('/createDashboard')}}>
                    <Plus className="w-4 h-4" />
                    Create Dashboard
                </Button>
            </div>
            <div className="relative flex-1 xmax-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Search dashboards..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-muted/50 border border-border focus:bg-background transition"
                />
            </div>
        </div>}


        {/* Empty state or dashboard cards */}
        {filteredDashboards.length === 0 ? (
            <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No dashboards found</h3>
            <p className="text-muted-foreground mb-4">
                {searchQuery
                ? "Try adjusting your search terms"
                : "Create your first dashboard to get started"}
            </p>
            <Button className="gap-2 cursor-pointer" onClick={()=> {handleCreateDashboardClick(); navigate('/createDashboard')}}>
                <Plus className="w-4 h-4" />
                Create Dashboard
            </Button>
            </div>
        ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
            {filteredDashboards.map((dashboard) => (
                <DashboardCard key={dashboard._id} dashboard={dashboard}/>
            ))}
            </div>
        )}
        </div>
    </Layout>
    );
}

export default Dashboards