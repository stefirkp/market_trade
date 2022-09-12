import { render, cleanup, screen } from '@lib/test-utils';

import { Input } from './Input';

const propsMocks = {
  name: 'search',
  placeholder: 'Search',
  icon: 'mockIcon',
  value: '',
  onChange: jest.fn(),
  className: 'mock-input',
};

describe('Input component test', () => {
  afterEach(cleanup);

  it('should simulate show icon', () => {
    render(<Input {...propsMocks} />);
    expect(screen.getByTestId('icon-input')).toBeInTheDocument();
  });
});
