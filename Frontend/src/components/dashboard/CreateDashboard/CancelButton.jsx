import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import useCreateDashboardStore from "@/store/useCreateDashboardStore";
import { Loader2, XCircle, Save, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const CancelButton = ({title}) => {
    const [open, setOpen] = useState(false);

    const { dashboardId,resetDashboardData,deleteDashboard,loading } = useCreateDashboardStore();
    const navigate = useNavigate();

    const handleSaveDraft = () => {
        resetDashboardData();
        navigate('/dashboards');
    };

    const handleDiscard = async () => {
        const result = await deleteDashboard(dashboardId);
        if(result){
            resetDashboardData();
            navigate('/dashboards');
        }
    };


    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={title==='cancel'?"outline":''} className={`cursor-pointer ${title==='dashboard' && 'absolute lg:py-5'}`}>
                {title==='cancel'?'Cancel':<><ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard</>}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] text-foreground">
            <DialogHeader>
                <DialogTitle>Save as draft or delete?</DialogTitle>
                <DialogDescription>
                You have an in‑progress dashboard. Choose to save it as a draft so you can come back later,
                or delete it permanently.
                </DialogDescription>
            </DialogHeader>

            <div className="mt-2 rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">
                You can find saved drafts in your Dashboards list (filter: <span className="font-medium text-foreground">Draft</span>).
            </div>

            <DialogFooter className="gap-2 sm:gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)} className="cursor-pointer">
                    Keep editing
                </Button>

                <Button type="button" onClick={handleSaveDraft} disabled={loading} className="cursor-pointer">
                    <Save className="mr-2 h-4 w-4" />
                    Save as draft
                </Button>

                <Button type="button" variant="destructive" onClick={handleDiscard} disabled={loading} className="cursor-pointer">
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}

export default CancelButton;