import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosRes from '../../../clients/axios';
import CommentCreate from '../../CommentCreate';

jest.mock('../../clients/axios');

describe('CommentCreate Component', () => {
    it('renders correctly and handles form submission', async () => {
        const post = 1;
        const setPost = jest.fn();
        const setComments = jest.fn();
        const profileImage = 'avatar.jpg';
        const profile_id = 123;

        render(
            <CommentCreate
                post={post}
                setPost={setPost}
                setComments={setComments}
                profileImage={profileImage}
                profile_id={profile_id}
            />
        );

        // Fill in the form field
        const commentInput = screen.getByPlaceholderText('my comment...');
        fireEvent.change(commentInput, { target: { value: 'Test comment' } });

        // Mock the Axios post request
        axiosRes.post.mockResolvedValueOnce({ data: { content: 'Test comment' } });

        // Submit the form
        const submitButton = screen.getByText('post');
        fireEvent.click(submitButton);

        // Ensure the form data is correctly sent
        await waitFor(() => {
            expect(axiosRes.post).toHaveBeenCalledWith('/comments/', {
                content: 'Test comment',
                post: 1,
            });
        });

        // Ensure the setComments and setPost functions are called
        expect(setComments).toHaveBeenCalledWith([{
            content: 'Test comment',
        }]);
        expect(setPost).toHaveBeenCalledWith(expect.objectContaining({
            comments_count: 1,
        }));
    });

    it('disables the submit button when content is empty', async () => {
        const post = 1;
        const setPost = jest.fn();
        const setComments = jest.fn();
        const profileImage = 'avatar.jpg';
        const profile_id = 123;

        render(
            <CommentCreate
                post={post}
                setPost={setPost}
                setComments={setComments}
                profileImage={profileImage}
                profile_id={profile_id}
            />
        );

        // Submit the form without filling in the comment field
        const submitButton = screen.getByText('post');
        fireEvent.click(submitButton);

        // Ensure the submit button is disabled
        await waitFor(() => {
            expect(axiosRes.post).not.toHaveBeenCalled();
        });
    });
});
