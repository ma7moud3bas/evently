import ImageInput from "@/components/UI/ImageInput";
import Input from "@/components/UI/input/Input";
import { useFormik } from "formik";
import { ForwardedRef, forwardRef, useState } from "react";

export interface Props {
    onSubmit: (values: { [key: string]: string }) => void
    initialValues?: {
        title: string
        subtitle: string
        thumbnailUrl: string
        date: string
        from: string
        till: string
        description: string
    }
}

const SessionsForm = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const { onSubmit } = props
    const [imageUrl, setImageUrl] = useState<string>(props.initialValues?.thumbnailUrl || "")
    const validate = (values: { [key: string]: string }) => {
        // Can add any custom validation here
        const errors: { [key: string]: string } = {}
        if (!values.title) {
            errors.title = "Required"
        }
        if (!values.subtitle) {
            errors.subtitle = "Required"
        }
        if (!values.date) {
            errors.date = "Required"
        }
        if (!values.from) {
            errors.from = "Required"
        }
        if (!values.till) {
            errors.till = "Required"
        }
        if (!values.description) {
            errors.description = "Required"
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            thumbnailUrl: "",
            date: "",
            from: "00:00",
            till: "00:00",
            description: "",
            ...props.initialValues
        },
        validate,
        onSubmit: (values) => {
            onSubmit({ ...values, thumbnailUrl: imageUrl })
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} ref={ref} className="max-w-[800px] bg-gray-800 flex flex-col gap-y-8 px-6 py-8 max-md:pb-10 md:px-10 md:py-14 w-full mb-4">
            <Input name="title" value={formik.values.title} onChange={formik.handleChange} type="text" label="Session Title" placeholder="Session Name" required />
            <Input name="subtitle" value={formik.values.subtitle} onChange={formik.handleChange} type="text" label="Session Subtitle" tooltip="Unique info about the session, that will be displayed under the title" placeholder="Start Typing..." required />
            <ImageInput name="image" setUrl={setImageUrl} label="Thumbnail" placeholder="SVG, PNG, JPG or GIF (max. 800x400px)" accept="image/png, image/gif, image/jpeg" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                <Input name="date" value={formik.values.date} onChange={formik.handleChange} className="col-span-2" type="date" label="Date" required />
                <Input name="from" value={formik.values.from} onChange={formik.handleChange} type="time" label="From" required />
                <Input name="till" value={formik.values.till} onChange={formik.handleChange} type="time" label="Till" required />
            </div>
            <Input name="description" value={formik.values.description} onChange={formik.handleChange} type="textarea" label="Description" placeholder="Type details" required />
        </form>
    )
})
SessionsForm.displayName = "SessionsForm";

export default SessionsForm