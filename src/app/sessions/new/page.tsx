"use client"
import Button from "@/components/UI/button";
import Input from "@/components/UI/input/Input";
import PageBar from "@/components/UI/pageBar";

export default function NewSession() {
    const handleSubmit = () => { }
    return (
        <div className="page-content grow flex flex-col bg-gray-1000 px-4 overflow-hidden">
            <PageBar title="New Session" backButton backButtonText="All Sessions" backLink="/">
                <div className="flex items-center">
                    <Button href="/" className="w-[100px] flex justify-center" intent={"secondary"}>
                        Cancel
                    </Button>
                    <Button className="w-[100px] flex justify-center" onClick={handleSubmit} intent={"primary"}>
                        Next
                    </Button>
                </div>
            </PageBar>
            <div className="flex flex-col items-center overflow-y-auto">
                <div className="max-w-[800px] bg-gray-800 flex flex-col gap-y-8 px-6 py-8 max-md:pb-10 md:px-10 md:py-14 w-full mb-4">
                    <Input type="text" label="Session Title" placeholder="Session Name" required />
                    <Input type="text" label="Session Subtitle" tooltip="hello world hello world hello world hello world hello world" placeholder="Start Typing..." required />
                    <Input type="file" label="Thumbnail" placeholder="SVG, PNG, JPG or GIF (max. 800x400px)" accept="image/png, image/gif, image/jpeg, image/svg" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                        <Input className="col-span-2" type="date" label="Date" required />
                        <Input type="time" defaultValue={"00:00"} label="From" required />
                        <Input type="time" label="Till" defaultValue={"00:00"} required />
                    </div>
                    <Input type="textarea" label="Description" placeholder="Type details" required />
                    <Input type="text" label="Session Name" tooltip="hello world hello world hello world hello world hello world" placeholder="Session Name" required />
                </div>
            </div>
        </div>
    )
}
