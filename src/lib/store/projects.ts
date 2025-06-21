import { createEvent, createStore } from "effector";
import { Project, Table, Relation } from "../types/sql";
import { $currentProjectId } from "./currentProjectId";
import { persist } from "effector-storage/local";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "projects";

export const $projects = createStore<Project[]>([]);

export const $currentProject = $projects.map((projects) => {
  const currentProjectId = $currentProjectId.getState();
  return projects.find((p) => p.uuid === currentProjectId) || null;
});

export const setProjects = createEvent<Project[]>();
export const renameProject = createEvent<Project>();

export const appendProject = createEvent<Project>();
export const appendTable = createEvent<Table>();
export const removeTable = createEvent<string>(); // string param is uuid
export const updateTable = createEvent<Table>();
export const setTables = createEvent<Table[]>();
export const addRelation = createEvent<Omit<Relation, "uuid">>();
export const removeRelation = createEvent<string>();

$projects
  .on(renameProject, (projects, updated) =>
    projects.map((p) => (p.uuid === updated.uuid ? updated : p)),
  )
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
    projects.map((p) =>
      p.uuid === $currentProjectId.getState()
        ? {
            ...p,
            tables: p.tables.filter((t) => t.uuid !== idToRemove),
          }
        : p,
    ),
  )
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
  })
  .on(addRelation, (projects, relationData) => {
    const currentProjectId = $currentProjectId.getState();
    if (!currentProjectId) return projects;

    const relation: Relation = {
      ...relationData,
      uuid: nanoid(128),
    };

    return projects.map((project) =>
      project.uuid === currentProjectId
        ? {
            ...project,
            relations: [...project.relations, relation],
          }
        : project,
    );
  })
  .on(removeRelation, (projects, relationId) => {
    const currentProjectId = $currentProjectId.getState();
    if (!currentProjectId) return projects;

    return projects.map((project) =>
      project.uuid === currentProjectId
        ? {
            ...project,
            relations: project.relations.filter((r) => r.uuid !== relationId),
          }
        : project,
    );
  });

if (typeof window !== "undefined") {
  persist({
    store: $projects,
    key: LOCAL_STORAGE_KEY,
  });
}

