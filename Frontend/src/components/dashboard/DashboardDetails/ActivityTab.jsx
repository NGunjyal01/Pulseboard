const ActivityTab = () => {
    return (
    <div className="space-y-4">
        <div className="flex gap-3">
        <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
        <div>
            <p className="text-sm">
            <strong>Sarah Chen</strong> added a comment
            </p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
        </div>
        </div>

        <div className="flex gap-3">
        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
        <div>
            <p className="text-sm">
            <strong>Mike Johnson</strong> updated the Revenue chart
            </p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
        </div>
        </div>

        <div className="flex gap-3">
        <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
        <div>
            <p className="text-sm">
            <strong>Alex Rivera</strong> joined the dashboard
            </p>
            <p className="text-xs text-muted-foreground">1 day ago</p>
        </div>
        </div>
    </div>
    )
}

export default ActivityTab