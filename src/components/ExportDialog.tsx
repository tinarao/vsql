import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PropsWithChildren } from "react"
import { ExportCode } from "./ExportSqlCode"

export function ExportSqlDialog({ children }: PropsWithChildren) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="min-w-[50rem]">
                <DialogHeader>
                    <DialogTitle>SQL-Миграция</DialogTitle>
                </DialogHeader>
                <ExportCode />
            </DialogContent>
        </Dialog>
    )
}
