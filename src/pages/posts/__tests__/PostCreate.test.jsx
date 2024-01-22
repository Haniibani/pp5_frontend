import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostCreate from '../../PostCreate';
import { axiosReq } from '../../../clients/axios';

jest.mock('../../../clients/axios', () => ({
    post: jest.fn(),
}));

const mockPush = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react-router', () => ({
    useHistory: () => ({
        push: mockPush,
        goBack: mockGoBack,
    }),
}));

const defaultProps = {};

describe('PostCreate Component', () => {
    beforeEach(() => {
        axiosReq.post.mockClear();
        mockPush.mockClear();
        mockGoBack.mockClear();
    });

    it('renders the form and handles form submission', async () => {
        axiosReq.post.mockResolvedValueOnce({ data: { id: 1 } });

        const { container } = render(<PostCreate {...defaultProps} />);

        // Simulate user input
        fireEvent.change(screen.getByLabelText('Title'), {
            target: { name: 'title', value: 'Test Title' },
        });
        fireEvent.change(screen.getByLabelText('Content'), {
            target: { name: 'content', value: 'Test Content' },
        });

        // Submit the form
        fireEvent.submit(screen.getByText('Create'));

        await waitFor(() => {
            expect(axiosReq.post).toHaveBeenCalledWith('/posts/', {
                title: 'Test Title',
                content: 'Test Content',
                image: '',
                tag: '',
            });
        });

        expect(mockPush).toHaveBeenCalledWith('/posts/1');
    });

    it('cancels the post creation', () => {
        render(<PostCreate {...defaultProps} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('displays an error when the server returns an error', async () => {
        axiosReq.post.mockRejectedValueOnce({
            response: {
                status: 401,
                data: { title: ['Title is required'] },
            },
        });

        render(<PostCreate {...defaultProps} />);
        fireEvent.submit(screen.getByText('Create'));

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
        });
    });
});
