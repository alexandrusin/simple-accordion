import { SimpleAccordion } from './simple-accordion';

export default {
  component: SimpleAccordion,
  title: 'Simple Accordion',
  argTypes: {
    onlyOneOpened: {
      description: 'Have only one item opened at a time',
      control: { type: "boolean"}
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'This component adds extra functionality to a group of SimpleToggle components',
      },
    },
  },
};

const Template = ({onlyOneOpened}) => `
  <simple-accordion ${onlyOneOpened ? 'only-one-opened' : ''}>
    <simple-toggle title="The sun is shining" open>
        Dummy content of an accordion item web component.<br />This is the long description.
    </simple-toggle>
    <simple-toggle title="The birds are chirping">
        This is another long description of an accordion item web component.
    </simple-toggle>
    <simple-toggle title="The cake is ready">
        Yet another accordion description.
    </simple-toggle>
  </simple-accordion>`

export const Default = Template.bind({});

Default.args = {
  onlyOneOpened: true
}