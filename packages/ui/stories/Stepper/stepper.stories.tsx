// Button.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import Encryption from '../../lib/components/Stepper'
import React from 'react'
import DataObjectIcon from '@mui/icons-material/DataObject'
import HttpsIcon from '@mui/icons-material/Https'
import SaveIcon from '@mui/icons-material/Save'
const meta: Meta<typeof Encryption> = {
  title: 'Atoms/Stepper',
  component: Encryption,
}

export default meta
type Story = StoryObj<typeof Encryption>

export const Primary: Story = {
  args: {
    color: 'rgba(106, 112, 253, 1)',
    steps: [
      {
        label: 'Generate data',
        icon: <DataObjectIcon />,
        id: 0,
        children: <div>Generate data</div>,
      },
      {
        label: 'Encrypt data',
        id: 1,
        icon: <HttpsIcon />,
        children: <div>Encrypt data</div>,
      },
      {
        label: 'Save data',
        id: 2,
        icon: <SaveIcon />,
        children: <div>Save data</div>,
      },
    ],
    activeStep: 0,
  },
}
