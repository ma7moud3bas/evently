import classNames from "classnames"
import Image from "next/image"
import { ComponentPropsWithoutRef } from "react"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

type InputType = "text" | "password" | "email" | "number" | "date" | "time" | "datetime-local" | "search" | "tel" | "url"  // just to limit the input types
export type Props = ({
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type: InputType
    label: string
    placeholder?: string
    inputClassName?: string
    tooltip?: string
} & ComponentPropsWithoutRef<'input'>) |
    ({
        name: string
        value: string
        type: "textarea"
        label: string
        placeholder?: string
        inputClassName?: string
        tooltip?: string
    } & ComponentPropsWithoutRef<'textarea'>)

const Input = (props: Props) => {
    const { type, placeholder, className, inputClassName, label } = props
    return (
        <div className={classNames("w-full flex flex-col gap-y-2.5", className)}>
            <div className="w-full flex items-center justify-between">
                <label className="font-bold text-gray-200" htmlFor={props.name}>{label}{props.required && <span className="text-error-300">*</span>}</label>
                {
                    props.tooltip &&
                    <div className="flex items-center justify-center cursor-pointer">
                        <Image data-tooltip-id={`${label}-${type}`} data-tooltip-content={props.tooltip} src={"/assets/images/question-mark.svg"} alt="tooltip" height={20} width={20} />
                        <Tooltip place={"right"} className="bg-gray-800 max-w-[180px] text-xs text-white leading-6 p-1" id={`${label}-${type}`} />
                    </div>
                }
            </div>
            {
                type === "textarea" ?
                    <textarea {...props} className={classNames("w-full p-3 pt-3.5 bg-gray-800 border border-gray-400 focus:border-gray-200 text-white placeholder:text-gray-500 leading-6 focus:outline-none focus:ring-0 ", inputClassName)} placeholder={placeholder} />
                    :
                    <input  {...props} className={classNames("w-full p-3 pt-3.5 bg-gray-800 border border-gray-400 focus:border-gray-200 text-white placeholder:text-gray-500 leading-6 focus:outline-none focus:ring-0 ", inputClassName)} type={type} placeholder={placeholder} />
            }
        </div>
    )
}

export default Input;