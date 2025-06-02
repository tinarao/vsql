import { SaveButton } from "../buttons/save-button";

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
            <p>
                <span className="text-primary">v</span>sql
            </p>
            <div>
                <SaveButton />
            </div>
        </header>
    )
}
