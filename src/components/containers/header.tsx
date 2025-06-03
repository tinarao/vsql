import { List } from "lucide-react";
import { SaveButton } from "../buttons/save-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { CurrentProjectName } from "../CurrentProjectName";

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
            <div className="flex items-center gap-x-6">
                <p>
                    <span className="text-primary">v</span>sql
                </p>
                <CurrentProjectName />
            </div>
            <div className="space-x-2">
                <Button asChild variant="outline">
                    <Link href="/">
                        <List />
                        К проектам
                    </Link>
                </Button>
                <SaveButton />
            </div>
        </header>
    )
}
