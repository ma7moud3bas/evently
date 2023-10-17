import { useClickOutside } from "../../../utils/hooks";
import classNames from "classnames"
import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

export type Props = ({
    label: string
    tooltip?: string
    items: any[]
    multiselect?: boolean
    selectedItems: string[]
    handleAddNew?: () => void
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
    selectedDisplayType: "avatar" | "image"
})

const Dropdown = (props: Props) => {
    const { selectedItems, setSelectedItems, selectedDisplayType, items, label, tooltip, handleAddNew } = props
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [search, setSearch] = useState("")

    const dropdownRef = useRef(null)

    const handleClickOutside = () => {
        setDropdownOpen(false)
    }
    useClickOutside(dropdownRef, handleClickOutside);


    const filteredItems = useMemo(() => items.filter(item => {
        if (selectedItems.includes(item.id)) { return false }
        return item.name.toLowerCase().includes(search.toLowerCase())
    }), [search, selectedItems])

    const handleSelectItem = (ItemId: string) => {
        if (props.multiselect) {
            setSelectedItems((old) => [...old, ItemId])
            setDropdownOpen(false)
        } else {
            setSelectedItems([ItemId])
            setDropdownOpen(false)
        }
    }

    const handleUnselectItem = (ItemId: string) => {
        setSelectedItems(old => old.filter(el => el !== ItemId))
    }
    return (
        <div className={classNames("w-full flex flex-col gap-y-2.5")}>
            <div className="w-full flex items-center justify-between">
                <label className="font-bold text-gray-200" htmlFor={label}>{label}</label>
                {
                    tooltip &&
                    <div className="flex items-center justify-center cursor-pointer">
                        <Image data-tooltip-id={`item-dropdown-tooltip`} data-tooltip-content={tooltip} src={"/assets/images/question-mark.svg"} alt="tooltip" height={20} width={20} />
                        <Tooltip place={"right"} className="bg-gray-800 max-w-[180px] text-xs text-white leading-6 p-1" id={`item-dropdown-tooltip`} />
                    </div>
                }
            </div>
            <div ref={dropdownRef} className="dropdown relative flex flex-col">
                {dropdownOpen ?
                    <div className="relative flex items-center">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex items-center justify-between w-full p-3 pt-3.5 bg-gray-700 border border-gray-400 border-b-0 text-gray-500 leading-6 focus:outline-none focus:ring-0 " type="search" placeholder="Search.." />
                        <Image onClick={() => setDropdownOpen(false)} className="absolute right-5 rotate-180" src={"/assets/images/chevron-down-dark.svg"} alt="arrow up" width="20" height="20" />
                        <div className="ItemsDropdown absolute z-10 max-h-[160px] overflow-auto top-[100%] w-full bg-gray-700 border border-gray-400 border-t-gray-600">
                            {
                                handleAddNew &&
                                <div onClick={() => { setDropdownOpen(false); handleAddNew(); }} className="border-t-[0.5px] border-gray-600 flex items-center justify-between w-full px-5 py-3 text-gray-100 text-sm cursor-pointer hover:bg-gray-600">
                                    <span>
                                        Add new {label.toLocaleLowerCase()}
                                    </span>
                                    <Image src={"/assets/images/plus.svg"} alt="plus" width="12" height="12" />
                                </div>
                            }
                            {filteredItems.map((item, index) => (
                                <div key={item.id} onClick={() => handleSelectItem(item.id)} className="border-t-[0.5px] border-gray-600 flex items-center px-5 py-2 hover:bg-gray-600 cursor-pointer gap-x-2.5">
                                    <Image className="rounded-full object-cover h-[30px] w-[30px]" src={item.image} alt={item.name} height={30} width={30} />
                                    <span className="text-gray-100 text-sm">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div onClick={() => setDropdownOpen(true)} className="cursor-pointer flex items-center justify-between w-full p-3 pt-3.5 bg-gray-800 border border-gray-400 focus:border-gray-200 text-gray-500 leading-6 focus:outline-none focus:ring-0 ">
                        <p>Select {label}</p>
                        <Image src={"/assets/images/chevron-down-dark.svg"} alt="arrow up" width="20" height="20" />
                    </div>
                }

                <div className="selectedItem flex flex-col gap-y-1.5 w-full mt-2.5">
                    {selectedItems.map((itemId) => {
                        const item = items.find(el => el.id === itemId)
                        return (
                            <div key={item.id} className="flex items-center gap-x-2.5  w-full grow-1">
                                {
                                    selectedDisplayType === "avatar" ?
                                        <div key={item.id} onClick={() => handleSelectItem(item.id)} className="flex items-center border border-gray-500 px-4 md:px-6 py-2 bg-[#353535] cursor-pointer gap-x-2.5 w-full">
                                            <Image className="rounded-full object-cover " src={item.image} alt={item.name} height={30} width={30} />
                                            <span className="text-gray-100 text-sm">{item.name}</span>
                                            <span className="text-gray-300 text-xs max-md:hidden">{item.description}</span>
                                        </div>
                                        :
                                        <div key={item.id} onClick={() => handleSelectItem(item.id)} className="flex items-center border border-gray-500 bg-[#353535] cursor-pointer  w-full">
                                            <Image className="object-cover h-[85px] w-[120px] md:w-[180px]" src={item.image} alt={item.name} height={180} width={180} />
                                            <div className="flex flex-col gap-y-1.5 px-6 py-2">
                                                <span className="text-gray-100 text-sm">{item.name}</span>
                                                <span className="text-gray-300 text-xs">{item.description}</span>
                                            </div>
                                        </div>
                                }
                                <span onClick={() => handleUnselectItem(item.id)} className="cursor-pointer p-2 shrink"><Image src={"/assets/images/trash-red.svg"} alt="trash can" height={20} width={20} /></span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Dropdown;