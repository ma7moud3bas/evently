"use client"
import Image from "next/image"
import Link from "../link/Link"
import { useRouter } from "next/navigation"

export interface Props {
    children?: React.ReactNode
    title: string
    backButton?: boolean
    backButtonText?: string
    backLink?: string
}

export default function PageBar(props: Props) {
    const { title, backButton, backButtonText, children, backLink } = props
    const router = useRouter()
    const handleBack = () => {
        router.push(backLink || "/")
    }
    return (
        <div className="page-bar flex items-center justify-between px-2 py-3.5 md:px-6 ">
            <div>
                {
                    backButton &&
                    <Link onClick={handleBack} className="flex items-center text-primary-400 gap-x-0.5 -ml-2 md:-ml-5">
                        <Image src="/assets/images/chevron-left-gray.svg" className="h-4 w-4" alt="back button" width="20" height="20" />
                        <span className="text-[14px]">{backButtonText || "back"}</span>
                    </Link>
                }
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}