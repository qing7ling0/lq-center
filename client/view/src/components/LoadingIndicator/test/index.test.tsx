import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '..';

describe('<LoadingIndicator />', () => {
  it('should render the `messages.loading`', () => {
    const renderedComponent = shallow(
      <LoadingIndicator />
    );
    expect(renderedComponent.contains('加载中'));
  });
});
