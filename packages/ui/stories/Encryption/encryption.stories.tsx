// Button.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import Encryption from '../../lib/sections/Encryption'

const meta: Meta<typeof Encryption> = {
  title: 'Organism/Encryption',
  component: Encryption,
}

export default meta
type Story = StoryObj<typeof Encryption>

export const Primary: Story = {
  args: {
    onEncrypt: () => {
      console.log('Encrypt')
    },
    CID: 'QmXasasdXASDFscfve',
    chain: 'ethereum',
  },
}
