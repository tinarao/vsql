"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { $projects, appendProject, saveToLocalStorage } from "@/lib/store/projects";
import { createProject } from "@/lib/sql/fabrics/projects";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export function CreateProjectModal({ children }: React.PropsWithChildren) {
    const router = useRouter()
    const [newProjectName, setNewProjectName] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    function handleCreateNewProject() {
        setIsCreating(true)
        const project = createProject(newProjectName || "Проект " + $projects.getState().length);
        appendProject(project);
        saveToLocalStorage()

        setIsCreating(false)
        router.replace(project.uuid)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Создание нового проекта</DialogTitle>
                    <DialogDescription>
                        Введите название для вашего нового проекта
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label>Название</Label>
                    <Input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button disabled={isCreating} onClick={handleCreateNewProject}>
                        {isCreating ? <LoaderCircle className="animate-spin" /> : <Plus />}
                        Создать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
