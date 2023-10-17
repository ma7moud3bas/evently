import { Meta, StoryObj } from "@storybook/react"
import Sidebar, { SidebarProps } from "."

export default {
    title: "UI/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
} as Meta<SidebarProps>

type Story = StoryObj<SidebarProps>

export const TabletSidebar: Story = {
    args: {
        className: "w-28",
    }
}

export const DesktopSidebar: Story = {
    args: {
        sidebarOpen: true
    }
} 