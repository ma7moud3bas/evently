import classNames from "classnames"
import Image from "next/image"

interface Props {
    nextPage: number | null
    prevPage: number | null
    goNext: () => void
    goPrev: () => void
    goTo: (page: number) => void
    currentPage: number
    pages: number | null
    count: number
    isLoading: boolean
    currentCount: number
}
const Pagination = (props: Props) => {
    const { nextPage, prevPage, goTo, goNext, goPrev, currentPage, pages, count, isLoading, currentCount } = props
    return (
        <div className={"sticky bottom-0 left-0 right-0 flex max-md:flex-col items-center justify-between p-2.5 bg-gray-900"}>
            <div className="text-white text-[14px]">Showing {currentCount} entries of {count}</div>
            <div className={classNames({ "pointer-events-none opacity-70": isLoading }, "flex items-stretch border-t border-b border-gray-700 text-white")}>
                <div onClick={() => goPrev()} className={classNames({ "opacity-50 cursor-not-allowed": currentPage === 1 }, "p-2.5 border-l border-gray-700 cursor-pointer")}>
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
                    className={classNames("px-4 py-2 border-l border-gray-700 cursor-pointer", { "border border-gray-100": currentPage === 1 })}>
                    {currentPage === 1 ? 1 : (currentPage === pages ? (prevPage! - 1) : prevPage)}
                </div>
                <div
                    onClick={() => {
                        if (currentPage !== 1 && currentPage !== pages) return
                        currentPage === pages ? goPrev() : goNext()
                    }}
                    className={classNames("px-4 py-2 border-l border-gray-700 cursor-pointer", { "hidden": pages && pages < 2, "border border-gray-100": currentPage !== 1 && currentPage !== pages })}>
                    {currentPage === 1 ? 2 : (currentPage === pages ? prevPage : currentPage)}
                </div>
                <div
                    onClick={() => {
                        if (currentPage === pages) return
                        if (currentPage === 1) goTo(currentPage + 2)
                        else goNext()
                    }}
                    className={classNames("px-4 py-2 border-l border-gray-700 cursor-pointer", { "hidden": (pages && pages < 3), "border border-gray-100": currentPage === pages })}>
                    {currentPage === 1 ? 3 : (currentPage === pages ? currentPage : nextPage)}
                </div>
                <div onClick={() => goTo(pages || 1)} className="px-4 py-2 border-l border-gray-700 cursor-pointer">
                    ...
                </div>
                <div onClick={() => goNext()} className={classNames({ "opacity-50 cursor-not-allowed": currentPage === pages }, "p-2.5 border-l border-r border-gray-700 cursor-pointer")}>
                    <Image src="/assets/images/chevron-right.svg" alt="arrow left" height={20} width={20} />
                </div>
            </div>
        </div>
    )
}

export default Pagination