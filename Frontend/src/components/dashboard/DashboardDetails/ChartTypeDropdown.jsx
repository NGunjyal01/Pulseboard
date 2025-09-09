import { BarChart3, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ChartTypeDropdown = () => {
    return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm">
        <BarChart3 className="h-4 w-4 mr-2" />
        Chart Type
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuItem>
        <BarChart3 className="h-4 w-4 mr-2" />
        Bar Chart
    </DropdownMenuItem>
    <DropdownMenuItem>
        <LineChart className="h-4 w-4 mr-2" />
        Line Chart
    </DropdownMenuItem>
    <DropdownMenuItem>
        <PieChart className="h-4 w-4 mr-2" />
        Pie Chart
    </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default ChartTypeDropdown