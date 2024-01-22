import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosRes from '../clients/axios';
import { BrowserRouter } from 'react-router-dom';
import Post from '../Post';

jest.mock('../clients/axios', () => ({
    delete: jest.fn(() => Promise.resolve()),
}));

const mockPost = {
    id: 1,
    owner: 'John Doe',
    profile_id: 123,
    profile_image: 'avatar.jpg',
    comments_count: 5,
    likes_count: 10,
    like_id: null,
    title: 'Test Post',
    content: 'Test post content',
    image: 'post-image.jpg',
    updated_at: '2022-01-25',
    postPage: true,
    setPosts: jest.fn(),
    tag: 'Test Tag',
};

describe('Post Component', () => {
    it('renders correctly', () => {
        render(
            <BrowserRouter>
                <Post {...mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test post content')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls handleEdit when MoreDropdown is clicked', () => {
        const historyPushMock = jest.fn();
        const historyGoBackMock = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useHistory: () => ({
                push: historyPushMock,
                goBack: historyGoBackMock,
            }),
        }));

        render(
            <BrowserRouter>
                <Post {...mockPost} />
            </BrowserRouter>
        );

        const moreDropdown = screen.getByText('...');
        fireEvent.click(moreDropdown);

        expect(historyPushMock).toHaveBeenCalledWith('/posts/1/edit');
    });

    it('calls handleDelete when MoreDropdown is clicked', async () => {
        const historyPushMock = jest.fn();
        const historyGoBackMock = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useHistory: () => ({
                push: historyPushMock,
                goBack: historyGoBackMock,
            }),
        }));

        render(
            <BrowserRouter>
                <Post {...mockPost} />
            </BrowserRouter>
        );

        const moreDropdown = screen.getByText('...');
        fireEvent.click(moreDropdown);

        expect(axiosRes.delete).toHaveBeenCalledWith('/posts/1/');
        await expect(historyGoBackMock).toHaveBeenCalled();
    });
});
