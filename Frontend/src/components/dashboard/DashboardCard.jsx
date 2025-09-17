import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Copy, Trash2, BarChart3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { data, useNavigate } from "react-router";
import useCreateDashboardStore from "@/store/useCreateDashboardStore";

const DashboardCard = ({ dashboard }) => {

    const { deleteDashboard } = useCreateDashboardStore();
    const { setStep, setDashboardData, setDashboardId } = useCreateDashboardStore();
    const {_id:id, title, description, updatedAt, createdBy, createdAt , collaborators, isPublic = true, status, creationProgress, charts, dataSource } = dashboard;
    const {imageUrl,firstName,lastName} = createdBy;
    const name = `${firstName} ${lastName}`
    const initials = firstName[0]+lastName[0];
    const navigate = useNavigate();

    const handleOnClick = ()=>{
        if(status==='draft'){
            navigate(`/createDashboard`);
            setDashboardId(id);
            if(creationProgress.step1){
                setStep(2);
                setDashboardData({title,description,collaborators})
            }
            if(creationProgress.step2){
                setStep(3);
                if(dataSource.type==='csv'){
                    const {fileName,parsedData} = dataSource.csvConfig;
                    setDashboardData({dataSource:'csv',csvFileName:fileName,parsedData,dataFields:dataSource.dataFields});
                } else if(dataSource.type==='simulated') {
                    console.log(dataSource.simulatedConfig.sampleData)
                    setDashboardData({dataSource:'simulated',parsedData:dataSource.simulatedConfig.sampleData,dataFields:dataSource.dataFields})
                } else {
                    setDashboardData({dataSource:'api'})
                }
                
            }
        } else {
            navigate(`/dashboard/${id}`);
        }
        console.log('clicked')
    }

    const handleDelete = ()=>{
        deleteDashboard(id)
    }

    return (
    <Card onClick={handleOnClick} className="cursor-pointer group relative overflow-hidden hover:shadow-xl hover:scale-[102%] ease-in-out transition-transform duration-300">
        <CardHeader className="relative pb-2 z-10">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="font-semibold text-lg transition-colors">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-muted-foreground mt-1">
                                This is the description sdfsdfsdf sdfsdfdfgdfgios sihoiajrwo3wqr eirdghnoaesirnwer erigo
                            </p>
                        )}
                    </div>
                </div>
                {/* Dropdown menu on hover */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="cursor-pointer opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect">
                        <DropdownMenuItem className="cursor-pointer" onClick={(e)=>{e.stopPropagation(); handleOnClick()}}>
                            <Eye className="mr-2 h-4 w-4" />
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={(e)=>e.stopPropagation()}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer" onClick={(e)=>{e.stopPropagation(); handleDelete();}}>
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
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={imageUrl} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{name}</span>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                    {status==='draft' &&(
                        <Badge variant='secondary' className={'text-xs'}>
                            Draft
                        </Badge>
                    )}
                    {isPublic && (
                        <Badge variant="secondary" className="text-xs">
                        Public
                        </Badge>
                    )}
                    {collaborators.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                            +{collaborators.length-1} others
                        </Badge>
                    )}
                    {charts.length>0 && (
                        <Badge variant="outline" className="text-xs">
                            <BarChart3/>
                            {charts.length}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                <p className="text-xs text-muted-foreground mt-3">
                    Created at {new Date(createdAt).toLocaleDateString('en-US')}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                    Modified {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
                </p>
            </div>
        </CardContent>
    </Card>
    );
}

export default DashboardCard;