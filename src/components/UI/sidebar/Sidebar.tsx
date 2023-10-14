
import Image from "next/image";
import { ComponentProps, Fragment, useState } from "react";
import Link from "../link/Link";
import classNames from "classnames";

export type Props = ComponentProps<"aside"> & {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

type Link = {
    copy: string;
    iconSrc: string;
    iconAlt: string;
    expandable: boolean;
    children: {
        type: "link",
        copy: string,
        link: string,
        active: boolean
    }[];
    link?: string;
    expanded?: boolean;
}
const initialLinks: Link[] = [
    {
        copy: "Home",
        link: "/",
        iconSrc: "/assets/images/home.svg",
        iconAlt: "home",
        expandable: false,
        expanded: false,
        children: []
    },
    {
        copy: "Planning",
        iconSrc: "/assets/images/calender.svg",
        iconAlt: "calender",
        expandable: true,
        expanded: true,
        children: [
            {
                type: "link",
                copy: "Sessions",
                link: "/",
                active: true
            },
            {
                type: "link",
                copy: "Events",
                link: "/events",
                active: false
            },
        ]
    },
    {
        copy: "Attendees",
        iconSrc: "/assets/images/attendees.svg",
        iconAlt: "attendees",
        expandable: true,
        expanded: false,
        children: []
    },
    {
        copy: "Settings",
        iconSrc: "/assets/images/gear.svg",
        iconAlt: "gear",
        expandable: true,
        expanded: false,
        children: []
    },
]

export default function Sidebar(props: Props) {
    const { sidebarOpen, setSidebarOpen, ...rest } = props
    const [links, setLinks] = useState(initialLinks)

    const handleExpand = (index: number) => {
        setLinks(links => {
            return links.map((link, i) => {
                if (i === index) {
                    return {
                        ...link,
                        expanded: !sidebarOpen ? true : !link.expanded
                    }
                }
                return link
            })
        })
        if (!sidebarOpen) setSidebarOpen(true)
    }
    return (
        <aside className={classNames("min-h-full bg-gray-800 pt-5 flex flex-col justify-between max-md:hidden ", rest.className)} {...rest}>
            <div className="px-4">
                {links.map((link, index) => (
                    <Fragment key={index}>
                        <Link href={link.link} onClick={() => handleExpand(index)} className={classNames({ "justify-between": sidebarOpen, "justify-center": !sidebarOpen }, "flex w-full gap-x-8 items-center py-2 px-2.5 cursor-pointer transition-all hover:bg-gray-600")}>
                            {
                                sidebarOpen ?
                                    <>
                                        <div className="flex gap-x-8 items-center">
                                            <Image src={link.iconSrc} alt={link.iconAlt} width={24} height={24} />
                                            <span className="text-[14px] text-gray-200 leading-5">{link.copy}</span>
                                        </div>
                                        {link.expandable && <Image className={` ${link.expanded ? "rotate-180" : ""}`} src="/assets/images/chevron-down.svg" width="20" height="20" alt="arrow down" />}
                                    </>
                                    :
                                    <Image src={link.iconSrc} alt={link.iconAlt} width={24} height={24} />
                            }
                        </Link>
                        {
                            sidebarOpen &&
                            <ul className={classNames("overflow-hidden flex flex-col list-disc list-inside", {
                                ["h-auto"]: (link.expandable && link.expanded),
                                ["h-0"]: !(link.expandable && link.expanded),
                            })}>
                                {
                                    link.children.map((child, index) => (
                                        <Link key={index} href={child.link} className="w-full">
                                            <li className="pl-4 list-item w-full gap-x-8  marker:text-2xl items-center self-center py-1.5 px-2.5 cursor-pointer text-gray-400 hover:bg-gray-600 hover:text-white   text-[14px]">
                                                <span className="ml-3.5">{child.copy}</span>
                                            </li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        }
                        {index !== links.length - 1 && <div className="mx-1 h-[1px] bg-gray-700"></div>}
                    </Fragment>
                ))}
            </div>
            <div className="p-2.5">
                <span className="text-[10px] leading-5 text-gray-300">Powered By Evently</span>
            </div>
        </aside >
    )
}
