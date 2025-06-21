import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Проект не найден. Учтите, что все данные сохраняются локально.</p>
      <Button asChild>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
