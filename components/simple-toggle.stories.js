import { SimpleToggle } from './simple-toggle';

const Template = ({title, description}) => `<simple-toggle title="${title}">${description}</simple-toggle>`

export default {
  component: SimpleToggle,
  title: 'Simple Toggle',
  argTypes: {
    title: {
      description: 'Title of the toggle',
      control: { type: "text"}
    },
    description: {
      description: 'The description to show/hide',
      control: { type: "text"}
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Show/hide extra content under a title.',
      },
    },
  },
};

export const Default = Template.bind({});

Default.args = {
  title: "The sun is shining",
  description: "Dummy content of an accordion item web component.<br />This is the long description."
}