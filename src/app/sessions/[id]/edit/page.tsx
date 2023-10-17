"use client"
import SessionsForm from "@/components/SessionsForm";
import Button from "@/components/UI/button";
import PageBar from "@/components/UI/pageBar";
import { getSession } from "@/utils/api";
import { defaultEventId } from "@/utils/constants";
import { Moderators, Speakers, Venues } from "@/utils/dummyData";
import { useRef, use } from "react";

interface Props {
    params: { id: string }

}

export default function EditSession({ params }: Props) {
    const handleSubmit = (values: { [key: string]: string | string[] }) => {
        console.log(values)
    }
    const session = use(getSession(params.id, defaultEventId))
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <div className="page-content grow flex flex-col bg-gray-1000 px-4 overflow-hidden">
            <PageBar title="Edit Session" backButton backButtonText="All Sessions" backLink="/">
                <div className="flex items-center">
                    <Button href="/" className="w-[100px] flex justify-center" intent={"secondary"}>
                        Cancel
                    </Button>
                    <Button onClick={() => { }} type="button" className="w-[100px] flex justify-center" intent={"primary"}>
                        Next
                    </Button>
                </div>
            </PageBar>
            <div className="flex flex-col items-center overflow-y-auto">
                <SessionsForm ref={formRef} onSubmit={handleSubmit} initialValues={{
                    title: session.title,
                    subtitle: session.subtitle,
                    thumbnailUrl: session.cover_image,
                    date: session.date,
                    from: session.from,
                    till: session.till,
                    description: session.description,
                    speakers: Speakers,
                    moderators: Moderators,
                    venue: Venues[0]
                }} />
            </div>
        </div>
    )
}
