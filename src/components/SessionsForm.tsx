import ImageInput from "@/components/UI/ImageInput";
import Input from "@/components/UI/input/Input";
import { useFormik } from "formik";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import Dropdown from "./UI/dropdown";
import { Moderators, Speakers, Venues } from "@/utils/dummyData";
import { Moderator, Speaker, Venue } from "@/utils/types";
import CreateSpeakerModal from "./CreateSpeakerModal";

export interface Props {
    onSubmit: (values: { [key: string]: string | string[] }) => void
    initialValues?: {
        title: string
        subtitle: string
        thumbnailUrl: string
        date: string
        from: string
        till: string
        description: string
        speakers: Speaker[]
        moderators: Moderator[]
        venue: Venue
    }
}

const SessionsForm = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const { onSubmit, initialValues } = props
    const [imageUrl, setImageUrl] = useState<string>(initialValues?.thumbnailUrl || "")
    const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>(initialValues?.speakers.map(el => el.id) || [])
    const [selectedModerators, setSelectedModerators] = useState<string[]>(initialValues?.moderators.map(el => el.id) || [])
    const [selectedVenues, setSelectedVenues] = useState<string[]>(initialValues?.venue ? [initialValues?.venue.id] : [])
    const [addNewSpeakerModalOpen, setAddNewSpeakerModalOpen] = useState<boolean>(false)

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
            title: initialValues?.title || "",
            subtitle: initialValues?.subtitle || "",
            thumbnailUrl: initialValues?.thumbnailUrl || "",
            date: initialValues?.date || "",
            from: initialValues?.from || "00:00",
            till: initialValues?.till || "00:00",
            description: initialValues?.description || "",
        },
        validate,
        onSubmit: (values) => {
            onSubmit({ ...values, thumbnailUrl: imageUrl, speakers: selectedSpeakers, moderators: selectedModerators, venueId: selectedVenues[0] })
        }
    })

    return (
        <>
            <CreateSpeakerModal isOpen={addNewSpeakerModalOpen} handleClose={() => setAddNewSpeakerModalOpen(false)} />
            <form onSubmit={formik.handleSubmit} ref={ref} className="max-w-[800px] bg-gray-800 flex flex-col gap-y-8 px-6 py-8 max-md:pb-10 md:px-10 md:py-14 w-full mb-4">
                <Input name="title" value={formik.values.title} onChange={formik.handleChange} type="text" label="Session Title" placeholder="Session Name" required />
                <Input name="subtitle" value={formik.values.subtitle} onChange={formik.handleChange} type="text" label="Session Subtitle" tooltip="Unique info about the session, that will be displayed under the title" placeholder="Start Typing..." required />
                <ImageInput name="image" preview={initialValues?.thumbnailUrl} setUrl={setImageUrl} label="Thumbnail" placeholder="SVG, PNG, JPG or GIF (max. 800x400px)" accept="image/png, image/gif, image/jpeg" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                    <Input name="date" value={formik.values.date} onChange={formik.handleChange} className="col-span-2" type="date" label="Date" required />
                    <Input name="from" value={formik.values.from} onChange={formik.handleChange} type="time" label="From" required />
                    <Input name="till" value={formik.values.till} onChange={formik.handleChange} type="time" label="Till" required />
                </div>
                <Input name="description" value={formik.values.description} onChange={formik.handleChange} type="textarea" label="Description" placeholder="Type details" required />
                <Dropdown handleAddNew={() => setAddNewSpeakerModalOpen(true)} multiselect items={Speakers} selectedItems={selectedSpeakers} setSelectedItems={setSelectedSpeakers} selectedDisplayType="avatar" label="Speakers" />
                <Dropdown multiselect items={Moderators} selectedItems={selectedModerators} setSelectedItems={setSelectedModerators} selectedDisplayType="avatar" label="Moderators" />
                <Dropdown items={Venues} selectedItems={selectedVenues} setSelectedItems={setSelectedVenues} selectedDisplayType="image" label="Venue" />
            </form>
        </>
    )
})
SessionsForm.displayName = "SessionsForm";

export default SessionsForm