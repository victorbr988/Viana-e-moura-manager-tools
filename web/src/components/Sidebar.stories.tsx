import { withRouter } from 'storybook-addon-react-router-v6';
import { Sidebar } from './sidebar';

export default {
  title: 'Components/sidear',
  component: Sidebar,
  decorators : [withRouter],
}

export const Default = {}
