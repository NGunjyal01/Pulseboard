import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { createDashboard } from "@/services/dashboardAPI";

import {
  LayoutDashboard,
  Plus,
  Settings,
  LogOut,
  BarChart3,
  User,
  Users
} from "lucide-react";

import { Link } from "react-router";

const menuItems = [
    {
        title: "Dashboards",
        url: "/dashboards",
        icon: LayoutDashboard,
    },
    {
        title: "Create Dashboard",
        url: "/createDashboard",
        icon: Plus,
    },
    {
        title: 'Friends',
        url: '/friends',
        icon: User
    },
    {
        title: 'Teams',
        url: '/teams',
        icon: Users  
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

const handleCreateDashboardClick = () => {
    createDashboard();
}

const AppSidebar = () => {
    return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background text-foreground min-w-[64px] sticky top-0 z-20">
        <SidebarHeader className="py-4 px-6 z-10">
            <div className="flex items-center justify-start transition-all duration-300 gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary/40 to-primary rounded-lg flex items-center justify-center shrink-0 relative -left-3">
                <BarChart3 className="size-5 text-white" />
                </div>
                <div className="transition-all overflow-hidden group-data-[collapsed=icon]/sidebar:hidden">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary/40 to-primary bg-clip-text text-transparent">
                    Pulseboard
                </h1>
                <p className="text-xs text-muted-foreground">Data Dashboard</p>
                </div>
            </div>
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup>
                {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
                <SidebarGroupContent>
                <SidebarMenu>
                    {menuItems.map(({ title, url, icon: Icon }) => (
                    <SidebarMenuItem key={title}>
                        <SidebarMenuButton asChild tooltip={title}>
                        <Link
                            to={url}
                            className="flex items-center gap-4 px-3 py-6 rounded-md "
                            onClick={title === "Create Dashboard" ? handleCreateDashboardClick : undefined}
                        >
                            <Icon className="!size-5"/>
                            <span>{title}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
            <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:bg-destructive/10 flex gap-2 items-center">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
    );
}

export default AppSidebar;