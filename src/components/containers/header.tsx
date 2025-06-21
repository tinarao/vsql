import { List } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CurrentProjectName } from "../CurrentProjectName";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-8 py-4 text-xl">
      <Link href="/">
        <span className="text-primary">v</span>sql
      </Link>
      <div className="flex items-center gap-x-2">
        <CurrentProjectName />
        <Button asChild variant="outline">
          <Link href="/">
            <List />К проектам
          </Link>
        </Button>
      </div>
    </header>
  );
}
