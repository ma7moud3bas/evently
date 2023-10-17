import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./Portal";
import ImageInput from "./UI/ImageInput";
import Input from "./UI/input";
import { useFormik } from "formik";
import Button from "./UI/button";
import { useClickOutside } from "@/utils/hooks";

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

function CreateSpeakerModal({ isOpen, handleClose }: ModalProps) {
    const nodeRef = useRef(null);
    const formRef = useRef(null)
    useClickOutside(formRef, handleClose);
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? handleClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);
    const [imageUrl, setImageUrl] = useState<string>("")
    const validate = (values: { [key: string]: string }) => {
        // Can add any custom validation here
        const errors: { [key: string]: string } = {}
        if (!values.firstName) {
            errors.firstName = "Required"
        }
        if (!values.lastName) {
            errors.lastName = "Required"
        }
        if (!values.email) {
            errors.email = "Required"
            // validate email
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            // create speaker - can't find the api endpoint for this
        }
    })
    return (
        <ReactPortal wrapperId="root">
            <CSSTransition
                in={isOpen}
                timeout={{ enter: 0, exit: 300 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className="modal absolute z-20 inset-0 flex items-center justify-center backdrop-blur h-screen py-8" ref={nodeRef}>
                    <form ref={formRef} onSubmit={formik.handleSubmit} className="overflow-y-auto max-md:h-full max-w-[500px] w-[500px] flex flex-col bg-gray-900 border border-primary-700 mx-8 p-8 pb-10 gap-y-5">
                        <h1 className="text-white text-lg font-bold leading-6 ">Add Speaker</h1>
                        <ImageInput className={"mt-2"} label="Photo" value={imageUrl} setUrl={setImageUrl} />
                        <Input name="firstName" value={formik.values.firstName} onChange={formik.handleChange} type="text" label="First Name" required={true} placeholder="John" />
                        <Input name="lastName" value={formik.values.lastName} onChange={formik.handleChange} type="text" label="Last Name" required={true} placeholder="Doe" />
                        <Input name="email" value={formik.values.email} onChange={formik.handleChange} type="email" label="Email" required={true} placeholder="john@gmail.com" />
                        <div className="w-full flex flex-col max-md:items-stretch gap-y-4 md:flex-row items-center justify-between mt-5">
                            <Button onClick={handleClose} className="md:w-[190px] h-12 flex justify-center items-center" intent={"secondary"} >
                                Cancel
                            </Button>
                            <Button type="submit" className="md:w-[190px] h-12 flex justify-center items-center" intent={"primary"} >
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </CSSTransition>
        </ReactPortal>
    );
}
export default CreateSpeakerModal;