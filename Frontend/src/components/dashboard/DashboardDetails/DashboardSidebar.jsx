import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentsTab from "./CommentsTab"
import AnnotationsTab from "./AnnotationsTab"
import ActivityTab from "./ActivityTab"

const DashboardSidebar = ({ activeTab, onTabChange }) => {
    return (
    <div className="w-80 border-l bg-card">
        <Tabs value={activeTab} onValueChange={onTabChange} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments">
            Comments
            </TabsTrigger>
            <TabsTrigger value="annotations">
            Notes
            </TabsTrigger>
            <TabsTrigger value="activity">
            Activity
            </TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="flex-1 p-4 space-y-4">
            <CommentsTab/>
        </TabsContent>

        <TabsContent value="annotations" className="flex-1 p-4">
            <AnnotationsTab />
        </TabsContent>

        <TabsContent value="activity" className="flex-1 p-4">
            <ActivityTab />
        </TabsContent>
        </Tabs>
    </div>
    )
}

export default DashboardSidebar