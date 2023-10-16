import classNames from "classnames"
import Image from "next/image"
import { ComponentPropsWithoutRef, useRef, useState } from "react"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export type Props = ({
    label: string
    placeholder?: string
    tooltip?: string
    setUrl: (url: string) => void
    preview?: string | ArrayBuffer | null
} & ComponentPropsWithoutRef<'input'>)

const ImageInput = (props: Props) => {
    const { type, placeholder, className, label, setUrl, ...rest } = props
    const imageRef = useRef(null)
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.preview || null);
    const [file, setFile] = useState<File | undefined>();
    const [loading, setLoading] = useState(false)

    const uploadImage = useCallback(async (file: File) => {
        if (typeof file === 'undefined') return;
        setLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'fmaljof6');
        // upload image to cloudinary
        await fetch('https://api.cloudinary.com/v1_1/dzzylglrl/image/upload', {
            method: 'POST',
            body: formData
        })
            .then(r => r.json())
            .then(data => {
                if (data.url) {
                    setUrl(data.url)
                    setLoading(false)
                } else {
                    throw Error("Something went wrong")
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }, [file])

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader;

        file.onload = function () {
            setPreview(file.result);
        }
        file.readAsDataURL(acceptedFiles[0])
        uploadImage(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: Object.fromEntries(props.accept?.split(", ").map((type) => [type, [type.replace("image/", ".")]]) || [])
    });

    function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        setFile(target.files[0]);
        const file = new FileReader;
        file.onload = function () {
            setPreview(file.result);
        }
        file.readAsDataURL(target.files[0])
    }

    return (
        <div className={classNames("w-full flex flex-col gap-y-2.5", className)}>
            <div className="w-full flex items-center justify-between">
                <label className="font-bold text-gray-200" htmlFor={props.name}>{label} {props.required && <span className="text-error-300">*</span>}</label>
                {
                    props.tooltip &&
                    <div className="flex items-center justify-center cursor-pointer">
                        <Image data-tooltip-id={`${label}-${type}`} data-tooltip-content={props.tooltip} src={"/assets/images/question-mark.svg"} alt="tooltip" height={20} width={20} />
                        <Tooltip place={"right"} className="bg-gray-800 max-w-[180px] text-xs text-white leading-6 p-1" id={`${label}-${type}`} />
                    </div>
                }
            </div>
            <input {...getInputProps()} onChange={handleOnChange} ref={imageRef} className="hidden" {...rest} type={type} placeholder={placeholder} accept="image/png, image/gif, image/jpeg, image/svg" />
            <div {...getRootProps()} className={classNames({ "p-3 pt-3.5": !(loading || preview) }, "h-48 w-full bg-gray-800 border border-gray-400 focus:border-gray-200 text-gray-500 leading-6 focus:outline-none focus:ring-0 cursor-pointer")}>
                {preview ?
                    <div className="w-full h-full">
                        <img className="w-full h-full object-cover" src={preview as string} alt="Upload preview" />
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center p-2.5 rounded-full bg-white/[05%]">
                            <Image src="/assets/images/upload.svg" alt="upload" height={24} width={24} />
                        </div>
                        {
                            isDragActive ?
                                <div className="text-[14px] text-gray-300 leading-5 mt-4">
                                    Just drop here
                                </div> :
                                <div className="text-[14px] text-gray-300 leading-5 mt-4">
                                    <span className="text-white font-bold">Click to upload </span>
                                    or drag and drop
                                </div>
                        }
                        <div className="text-[14px] text-gray-300 leading-5">
                            {placeholder}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default ImageInput;