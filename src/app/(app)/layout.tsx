import { Header } from "@/components/containers/header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="grid grid-cols-5 flex-1">
                {children}
            </div>
        </div>

    )
}
