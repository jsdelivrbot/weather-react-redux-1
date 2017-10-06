import { renderComponent , expect } from '../test_helper';
import HistoricalWeather from '../../src/components/weather_historical';

describe('HistoricalWeather' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(HistoricalWeather);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
