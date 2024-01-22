import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import SignUp from '../../SignUp';
import useRedirect from '../../hooks/useRedirect';
import { useHistory } from 'react-router-dom';

jest.mock('axios');
jest.mock('../../hooks/useRedirect', () => jest.fn());
jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(),
}));

describe('SignUp Component', () => {
    it('renders correctly and handles form submission', async () => {
        const pushMock = jest.fn();
        useHistory.mockReturnValue({ push: pushMock });
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValueOnce({});

        render(<SignUp />);

        // Fill in the form fields
        const usernameInput = screen.getByPlaceholderText('Username');
        const password1Input = screen.getByPlaceholderText('Password');
        const password2Input = screen.getByPlaceholderText('Confirm password');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(password1Input, { target: { value: 'password' } });
        fireEvent.change(password2Input, { target: { value: 'password' } });

        // Submit the form
        const signUpButton = screen.getByText('Sign Up');
        fireEvent.click(signUpButton);

        // Ensure the form data is correctly sent
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/dj-rest-auth/registration/', {
            username: 'testuser',
            password1: 'password',
            password2: 'password',
        }));

        // Ensure redirection after a successful sign-up
        expect(pushMock).toHaveBeenCalledWith('/signin');
    });

    it('displays error messages from the server', async () => {
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockRejectedValueOnce({
            response: {
                data: {
                    username: ['This field is required.'],
                    password1: ['This field is required.'],
                    password2: ["The two password fields didn't match."],
                    non_field_errors: ['User with this username already exists.'],
                },
            },
        });

        render(<SignUp />);

        // Submit the form
        const signUpButton = screen.getByText('Sign Up');
        fireEvent.click(signUpButton);

        // Ensure error messages are displayed
        await waitFor(() => {
            expect(screen.getByText('This field is required.')).toBeInTheDocument();
            expect(screen.getByText("The two password fields didn't match.")).toBeInTheDocument();
            expect(screen.getByText('User with this username already exists.')).toBeInTheDocument();
        });
    });
});
