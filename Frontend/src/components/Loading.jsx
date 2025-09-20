import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils" 
import { useThemeStore } from "@/store/useThemeStore"

const Loading = () => {
    const { mode } = useThemeStore()

    return (
    <div
        className={cn(
        "fixed inset-0 flex items-center justify-center transition-colors",
        mode === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
        )}
    >
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
        >
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg font-medium">Loading, please wait...</p>
        </motion.div>
    </div>
    )
    }

export default Loading
