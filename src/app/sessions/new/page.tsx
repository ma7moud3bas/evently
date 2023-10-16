"use client"
import SessionsForm from "@/components/SessionsForm";
import Button from "@/components/UI/button";
import PageBar from "@/components/UI/pageBar";
import { FormEvent, useRef } from "react";

export default function NewSession() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
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
                        Next
                    </Button>
                </div>
            </PageBar>
            <div className="flex flex-col items-center overflow-y-auto">
                <SessionsForm ref={formRef} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
