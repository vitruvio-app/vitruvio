import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import WalletConnectStatus from '../index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecule/WalletConnect/Status',
  component: WalletConnectStatus,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof WalletConnectStatus>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletConnectStatus> = (args) => <WalletConnectStatus {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
