import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('Aether H1 landing', () => {
  it('renders the hero title in Spanish by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Sonido');
  });

  it('switches the whole interface to English', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Change language' }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Sound');
    expect(screen.getByRole('button', { name: 'Cart' })).toBeTruthy();
  });

  it('adds the selected quantity to the cart', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }));

    expect(screen.getByRole('button', { name: 'Carrito' }).textContent).toMatch(/3/);
  });

  it('changes the product image when another colour is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByText('Hueso'));

    expect(screen.getByAltText(/Hueso/)).toBeTruthy();
  });
});
