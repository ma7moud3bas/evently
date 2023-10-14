
import { ComponentProps } from "react";
import Link from "../link";
import { Josefin_Sans } from "next/font/google";
import classNames from "classnames";
import Image from "next/image";
const JosefinFont = Josefin_Sans({ weight: ["400"], subsets: ['latin'] })

export type Props = ComponentProps<"header"> & {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Navbar(props: Props) {
    const { sidebarOpen, setSidebarOpen, ...rest } = props
    return (
        <header className="w-full px-5 py-2 flex justify-between items-center bg-gray-800 border-b border-primary-700"  {...rest}>
            <div className="brand flex justify-between items-center gap-x-12">
                <Link href="/">
                    <span className={classNames("text-2xl text-white", JosefinFont.className)}>Evently</span>
                </Link>
                <Image onClick={() => setSidebarOpen(!sidebarOpen)} className={`cursor-pointer ${sidebarOpen ? "" : "rotate-180"}`} src="/assets/images/chevron-circle-left.svg" width="24" height="24" alt="arrow left"></Image>
            </div>

            <div className="event-type px-4 py-1.5 flex items-center justify-between bg-primary-700 w-[380px] max-md:hidden">
                <div className="flex items-center gap-x-1.5">
                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                        <Image className="h-4 w-4" src="/assets/images/champions-league-logo.jpeg" alt="champions league logo" height="330" width="330" />
                    </div>
                    <span className="text-white font-bold text-[14px] ">
                        Champions’ League 2023
                    </span>
                </div>
                <Image src={"/assets/images/chevron-down.svg"} alt="arrow down" width="20" height="20" />
            </div>
            <div className="right flex gap-x-1.5">
                <div className="flex items-center justify-center p-2.5 bg-primary-700">
                    <Image src={"/assets/images/bell.svg"} alt="notification bell" width="20" height="20" />
                </div>
                <div className="flex items-center justify-center gap-x-2 py-2.5 px-4 bg-primary-700">
                    <Image className="h-5 w-5 rounded-full" src={"/assets/images/user-image.png"} alt="user image" width="200" height="200" />
                    <span className="text-white text-[14px] leading-5">Jane Doe</span>
                    <Image src={"/assets/images/chevron-down.svg"} alt="arrow down" width="20" height="20" />
                </div>
            </div>
        </header>
    )
}
