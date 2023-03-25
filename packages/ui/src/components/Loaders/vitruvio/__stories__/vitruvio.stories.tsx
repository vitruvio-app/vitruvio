import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import VitruvioLoader from '../index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atom/Loaders/Vitruvio',
  component: VitruvioLoader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof VitruvioLoader>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VitruvioLoader> = (args) => <VitruvioLoader {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  height: '100px',
  width: '100px',
}
