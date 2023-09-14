// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import WalletStatus from '../../lib/components/Wallet/status'

const meta: Meta<typeof WalletStatus> = {
  title: 'Atoms/Wallet/Status',
  component: WalletStatus,
}

export default meta
type Story = StoryObj<typeof WalletStatus>

export const Primary: Story = {
  args: {
    address: '0xF274800E82717D38d2e2ffe18A4C6489a50C5Add',
    chain: 'ethereum',
    isTestnet: false,
  },
}
