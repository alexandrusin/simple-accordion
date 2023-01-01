import { SimpleDetails } from './simple-details';

const Template = ({title, description}) => `
  <details is="simple-details">
    <summary>${title}</summary>
    ${description}
  </details>
  `

export default {
  component: SimpleDetails,
  title: 'Simple Details',
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
        component: 'This component extends the default details html element.',
      },
    },
  },
};

export const Default = Template.bind({});

Default.args = {
  title: "The sun is shining",
  description: "Dummy content of an accordion item web component.<br />This is the long description."
}