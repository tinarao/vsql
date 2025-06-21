"use client";

import { $currentProject, renameProject } from "@/lib/store/projects";
import { useUnit } from "effector-react";
import { Button } from "./ui/button";
import { TableConfig } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CurrentProjectName() {
  const currentProject = useUnit($currentProject);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [newName, setNewName] = useState(currentProject?.name ?? "");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleRename() {
    if (!currentProject) {
      router.replace("/");
      return;
    }
    const updated = { ...currentProject, name: newName };
    renameProject(updated);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TableConfig />
          {currentProject?.name || "Проект не выбран"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Переименовать проект</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Новое имя</Label>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleRename}>Сменить название</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
