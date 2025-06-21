import { Project } from "@/lib/types/sql";
import { nanoid } from "nanoid";

export function createProject(name: string): Project {
    return {
        uuid: nanoid(128),
        name: name,
        tables: [],
        relations: [],
        createdAt: new Date().toISOString(),
    }
}
