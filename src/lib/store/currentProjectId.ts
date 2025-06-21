import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local"

export const $currentProjectId = createStore<string | null>(null);

export const setCurrentProjectId = createEvent<string>();

$currentProjectId
    .on(setCurrentProjectId, (_prev, newId) => newId)

type Serialized = {
    uuid: string | null
}

if (typeof window !== 'undefined') {
    persist({
        store: $currentProjectId,
        key: "latest",
        serialize: (value) => {
            return JSON.stringify({
                uuid: value 
            })
        },
        deserialize: (value) => {
            try {
                const data = JSON.parse(value) as Serialized
                return data.uuid
            } catch {   
                return null
            }
        }
    })
}