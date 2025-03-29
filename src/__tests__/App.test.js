import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../pages/HomePage', () => () => <div>HomePage Mock</div>);
jest.mock('../pages/VideoPage', () => () => <div>VideoPage Mock</div>);

test('renderiza a aplicação sem falhas', () => {
  render(<App />);
  expect(document.querySelector('.app')).toBeTruthy();
});