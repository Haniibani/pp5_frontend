import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfileInformation from '../ProfileInformation';

const mockProfile = {
    id: 1,
    owner: 'Test User',
    image: 'profile-image.jpg',
    posts_count: 10,
    followers_count: 20,
    following_count: 5,
    following_id: null,
    content: 'Test user description',
};

describe('ProfileInformation Component', () => {
    it('renders correctly when not following', () => {
        render(
            <ProfileInformation
                profile={mockProfile}
                isOwner={false}
                handleFollow={jest.fn()}
                handleUnfollow={jest.fn()}
                currentUser={{ username: 'current_user' }}
            />
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Test user description')).toBeInTheDocument();
        expect(screen.getByText('follow')).toBeInTheDocument();
        expect(screen.getByText('10 posts')).toBeInTheDocument();
        expect(screen.getByText('20 followers')).toBeInTheDocument();
        expect(screen.getByText('5 following')).toBeInTheDocument();
    });

    it('renders correctly when following', () => {
        const mockProfileFollowing = { ...mockProfile, following_id: 2 }; // Set following_id to simulate following

        render(
            <ProfileInformation
                profile={mockProfileFollowing}
                isOwner={false}
                handleFollow={jest.fn()}
                handleUnfollow={jest.fn()}
                currentUser={{ username: 'current_user' }}
            />
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Test user description')).toBeInTheDocument();
        expect(screen.getByText('unfollow')).toBeInTheDocument();
        expect(screen.getByText('10 posts')).toBeInTheDocument();
        expect(screen.getByText('20 followers')).toBeInTheDocument();
        expect(screen.getByText('5 following')).toBeInTheDocument();
    });

    it('calls handleFollow when follow button is clicked', () => {
        const handleFollowMock = jest.fn();

        render(
            <ProfileInformation
                profile={mockProfile}
                isOwner={false}
                handleFollow={handleFollowMock}
                handleUnfollow={jest.fn()}
                currentUser={{ username: 'current_user' }}
            />
        );

        const followButton = screen.getByText('follow');
        fireEvent.click(followButton);

        // Check if handleFollow is called with the correct profile
        expect(handleFollowMock).toHaveBeenCalledWith(mockProfile);
    });

    it('calls handleUnfollow when unfollow button is clicked', () => {
        const handleUnfollowMock = jest.fn();
        const mockProfileFollowing = { ...mockProfile, following_id: 2 }; // Set following_id to simulate following

        render(
            <ProfileInformation
                profile={mockProfileFollowing}
                isOwner={false}
                handleFollow={jest.fn()}
                handleUnfollow={handleUnfollowMock}
                currentUser={{ username: 'current_user' }}
            />
        );

        const unfollowButton = screen.getByText('unfollow');
        fireEvent.click(unfollowButton);

        // Check if handleUnfollow is called with the correct profile
        expect(handleUnfollowMock).toHaveBeenCalledWith(mockProfileFollowing);
    });
});
