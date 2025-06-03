import { notFound } from "next/navigation";
import { ProjectPageClient } from "@/components/ProjectPageClient";

interface ProjectPageProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { projectId } = await params;

    if (!projectId) {
        notFound();
    }

    return <ProjectPageClient projectId={projectId} />;
}
