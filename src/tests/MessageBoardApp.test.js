import { render, screen } from '@testing-library/react';
import App from '../components/MessageBoardApp';

test('renders learn react link', () => {
  render(<MessageBoardApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
