import { Meta, StoryObj } from "@storybook/react"
import Input, { InputProps } from "."

export default {
    title: "UI/Input",
    tags: ["autodocs"],
    component: Input
} as Meta<InputProps>

type Story = StoryObj<InputProps>

export const textInput: Story = {
    args: {
        type: "text",
        label: "Text Input",
        placeholder: "Input here..."
    }
}
export const passwordInput: Story = {
    args: {
        type: "password",
        label: "Password Input",
        placeholder: "Input here..."
    }
}

export const numberInput: Story = {
    args: {
        type: "number",
        label: "Number Input",
        placeholder: "Input here..."
    }
}

export const emailInput: Story = {
    args: {
        type: "email",
        label: "Email Input",
        placeholder: "Input here..."
    }
}

export const dateInput: Story = {
    args: {
        type: "date",
        label: "Date Input",
        placeholder: "Input here..."
    }
}

export const timeInput: Story = {
    args: {
        type: "time",
        label: "Time Input",
        placeholder: "Input here..."
    }
}

export const datetimeInput: Story = {
    args: {
        type: "datetime-local",
        label: "Datetime Input",
        placeholder: "Input here..."
    }
}

export const textArea: Story = {
    args: {
        type: "textarea",
        label: "Textarea",
        placeholder: "Input here..."
    }
}
