"use client"
import CreateSpeakerModal from "@/components/CreateSpeakerModal";
import SessionsForm from "@/components/SessionsForm";
import Button from "@/components/UI/button";
import PageBar from "@/components/UI/pageBar";
import { createSession } from "@/utils/api";
import { defaultEventId } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewSession() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (values: { [key: string]: string | string[] }) => {
        setIsLoading(true)
        const data = {
            title: values.title,
            subtitle: values.subtitle,
            cover_image: values.thumbnailUrl,
            date: values.date,
            from: values.from,
            till: values.till,
            description: values.description,
            speaker_ids: values.speakers,
            moderator_ids: values.moderators,
            venue_id: values.venueId
        }
        const response = await createSession(data, defaultEventId)
        console.log(response)
        if (response) {
            router.push("/")
        }
        setIsLoading(false)
    }
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <div className="page-content grow flex flex-col bg-gray-1000 px-4 overflow-hidden">
            <PageBar title="New Session" backButton backButtonText="All Sessions" backLink="/">
                <div className="flex items-center">
                    <Button href="/" className="w-[100px] flex justify-center" intent={"secondary"}>
                        Cancel
                    </Button>
                    <Button onClick={() => formRef.current?.requestSubmit()} type="button" className="w-[100px] flex justify-center" intent={"primary"}>
                        {isLoading ? <span>Loading...</span> : "Next"}
                    </Button>
                </div>
            </PageBar>
            <div className="flex flex-col items-center overflow-y-auto">
                <SessionsForm ref={formRef} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
