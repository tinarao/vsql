"use client";

import { saveToLocalStorage } from "@/lib/store/projects";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";

export function SaveButton() {

    function handleSave() {
        try {
            saveToLocalStorage()
            toast.success("Успешно сохранено!")
        } catch {
            toast.error("При сохранении возникла ошибка.")
        }
    }

    return (
        <Button onClick={handleSave}>
            <Save /> Сохранить
        </Button>
    );
}
