// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import Button from '../../lib/components/Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    text: 'Press here',
    variant: 'contained',
  },
}
