import { Session } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    sessions: Session[]
    isLoading: boolean
}

export default function SessionsTable(props: Props) {
    const { sessions, isLoading } = props
    return (
        <table className="w-full border-collapse overflow-y-auto">
            <thead className="bg-gray-800" >
                <tr className="">
                    <th className="sticky top-0 z-10 bg-gray-800 max-md:min-w-[250px]">
                        <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                            Session Name
                            <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                        </div>
                    </th>
                    <th className="sticky top-0 z-10 bg-gray-800 w-[140px] max-md:min-w-[140px]">
                        <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                            Date
                            <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                        </div>
                    </th>
                    <th className="sticky top-0 z-10 bg-gray-800 w-[140px] max-md:min-w-[140px]">
                        <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                            Time
                            <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                        </div>
                    </th>
                    <th className="sticky top-0 z-10 bg-gray-800 w-[140px] max-md:min-w-[140px]">
                        <div className="py-4 px-6 text-xs text-gray-200 font-normal flex items-center justify-center gap-x-1">
                            Venue
                            <Image src="/assets/images/chevron-down-light.svg" alt="arrow down" width="16" height="16" />
                        </div>
                    </th>
                    <th className="sticky top-0 z-10 bg-gray-800 py-4 px-6 text-xs text-gray-200 font-normal w-[50px]"></th>
                    <th className="sticky top-0 z-10 bg-gray-800 py-4 px-6 text-xs text-gray-200 font-normal w-[50px]"></th>
                </tr>
            </thead>
            {
                isLoading ? (
                    <tbody>
                        {
                            Array(10).fill(0).map((_, index) => ( // range loop; JS is weird 
                                <tr key={index}>
                                    <td className="bg-gray-700 border-t border-b border-gray-600">
                                        <div className="flex items-center gap-x-2.5 py-4 px-6 ">
                                            <div className="animate-pulse bg-gray-600 h-9 w-9 rounded-md"></div>
                                            <div className="animate-pulse bg-gray-600 h-4 w-32 rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-pulse bg-gray-600 h-4 w-16 rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-pulse bg-gray-600 h-4 w-16 rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="bg-gray-700 border-t border-b border-gray-600 text-xs text-gray-200">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-pulse bg-gray-600 h-4 w-16 rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="bg-gray-700 border-t border-b border-gray-600">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-pulse bg-gray-600 h-4 w-9 rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="bg-gray-700 border-t border-b border-gray-600">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-pulse bg-gray-600 h-4 w-9 rounded-md"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                ) :
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={index}>
                                <td className="bg-gray-700 border-t border-b border-gray-600">
                                    <div className="flex items-center gap-x-2.5 py-4 px-6 ">
                                        <img className="rounded-md h-9 w-9 object-cover" src={session.cover_image || "/assets/images/session-placeholder-image.png"} alt="play" width="34" height="34" />
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
                                    <Link href={`/sessions/${session.id}/edit`} className="flex items-center justify-center">
                                        <Image src="/assets/images/pencil.svg" alt="edit" width="20" height="20" />
                                    </Link>
                                </td>
                                <td className="bg-gray-700 border-t border-b border-gray-600">
                                    <div className="flex items-center justify-center">
                                        <Image src="/assets/images/chevron-right.svg" alt="edit" width="20" height="20" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            }

        </table>
    )
}