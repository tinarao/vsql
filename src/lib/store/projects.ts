import { createEvent, createStore } from "effector";
import { Project, Table } from "../types/sql";

const LOCAL_STORAGE_KEY = "projects";

export const $projects = createStore<Project[]>([]);
export const $currentProjectId = createStore<string | null>(null);

export const appendProject = createEvent<Project>();
export const setCurrentProjectId = createEvent<string>();
export const getCurrentProjectIndex = createEvent();
export const setProjects = createEvent<Project[]>();

export const setTables = createEvent<Table[]>();
export const appendTable = createEvent<Table>();
export const updateTable = createEvent<Table>();

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

$currentProjectId.on(setCurrentProjectId, (_prev, newId) => newId);

export const loadFromLocalStorage = () => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    console.warn("No saved data found");
    setProjects([]);
    return;
  }

  try {
    console.time("Loading saved data");
    const data = JSON.parse(raw) as Project[];
    setProjects(data);
    console.timeEnd("Loading saved data");
  } catch {
    console.warn("Invalid saved data found. Resetting.");
    setProjects([]);
  }
};
export const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($projects.getState()));
};
