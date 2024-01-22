import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import SignIn from '../../SignIn';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import useRedirect from '../../hooks/useRedirect';
import setTokenTimestamp from '../../utils/setTokenTimestamp';

jest.mock('axios');
jest.mock('../../contexts/CurrentUserContext', () => ({
    useSetCurrentUser: jest.fn(),
}));
jest.mock('../../hooks/useRedirect', () => jest.fn());
jest.mock('../../utils/setTokenTimestamp');

describe('SignIn Component', () => {
    it('renders correctly and handles form submission', async () => {
        const setCurrentUserMock = jest.fn();
        useSetCurrentUser.mockReturnValue(setCurrentUserMock);
        const pushMock = jest.fn();
        const historyMock = {
            push: pushMock,
        };
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValueOnce({
            data: {
                user: {
                    username: 'testuser',
                },
            },
        });

        render(<SignIn />, { history: historyMock });

        // Fill in the form fields
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        // Submit the form
        const signInButton = screen.getByText('Sign In');
        fireEvent.click(signInButton);

        // Ensure the form data is correctly sent
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/dj-rest-auth/login/', {
            username: 'testuser',
            password: 'password',
        }));

        // Ensure setCurrentUser and setTokenTimestamp are called correctly
        expect(setCurrentUserMock).toHaveBeenCalledWith({ username: 'testuser' });
        expect(setTokenTimestamp).toHaveBeenCalled();

        // Ensure the user is redirected to the homepage
        expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('displays error messages from the server', async () => {
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockRejectedValueOnce({
            response: {
                data: {
                    username: ['This field is required.'],
                    password: ['This field is required.'],
                    non_field_errors: ['Invalid credentials.'],
                },
            },
        });

        render(<SignIn />);

        // Submit the form
        const signInButton = screen.getByText('Sign In');
        fireEvent.click(signInButton);

        // Ensure error messages are displayed
        await waitFor(() => {
            expect(screen.getByText('This field is required.')).toBeInTheDocument();
            expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
        });
    });
});
