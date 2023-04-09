import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../index'
import WalletConnectIcon from '../../../assets/wc'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atom/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: 'Connect Wallet',
  loading: true,
  icon: <WalletConnectIcon width='2rem' height='2rem' color='#3396ff' />,
  disabled: false,
  variant: 'outlined',
}
