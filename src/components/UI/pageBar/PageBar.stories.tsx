import { Meta, StoryObj } from "@storybook/react"
import PageBar, { PageBarProps } from "."

export default {
    title: "UI/PageBar",
    component: PageBar,
} as Meta<PageBarProps>

type Story = StoryObj<PageBarProps>

export const pageBar: Story = {
    args: {}
} 