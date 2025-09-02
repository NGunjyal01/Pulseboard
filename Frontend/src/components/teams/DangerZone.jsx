import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, UserMinus } from "lucide-react"
import { useTeamsStore } from "@/store/useTeamsStore"

const DangerZone = ({ onDeleteTeam, onLeaveTeam }) => {

    const {teamDetails} = useTeamsStore();
    const isAdmin = teamDetails.role!=='member';

    return (
    <Card className="border-destructive">
        <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>{isAdmin ? "Permanently delete this team" : "Leave this team"}</CardDescription>
        </CardHeader>
        <CardContent>
        {isAdmin ? (
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Team
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Delete Team</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete "{teamDetails.name}"? This action cannot be undone and will remove
                    all team data, dashboards, and member access.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={onDeleteTeam}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    Delete Team
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        ) : (
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                <UserMinus className="h-4 w-4 mr-2" />
                Leave Team
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Leave Team</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to leave "{teamDetails.name}"? You'll lose access to team dashboards and need
                    to be re-invited to rejoin.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={onLeaveTeam}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    Leave Team
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        )}
        </CardContent>
    </Card>
    )
}

export default DangerZone;