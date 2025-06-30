import { useState } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router";

// Mock data
const mockDashboards = [
    {
    id: "1",
    title: "Sales Analytics Q4",
    description: "Revenue metrics and sales performance tracking",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2),
    owner: { name: "Sarah Chen", initials: "SC" },
    collaborators: 3,
    isPublic: false,
    },
    {
    id: "2",
    title: "Product Usage Dashboard",
    description: "User engagement and feature adoption metrics",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    owner: { name: "Mike Johnson", initials: "MJ" },
    collaborators: 5,
    isPublic: true,
    },
    {
    id: "3",
    title: "Marketing Campaign ROI",
    description: "Campaign performance and conversion tracking",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    owner: { name: "Emma Davis", initials: "ED" },
    collaborators: 2,
    isPublic: false,
    },
    {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
    {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
        {
    id: "4",
    title: "Operations KPIs",
    description: "Key performance indicators for operational efficiency",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    owner: { name: "Alex Kim", initials: "AK" },
    collaborators: 1,
    isPublic: true,
    },
];

const Dashboards = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDashboards, setFilteredDashboards] = useState(mockDashboards);
    const [viewMode, setViewMode] = useState('grid');
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
        setFilteredDashboards(mockDashboards);
    } else {
        const filtered = mockDashboards.filter((dashboard) =>
        [dashboard.title, dashboard.description, dashboard.owner.name]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setFilteredDashboards(filtered);
    }
    };

    const handleDashboardClick = (id) => {
    console.log("Opening dashboard:", id);
    // TODO: Implement navigation
    };

    return (
    <Layout>
        <div className="space-y-6">
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
                <Button className="gap-2 cursor-pointer" onClick={()=> navigate('/createDashboard')}>
                    <Plus className="w-4 h-4" />
                    Create Dashboard
                </Button>
            </div>}
        </div>

        {/* Search Input */}
        {isMobile && <div className="flex flex-col gap-6">
            <div className="">
                <Button className="gap-2 cursor-pointer" onClick={()=> navigate('/createDashboard')}>
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
            <Button className="gap-2">
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
                <DashboardCard
                key={dashboard.id}
                {...dashboard}
                onClick={() => handleDashboardClick(dashboard.id)}
                />
            ))}
            </div>
        )}
        </div>
    </Layout>
    );
}

export default Dashboards