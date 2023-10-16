import ImageInput from "@/components/UI/ImageInput";
import Input from "@/components/UI/input/Input";
import { FormEvent, ForwardedRef, forwardRef } from "react";

export interface Props {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const SessionsForm = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const { onSubmit } = props
    return (
        <form onSubmit={(e) => onSubmit(e)} ref={ref} className="max-w-[800px] bg-gray-800 flex flex-col gap-y-8 px-6 py-8 max-md:pb-10 md:px-10 md:py-14 w-full mb-4">
            <Input type="text" label="Session Title" placeholder="Session Name" required />
            <Input type="text" label="Session Subtitle" tooltip="Unique info about the session, that will be displayed under the title" placeholder="Start Typing..." required />
            <ImageInput label="Thumbnail" placeholder="SVG, PNG, JPG or GIF (max. 800x400px)" accept="image/png, image/gif, image/jpeg" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                <Input className="col-span-2" type="date" label="Date" required />
                <Input type="time" defaultValue={"00:00"} label="From" required />
                <Input type="time" label="Till" defaultValue={"00:00"} required />
            </div>
            <Input type="textarea" label="Description" placeholder="Type details" required />
            <Input type="text" label="Session Name" placeholder="Session Name" required />
        </form>
    )
})

export default SessionsForm