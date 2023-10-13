import { Meta, StoryObj } from "@storybook/react"
import Sidebar, { SidebarProps } from "."

export default {
    title: "UI/Sidebar",
    component: Sidebar,
} as Meta<SidebarProps>

type Story = StoryObj<SidebarProps>

export const Primary: Story = {
    args: {}
} 