import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentsTab from "./CommentsTab"
import AnnotationsTab from "./AnnotationsTab"
import ActivityTab from "./ActivityTab"
import { useState } from "react"

const DashboardSidebar = () => {
    const [activeTab, setActiveTab] = useState("comments")

    return (
    <div className="w-80 border-l bg-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments" className={'cursor-pointer'}>
            Comments
            </TabsTrigger>
            <TabsTrigger value="annotations" className={'cursor-pointer'}>
            Notes
            </TabsTrigger>
            <TabsTrigger value="activity" className={'cursor-pointer'}>
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