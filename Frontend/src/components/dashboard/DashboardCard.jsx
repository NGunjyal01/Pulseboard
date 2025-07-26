import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Copy, Trash2, BarChart3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const DashboardCard = ({
  title,
  description,
  updatedAt,
  createdBy,
  collaborators = 0,
  isPublic = false,
  onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
    <Card
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer group relative overflow-hidden hover:shadow-xl hover:scale-[102%] ease-in-out transition-transform duration-300"
    >
        <CardHeader className="relative pb-2 z-10">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/40 to-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
                <h3 className="font-semibold text-lg transition-colors">
                {title}
                </h3>
                {description && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
                )}
            </div>
            </div>

            {/* Dropdown menu on hover */}
            <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                >
                <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect">
                <DropdownMenuItem className="hover:bg-primary/10">
                <Eye className="mr-2 h-4 w-4" />
                Open
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </CardHeader>

        <CardContent className="relative z-10">
        <div className="flex items-center justify-between">
            {/* Owner info */}
            <div className="flex items-center gap-2">
            {/* <Avatar className="w-6 h-6">
                <AvatarImage src={createdBy.avatar} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {createdBy.initials}
                </AvatarFallback>
            </Avatar> */}
            <span className="text-sm text-muted-foreground">{createdBy.firstName}</span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
            {isPublic && (
                <Badge variant="secondary" className="text-xs">
                Public
                </Badge>
            )}
            {collaborators > 0 && (
                <Badge variant="outline" className="text-xs">
                +{collaborators} others
                </Badge>
            )}
            </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
            Modified {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        </p>
        </CardContent>
    </Card>
    );
}

export default DashboardCard;