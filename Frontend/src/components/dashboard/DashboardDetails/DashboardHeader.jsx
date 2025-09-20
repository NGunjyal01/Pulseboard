import { ArrowLeft, Download, Share2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ThemeToggle from "@/components/ThemeToggle"
import ChartTypeDropdown from "./ChartTypeDropdown"
import { useNavigate } from "react-router"
import useDashboardStore from "@/store/useDashboardStore"

export const collaborators = [
  { id: 1, name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", isOnline: true },
  { id: 2, name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", isOnline: true },
  { id: 3, name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32", isOnline: false },
]

const DashboardHeader = () => {
    const { dashboardDetails } = useDashboardStore();
    const {title} = dashboardDetails;
    const navigate = useNavigate();
    return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="flex h-16 items-center px-6">
        <Button size="sm" onClick={() => navigate("/dashboards")} className={'cursor-pointer lg:py-5'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
        </Button>

        <div className="flex-1 flex items-center justify-center">
            <h1 className="text-lg font-semibold cursor-pointer uppercase">
                {title}
            </h1>
        
        </div>

        <div className="flex items-center gap-4">
            {/* Online Collaborators */}
            <div className="flex items-center -space-x-2">
            {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                    <AvatarFallback>
                    {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                </Avatar>
                {collaborator.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
                )}
                </div>
            ))}
            </div>

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PNG</DropdownMenuItem>
                <DropdownMenuItem>Export as JSON</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
            </Button>

            <ChartTypeDropdown />

            <ThemeToggle />

            <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            </Button>
        </div>
        </div>
    </header>
    )
}

export default DashboardHeader