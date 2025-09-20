import { useEffect } from "react";
import { io } from "socket.io-client";
import useDashboardStore from "@/store/useDashboardStore";
import useAuthStore from "@/store/useAuthStore";

let socket;

export const useDashboardSocket = (dashboardId) => {

    const { user } = useAuthStore();
    const { addComment, addAnnotation } = useDashboardStore();

    useEffect(() => {
        if (!socket) {
            socket = io(process.env.NEXT_PUBLIC_BASE_URL);
        }

        socket.emit("join_dashboard", dashboardId);

        // Listen for updates
        socket.on("new_comment", (comment) => {console.log('comment from backend',comment);addComment(comment)});
        socket.on("new_annotation", (annotation) => addAnnotation(annotation));

        return () => {
            socket.off("new_comment");
            socket.off("new_annotation");
        };
    }, [dashboardId]);

    // API for sending data
    const sendComment = (commentText,chartId) => {
        const comment = { user:user._id,text:commentText,chartId}
        socket.emit("new_comment", {dashboardId,comment});
    };

    const sendAnnotation = (annotation) => {
        const newAnnotation = {...annotation,user:user._id}
        socket.emit("new_annotation", { dashboardId, annotation:newAnnotation });
    };

    return { sendComment, sendAnnotation };
};
