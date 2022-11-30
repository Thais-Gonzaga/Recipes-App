import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const testEmail = 'trybe@trybe.com';
const testPassoword = '1234567';
const pushUrl = '/meals';

describe('Teste da Tela de Login', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('É possivel escrever no campo de email?', () => {
    const emailInput = screen.getByLabelText(/email:/i);
    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, testEmail);
    expect(emailInput).toHaveValue(testEmail);
  });

  it('É possivel escrever no campo de senha?', () => {
    const passInput = screen.getByLabelText(/Passoword:/i);
    expect(passInput).toBeInTheDocument();

    userEvent.type(passInput, testPassoword);
    expect(passInput).toHaveValue(testPassoword);
  });

  it('Verifica se existe o button com o texto "Enter" e se ele está desabilitado', () => {
    const fetchButton = screen.getByRole('button', { name: /Enter/i });
    expect(fetchButton).toBeInTheDocument();
    expect(fetchButton).toBeDisabled();
  });

  it('Verifica de ao preencher os campos o button habilita', () => {
    const emailInput = screen.getByLabelText(/email:/i);
    userEvent.type(emailInput, testEmail);

    const passInput = screen.getByLabelText(/Passoword:/i);
    userEvent.type(passInput, testPassoword);

    const fetchButton = screen.getByRole('button', { name: /Enter/i });
    expect(fetchButton).not.toBeDisabled();
  });
});

test('Verifica se o button está dando o push para /meals', () => {
  const { history } = render(<App />);

  const emailInput = screen.getByLabelText(/email:/i);
  userEvent.type(emailInput, testEmail);

  const passInput = screen.getByLabelText(/Passoword:/i);
  userEvent.type(passInput, testPassoword);

  const fetchButton = screen.getByRole('button', { name: /Enter/i });
  userEvent.click(fetchButton);

  expect(history.location.pathname).toBe(pushUrl);
});
