import { Session } from "@/utils/types";
import classNames from "classnames";
import Image from "next/image";

interface Props {
    sessions: Session[]
    nextPage: number | null
    prevPage: number | null
    goNext: () => void
    goPrev: () => void
    goTo: (page: number) => void
    currentPage: number
    pages: number | null
    count: number
    isLoading: boolean
    error?: string
}

export default function SessionsTable(props: Props) {
    const { sessions, nextPage, prevPage, goTo, goNext, goPrev, currentPage, pages, count } = props
    return (
        <div className="flex flex-col h-full overflow-y-auto w-full">
            <table className="w-full border-collapse overflow-y-auto">
                <thead className="bg-gray-800" >
                    <tr className="">
                        <th className=" sticky top-0 bg-gray-800 max-md:min-w-[250px]">
                            <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                                Session Name
                                <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                            </div>
                        </th>
                        <th className="sticky top-0 bg-gray-800 max-md:min-w-[250px]">
                            <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                                Date
                                <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                            </div>
                        </th>
                        <th className="sticky top-0 bg-gray-800 max-md:min-w-[250px]">
                            <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                                Time
                                <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                            </div>
                        </th>
                        <th className="sticky top-0 bg-gray-800 max-md:min-w-[250px]">
                            <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                                Venue
                                <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                            </div>
                        </th>
                        <th className="sticky top-0 bg-gray-800 py-4 px-6 text-xs text-gray-200 font-normal"></th>
                        <th className="sticky top-0 bg-gray-800 py-4 px-6 text-xs text-gray-200 font-normal"></th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => (
                        <tr key={index}>
                            <td className="bg-gray-700 border-t border-b border-gray-600">
                                <div className="flex items-center gap-x-2.5 py-4 px-6 ">
                                    <Image className="rounded-md h-9 w-9 object-cover" src={session.cover_image || "/assets/images/session-placeholder-image.png"} alt="play" width="34" height="34" />
                                    <span className="text-[14px] text-white leading-5">
                                        {session.title}
                                    </span>
                                </div>
                            </td>
                            <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                <div className="flex items-center justify-center">
                                    {session.date as string}
                                </div>
                            </td>
                            <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                <div className="flex items-center justify-center">
                                    {session.from} - {session.till}
                                </div>
                            </td>
                            <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                <div className="flex items-center justify-center">
                                    {session.venue.name}
                                </div>
                            </td>
                            <td className="bg-gray-700 border-t border-b border-gray-600">
                                <div className="flex items-center justify-center">
                                    <Image src="/assets/images/pencil.svg" alt="edit" width="20" height="20" />
                                </div>
                            </td>
                            <td className="bg-gray-700 border-t border-b border-gray-600">
                                <div className="flex items-center justify-center">
                                    <Image src="/assets/images/chevron-right.svg" alt="edit" width="20" height="20" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="sticky bottom-0 left-0 right-0 flex max-md:flex-col items-center justify-between p-2.5 bg-gray-900">
                <div className="text-white text-[14px]">Showing {sessions.length} entries of {count}</div>
                <div className="flex items-stretch border-t border-b border-gray-700 text-white">
                    <div onClick={() => goPrev()} className="p-2.5 border-l border-gray-700 cursor-pointer">
                        <Image src="/assets/images/chevron-left.svg" alt="arrow left" height={20} width={20} />
                    </div>
                    <div onClick={() => goTo(1)} className="px-4 py-2 border-l border-gray-700 cursor-pointer">
                        ...
                    </div>
                    <div
                        onClick={() => {
                            if (currentPage === pages && pages > 3) {
                                goTo(currentPage - 2)
                            } else if (currentPage === pages && pages <= 3) {
                                goTo(1)
                            } else {
                                goPrev()
                            }
                        }}
                        className={classNames({ "border border-gray-200": currentPage === 1 }, "px-4 py-2 border-l border-gray-700 cursor-pointer")}>
                        {currentPage === 1 ? 1 : (currentPage === pages ? (prevPage! - 1) : prevPage)}
                    </div>
                    <div
                        onClick={() => {
                            if (currentPage !== 1 && currentPage !== pages) return
                            currentPage === pages ? goPrev() : goNext()
                        }}
                        className={classNames({ "hidden": pages && pages < 2, "border border-gray-200": currentPage !== 1 && currentPage !== pages }, "px-4 py-2 border-l border-gray-700 cursor-pointer")}>
                        {currentPage === 1 ? 2 : (currentPage === pages ? prevPage : currentPage)}
                    </div>
                    <div
                        onClick={() => {
                            if (currentPage === pages) return
                            if (currentPage === 1) goTo(currentPage + 2)
                            else goNext()
                        }}
                        className={classNames({ "hidden": (pages && pages < 3), "border border-gray-200": currentPage === pages }, "px-4 py-2 border-l border-gray-700 cursor-pointer")}>
                        {currentPage === 1 ? 3 : (currentPage === pages ? currentPage : nextPage)}
                    </div>
                    <div onClick={() => goTo(pages || 1)} className="px-4 py-2 border-l border-gray-700 cursor-pointer">
                        ...
                    </div>
                    <div onClick={() => goNext()} className="p-2.5 border-l border-r border-gray-700 cursor-pointer">
                        <Image src="/assets/images/chevron-right.svg" alt="arrow left" height={20} width={20} />
                    </div>
                </div>
            </div>

        </div>
    )
}