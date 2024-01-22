import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

jest.mock('../../contexts/CurrentUserContext', () => ({
    useCurrentUser: jest.fn(() => ({
        username: 'current_user',
    })),
}));

jest.mock('../../contexts/ProfileDataContext', () => ({
    useSetProfileData: jest.fn(() => ({
        handleFollow: jest.fn(),
        handleUnfollow: jest.fn(),
    })),
}));

const mockProfile = {
    id: 1,
    following_id: null,
    image: 'profile-image.jpg',
    owner: 'Test User',
};

describe('Profile Component', () => {
    it('renders correctly when not following', () => {
        render(
            <BrowserRouter>
                <Profile profile={mockProfile} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('follow')).toBeInTheDocument();
    });

    it('renders correctly when following', () => {
        mockProfile.following_id = 2; // Set following_id to simulate following

        render(
            <BrowserRouter>
                <Profile profile={mockProfile} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('unfollow')).toBeInTheDocument();
    });

    it('calls handleFollow when follow button is clicked', () => {
        render(
            <BrowserRouter>
                <Profile profile={mockProfile} />
            </BrowserRouter>
        );

        const followButton = screen.getByText('follow');
        fireEvent.click(followButton);

        // Check if handleFollow is called with the correct profile
        expect(useSetProfileData().handleFollow).toHaveBeenCalledWith(mockProfile);
    });

    it('calls handleUnfollow when unfollow button is clicked', () => {
        mockProfile.following_id = 2; // Set following_id to simulate following

        render(
            <BrowserRouter>
                <Profile profile={mockProfile} />
            </BrowserRouter>
        );

        const unfollowButton = screen.getByText('unfollow');
        fireEvent.click(unfollowButton);

        // Check if handleUnfollow is called with the correct profile
        expect(useSetProfileData().handleUnfollow).toHaveBeenCalledWith(mockProfile);
    });
});
