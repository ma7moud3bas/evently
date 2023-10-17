import { Meta, StoryObj } from "@storybook/react"
import Navbar, { NavbarProps } from "."

export default {
    title: "UI/Navbar",
    component: Navbar,
} as Meta<NavbarProps>

type Story = StoryObj<NavbarProps>

export const navbar: Story = {
    args: {}
} 