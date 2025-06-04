import { createEvent, createStore } from "effector";
import { Project, Table } from "../types/sql";
import { $currentProjectId } from "./currentProjectId";

const LOCAL_STORAGE_KEY = "projects";

export const $projects = createStore<Project[]>([]);

export const $currentProject = $projects.map((projects) => {
    const currentProjectId = $currentProjectId.getState();
    return projects.find((p) => p.uuid === currentProjectId) || null;
});

export const getCurrentProjectIndex = createEvent();
export const setProjects = createEvent<Project[]>();
export const appendProject = createEvent<Project>();
export const appendTable = createEvent<Table>();
export const removeTable = createEvent<string>(); // string param is uuid
export const updateTable = createEvent<Table>();
export const setTables = createEvent<Table[]>();

$projects
    .on(setProjects, (_projects, newProjects) => [...newProjects])
    .on(appendProject, (projects, project) => [...projects, project])
    .on(appendTable, (projects, table) => {
        const currentProjectId = $currentProjectId.getState();
        if (!currentProjectId) return projects;

        return projects.map((project) =>
            project.uuid === currentProjectId
                ? { ...project, tables: [...project.tables, table] }
                : project,
        );
    })
    .on(removeTable, (projects, idToRemove) =>
        projects.map(p => p.uuid === $currentProjectId.getState() ? {
            ...p,
            tables: p.tables.filter(t => t.uuid !== idToRemove)
        } : p))
    .on(updateTable, (projects, updatedTable) => {
        const currentProjectId = $currentProjectId.getState();
        if (!currentProjectId) return projects;

        return projects.map((project) =>
            project.uuid === currentProjectId
                ? {
                    ...project,
                    tables: project.tables.map((table) =>
                        table.uuid === updatedTable.uuid ? updatedTable : table,
                    ),
                }
                : project,
        );
    })
    .on(setTables, (projects, savedTables) => {
        const currentProjectId = $currentProjectId.getState();
        if (!currentProjectId) return projects;

        return projects.map((project) =>
            project.uuid === currentProjectId
                ? { ...project, tables: savedTables }
                : project,
        );
    });

export const loadFromLocalStorage = () => {
    if (typeof window === 'undefined') return;

    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) {
            console.warn("No saved data found");
            setProjects([]);
            return;
        }

        console.time("Loading saved data");
        const data = JSON.parse(raw) as Project[];

        if (!Array.isArray(data)) {
            throw new Error("Invalid data structure: expected array");
        }

        const validData = data.filter(project => {
            if (!project || typeof project !== 'object') return false;
            if (!project.uuid || typeof project.uuid !== 'string') return false;
            if (!Array.isArray(project.tables)) return false;
            return true;
        });

        setProjects(validData);
        console.timeEnd("Loading saved data");
    } catch (error) {
        console.error("Error loading data:", error);
        setProjects([]);
    }
};

export const saveToLocalStorage = async () => {
    if (typeof window === 'undefined') return;

    try {
        const data = $projects.getState();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data:", error);
    }
};
