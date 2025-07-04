import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";

const TopNavbar = () => {
    const [notifications] = useState(3);
    const isMobile = useIsMobile();

    return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section: Sidebar + Search */}
        <div className="flex items-center gap-5">
            <SidebarTrigger className="hover:bg-primary/10 rounded-md" />

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
                className="rounded-full hover:bg-primary/10"
                >
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                    </AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-2 p-3">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground truncate">
                    john@pulseboard.com
                    </p>
                </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-primary/10">
                <User className="mr-2 h-4 w-4" />
                Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10">
                <Settings className="mr-2 h-4 w-4" />
                Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
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