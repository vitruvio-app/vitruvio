import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Spinner from '../index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atom/Loaders/Spinner',
  component: Spinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Spinner>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  height: '20px',
  width: '20px',
  color: '#FF0000',
  borderWidth: '2px',
}
