import { List } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CurrentProjectName } from "../CurrentProjectName";

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
            <div className="flex items-center gap-x-6">
                <Link href="/">
                    <span className="text-primary">v</span>sql
                </Link>
            </div>
            <div className="flex items-center gap-x-2">
                <CurrentProjectName />
                <Button asChild variant="outline">
                    <Link href="/">
                        <List />
                        К проектам
                    </Link>
                </Button>
            </div>
        </header>
    )
}
