import { List, TableConfig } from "lucide-react";
import { SaveButton } from "../buttons/save-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { CurrentProjectName } from "../CurrentProjectName";
import { TableHead } from "../ui/table";

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
            <div className="flex items-center gap-x-6">
                <Link href="/">
                    <span className="text-primary">v</span>sql
                </Link>
            </div>
            <div className="flex items-center gap-x-2">
                <Button variant="outline" className="hover:bg-background" asChild>
                    <span>
                        <TableConfig />
                        <CurrentProjectName />
                    </span>
                </Button>
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
