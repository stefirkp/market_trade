import { render, cleanup, screen } from '@lib/test-utils';

import Layout from './Layout';

const propsMocks = {
  name: 'search',
  placeholder: 'Search',
  icon: 'mockIcon',
  value: '',
  onChange: jest.fn(),
  className: 'mock-input',
};

describe('Layout component test', () => {
  afterEach(cleanup);

  it('should simulate Layout', () => {
    render(
      <Layout>
        <div>Mock Layout</div>
      </Layout>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
