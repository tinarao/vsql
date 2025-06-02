"use client"

import { useCallback } from "react";
import { Button } from "../ui/button";
import { saveToLocalStorage } from "@/lib/store";
import { Save } from "lucide-react";

export function Header() {
    const handleSave = useCallback(() => {
        saveToLocalStorage();
    }, []);

    return (
        <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
            <p>
                <span className="text-primary">v</span>sql
            </p>
            <div>
                <Button onClick={handleSave}>
                    <Save /> Сохранить
                </Button>
            </div>
        </header>
    )
}
