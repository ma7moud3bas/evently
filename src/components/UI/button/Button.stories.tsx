import { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"
import { ButtonProps } from "."


export default {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        fullWidth: {
            type: 'boolean',
        },
    },
} as Meta<ButtonProps>


type Story = StoryObj<ButtonProps>

export const Primary: Story = {
    args: {
        intent: "primary",
        fullWidth: true,
        children: "Button",
    },
}

export const Secondary: Story = {
    args: {
        intent: "secondary",
        children: "Button"
    }
}