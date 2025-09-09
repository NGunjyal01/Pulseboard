import { StickyNote, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

const AnnotationsTab = () => {
    return (
    <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">Revenue Chart Note</span>
            <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
        <p className="text-sm text-muted-foreground">
            Great growth trajectory! Let's maintain this momentum.
        </p>
        </div>

        <Button variant="outline" className="w-full">
        <StickyNote className="h-4 w-4 mr-2" />
        Add Annotation
        </Button>
    </div>
    )
}

export default AnnotationsTab