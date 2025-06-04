import {
    Dialog,
    DialogContent,
    DialogDescription,
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>SQL-Миграция</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <ExportCode />
            </DialogContent>
        </Dialog>
    )
}
