import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
    it('renders the NavBar', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('My App')).toBeInTheDocument(); // Assuming "My App" is in your NavBar
    });

    it('renders the Posts component for the root path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('No results found. Adjust the search keyword or follow a user.')).toBeInTheDocument();
    });
});
