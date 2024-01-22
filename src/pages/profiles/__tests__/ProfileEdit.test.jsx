import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfileEdit from '../../ProfileEdit';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from '../../../clients/axios';
import { useCurrentUser, useSetCurrentUser } from '../../../contexts/CurrentUserContext';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
    useHistory: jest.fn(),
}));

jest.mock('../../../clients/axios', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

jest.mock('../../../contexts/CurrentUserContext', () => ({
    useCurrentUser: jest.fn(),
    useSetCurrentUser: jest.fn(),
}));

const mockUseParams = { id: '1' };
const mockUseHistory = { goBack: jest.fn() };
const mockUseCurrentUser = {
    profile_id: '1',
};
const mockUseSetCurrentUser = jest.fn();
const mockSetProfileData = jest.fn();

describe('ProfileEdit Component', () => {
    beforeEach(() => {
        useParams.mockClear();
        useHistory.mockClear();
        axiosReq.get.mockClear();
        axiosReq.put.mockClear();
        useCurrentUser.mockClear();
        useSetCurrentUser.mockClear();

        useParams.mockReturnValue(mockUseParams);
        useHistory.mockReturnValue(mockUseHistory);
        useCurrentUser.mockReturnValue(mockUseCurrentUser);
        useSetCurrentUser.mockReturnValue(mockUseSetCurrentUser);
        axiosReq.get.mockResolvedValueOnce({
            data: {
                name: 'Test User',
                content: 'This is a test user.',
                image: 'test-image-url.jpg',
                facebook_link: 'https://facebook.com/testuser',
                linkedin_link: 'https://linkedin.com/in/testuser',
                twitter_link: 'https://twitter.com/testuser',
            },
        });
        axiosReq.put.mockResolvedValueOnce({
            data: {
                image: 'updated-image-url.jpg',
            },
        });
    });

    it('fetches profile data and renders the form', async () => {
        render(<ProfileEdit />);

        await waitFor(() => {
            expect(axiosReq.get).toHaveBeenCalledWith('/profiles/1/');
            expect(screen.getByText('Bio')).toBeInTheDocument();
            expect(screen.getByText('Facebook Link')).toBeInTheDocument();
            expect(screen.getByText('LinkedIn Link')).toBeInTheDocument();
            expect(screen.getByText('Twitter Link')).toBeInTheDocument();
        });
    });

    it('updates profile data when the form is submitted', async () => {
        render(<ProfileEdit />);

        await waitFor(() => {
            const bioInput = screen.getByLabelText('Bio');
            fireEvent.change(bioInput, { target: { value: 'Updated bio content' } });

            const facebookInput = screen.getByLabelText('Facebook Link');
            fireEvent.change(facebookInput, { target: { value: 'https://facebook.com/updateduser' } });

            const linkedinInput = screen.getByLabelText('LinkedIn Link');
            fireEvent.change(linkedinInput, { target: { value: 'https://linkedin.com/in/updateduser' } });

            const twitterInput = screen.getByLabelText('Twitter Link');
            fireEvent.change(twitterInput, { target: { value: 'https://twitter.com/updateduser' } });

            const submitButton = screen.getByText('save');
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(axiosReq.put).toHaveBeenCalledWith('/profiles/1/', {
                name: 'Test User',
                content: 'Updated bio content',
                image: undefined,
                facebook_link: 'https://facebook.com/updateduser',
                linkedin_link: 'https://linkedin.com/in/updateduser',
                twitter_link: 'https://twitter.com/updateduser',
            });
            expect(mockUseSetCurrentUser).toHaveBeenCalledWith({
                ...mockUseCurrentUser,
                profile_image: 'updated-image-url.jpg',
            });
            expect(mockUseHistory.goBack).toHaveBeenCalled();
        });
    });

    it('displays an error when the server returns an error', async () => {
        axiosReq.put.mockRejectedValueOnce({ response: { status: 500 } });

        render(<ProfileEdit />);

        await waitFor(() => {
            const submitButton = screen.getByText('save');
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Error updating profile data:')).toBeInTheDocument();
        });
    });
});
