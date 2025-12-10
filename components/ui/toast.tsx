import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
    message: string
    type: "success" | "error"
    isVisible: boolean
    onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isVisible, onClose])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-4 right-4 z-50 max-w-md"
                >
                    <div
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm",
                            type === "success"
                                ? "bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800"
                                : "bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-800"
                        )}
                    >
                        {type === "success" ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        )}
                        <p
                            className={cn(
                                "text-sm font-medium flex-1",
                                type === "success"
                                    ? "text-green-900 dark:text-green-100"
                                    : "text-red-900 dark:text-red-100"
                            )}
                        >
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className={cn(
                                "p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
                                type === "success"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                            )}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
