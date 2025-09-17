import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router";

const TopNavbar = () => {
    const {user,logout} = useAuthStore();
    const {firstName, lastName, email, imageUrl} = user;
    const [notifications] = useState(3);
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        logout();
        navigate("/login");
  };


    return (
    <header className="sticky top-0 z-40 bg-background backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section: Sidebar + Search */}
        <div className="flex items-center gap-5">
            <SidebarTrigger className="hover:bg-primary/10 rounded-md cursor-pointer" />

            {!isMobile && (
            <div className="relative w-[30vw] lg:w-[70vw] max-w-[450px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                placeholder="Search dashboards..."
                className="pl-10 bg-muted/50 border border-border focus:bg-background transition"
                />
            </div>
            )}
        </div>

        {/* Right Section: Notifications + Avatar */}
        <div className="flex items-center gap-3">
            <ThemeToggle/>
            <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-primary/10"
            >
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-destructive text-white rounded-full flex items-center justify-center">
                    {notifications}
                </Badge>
            )}
            </Button>

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 cursor-pointer"
                >
                <Avatar className="size-8">
                    <AvatarImage src={imageUrl} alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                    {firstName[0]+lastName[0]}
                    </AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-2 p-3">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium">{firstName + " " +lastName}</p>
                    <p className="text-sm text-muted-foreground truncate">{email}</p>
                </div>
                </div>
                <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate('/settings')}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>
    </header>
    );
}

export default TopNavbar;