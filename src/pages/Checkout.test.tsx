import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from './Checkout';

describe('Checkout Page', () => {
    it('renders checkout form and disables pay button when loading', () => {
        render(<Checkout />);
        const payButton = screen.getByRole('button', { name: /Pay Now with PesaPal/i });
        expect(payButton).toBeInTheDocument();
        // Simulate loading state
        fireEvent.click(payButton);
        expect(payButton).toBeDisabled();
    });

    it('shows PesaPal info and payment logos', () => {
        render(<Checkout />);
        expect(screen.getByText(/All payments are securely processed via PesaPal/i)).toBeInTheDocument();
        expect(screen.getByAltText(/M-Pesa/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Airtel Money/i)).toBeInTheDocument();
        expect(screen.getByAltText(/PayPal/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Visa/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Mastercard/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Bank Transfer/i)).toBeInTheDocument();
    });
});
