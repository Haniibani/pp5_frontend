import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../../Profile';
import { useParams } from 'react-router';
import { axiosReq } from '../../../clients/axios';
import { useProfileData, useSetProfileData } from '../../../contexts/ProfileDataContext';

jest.mock('react-router', () => ({
    useParams: jest.fn(),
}));

jest.mock('../../../clients/axios', () => ({
    get: jest.fn(),
}));

jest.mock('../../../contexts/ProfileDataContext', () => ({
    useSetProfileData: jest.fn(),
    useProfileData: jest.fn(),
}));

const mockSetProfileData = jest.fn();
const mockHandleFollow = jest.fn();
const mockHandleUnfollow = jest.fn();
const mockUseProfileData = {
    pageProfile: { results: [] },
};
const mockUseCurrentUser = { username: 'testuser' };

describe('Profile Component', () => {
    beforeEach(() => {
        useParams.mockClear();
        axiosReq.get.mockClear();
        useSetProfileData.mockClear();
        useProfileData.mockClear();
        mockSetProfileData.mockClear();
        mockHandleFollow.mockClear();
        mockHandleUnfollow.mockClear();

        useParams.mockReturnValue({ id: '1' });
        axiosReq.get.mockResolvedValueOnce({ data: { id: '1', owner: 'testuser' } });
        axiosReq.get.mockResolvedValueOnce({ data: { results: [] } });
        useSetProfileData.mockReturnValue({
            setProfileData: mockSetProfileData,
            handleFollow: mockHandleFollow,
            handleUnfollow: mockHandleUnfollow,
        });
        useProfileData.mockReturnValue(mockUseProfileData);
    });

    it('fetches profile data and renders when loaded', async () => {
        render(<Profile />);

        await waitFor(() => {
            expect(axiosReq.get).toHaveBeenCalledWith('/profiles/1/');
            expect(axiosReq.get).toHaveBeenCalledWith('/posts/?owner__profile=1');
            expect(screen.getByText('ProfileInformation')).toBeInTheDocument();
            expect(screen.getByText('ProfilePosts')).toBeInTheDocument();
        });
    });

    it('renders spinner when data is loading', async () => {
        axiosReq.get.mockResolvedValueOnce({ data: { id: '1', owner: 'testuser' } });
        axiosReq.get.mockResolvedValueOnce({ data: { results: [] } });
        useProfileData.mockReturnValue({});
        render(<Profile />);

        await waitFor(() => {
            expect(screen.getByText('spinner')).toBeInTheDocument();
        });
    });

    it('displays an error when the server returns an error', async () => {
        axiosReq.get.mockRejectedValueOnce({ response: { status: 500 } });

        render(<Profile />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching profile data:')).toBeInTheDocument();
        });
    });
});
