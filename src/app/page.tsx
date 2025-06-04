"use client";

import { CreateProjectModal } from "@/components/CreateProjectModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    $projects,
    loadFromLocalStorage,
} from "@/lib/store/projects";
import { useUnit } from "effector-react";
import { ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function IndexPage() {
    const projects = useUnit($projects);

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    return (
        <div className="px-8 py-4">
            <div className="flex items-center gap-x-4">
                <h1>Всего: {projects.length}</h1>
                <CreateProjectModal>
                    <Button variant="outline" className="size-8">
                        <PlusIcon />
                    </Button>
                </CreateProjectModal>
            </div>
            <div className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 py-4">
                {projects.map((project) => (
                    <Card key={project.uuid}>
                        <CardHeader>
                            <CardTitle>
                                {project.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                <li>{project.tables.length} Таблиц</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link href={project.uuid}>
                                    <ArrowRight /> Перейти
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
