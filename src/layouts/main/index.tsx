"use client"
import Navbar from "@/components/UI/navbar/Navbar";
import Sidebar from "@/components/UI/sidebar/Sidebar";
import { FC, useState } from "react";

interface Props {
    children: React.ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    return (

        <div id="root" className="h-screen w-full relative">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex hNav w-full">
                <Sidebar {...{ sidebarOpen, setSidebarOpen }} />
                {children}
            </main>
        </div>
    )
}

export default MainLayout;