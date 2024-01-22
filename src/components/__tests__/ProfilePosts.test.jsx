import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePosts from '../ProfilePosts';

const mockProfilePosts = {
    results: [
        {
            id: 1,
            owner: 'User 1',
            title: 'Post 1',
            content: 'Content 1',
            likes_count: 10,
            like_id: null,
            comments_count: 5,
            image: 'post1.jpg',
            updated_at: '2022-01-25',
        },
        {
            id: 2,
            owner: 'User 2',
            title: 'Post 2',
            content: 'Content 2',
            likes_count: 15,
            like_id: null,
            comments_count: 7,
            image: 'post2.jpg',
            updated_at: '2022-01-24',
        },
    ],
    next: 'next-page-url',
};

const mockSetProfilePosts = jest.fn();

jest.mock('../utils/fetchMoreData', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('ProfilePosts Component', () => {
    it('renders correctly with posts', () => {
        render(
            <ProfilePosts profilePosts={mockProfilePosts} setProfilePosts={mockSetProfilePosts} />
        );

        expect(screen.getByText('Posts')).toBeInTheDocument();
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('User 2')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('renders correctly with no posts', () => {
        const mockEmptyProfilePosts = { results: [], next: null };

        render(
            <ProfilePosts profilePosts={mockEmptyProfilePosts} setProfilePosts={mockSetProfilePosts} />
        );

        expect(screen.getByText('Posts')).toBeInTheDocument();
        expect(screen.getByText("No results found, user hasn't posted yet.")).toBeInTheDocument();
    });

    it('calls fetchMoreData when scrolling', () => {
        render(
            <ProfilePosts profilePosts={mockProfilePosts} setProfilePosts={mockSetProfilePosts} />
        );

        fireEvent.scroll(window, { target: { scrollY: 1000 } });

        // Check if fetchMoreData is called
        expect(require('../utils/fetchMoreData').default).toHaveBeenCalledWith(mockProfilePosts, mockSetProfilePosts);
    });
});
