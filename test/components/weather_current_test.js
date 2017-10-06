import { renderComponent , expect } from '../test_helper';
import CurrentWeather from '../../src/components/weather_current';

describe('CurrentWeather' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CurrentWeather);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

});
