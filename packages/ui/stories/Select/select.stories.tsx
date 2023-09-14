// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import SelectChains from '../../lib/components/Select/Chains'

const meta: Meta<typeof SelectChains> = {
  title: 'Atoms/Select/Chains',
  component: SelectChains,
}

export default meta
type Story = StoryObj<typeof SelectChains>

export const Primary: Story = {
  args: {},
}
