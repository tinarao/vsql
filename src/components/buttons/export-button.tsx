"use client"

import { useUnit } from "effector-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { $currentProjectId } from "@/lib/store/currentProjectId";
import { useEffect, useState } from "react";

export function ExportButton() {
    const [isClient, setIsClient] = useState(false);
    const currentProjectId = useUnit($currentProjectId);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <Button disabled>Экспорт</Button>;
    }

    return (
        <Button asChild>
            <Link href={currentProjectId ? `/${currentProjectId}/export` : "/"}>
                Экспорт
            </Link>
        </Button>
    );
}
