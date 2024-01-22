import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostEdit from '../../PostEdit'; 
import { axiosReq } from '../../../clients/axios';

jest.mock('../../../clients/axios', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

const mockPush = jest.fn();
const mockGoBack = jest.fn();
const mockRevokeObjectURL = jest.fn();
const mockCreateObjectURL = jest.fn();
const mockGetCurrentFiles = jest.fn();

const mockHistory = {
    push: mockPush,
    goBack: mockGoBack,
};

jest.mock('react-router', () => ({
    useHistory: () => mockHistory,
    useParams: () => ({ id: '1' }),
}));

global.URL = {
    revokeObjectURL: mockRevokeObjectURL,
    createObjectURL: mockCreateObjectURL,
};

global.HTMLInputElement.prototype.files = {
    0: { name: 'test.png', size: 1024, type: 'image/png' },
    length: 1,
};

const defaultProps = {};

describe('PostEdit Component', () => {
    beforeEach(() => {
        axiosReq.get.mockClear();
        axiosReq.put.mockClear();
        mockPush.mockClear();
        mockGoBack.mockClear();
        mockRevokeObjectURL.mockClear();
        mockCreateObjectURL.mockClear();
        mockGetCurrentFiles.mockClear();
    });

    it('renders the form with existing post data', async () => {
        axiosReq.get.mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Test Title',
                content: 'Test Content',
                image: 'test.png',
                tag: 'Test Tag',
                is_owner: true,
            },
        });

        render(<PostEdit {...defaultProps} />);

        await waitFor(() => {
            expect(screen.getByLabelText('Title')).toHaveValue('Test Title');
            expect(screen.getByLabelText('Content')).toHaveValue('Test Content');
            expect(screen.getByLabelText('Tag')).toHaveValue('Test Tag');
            expect(screen.getByRole('img')).toHaveAttribute('src', 'test.png');
        });
    });

    it('cancels the post edit', () => {
        render(<PostEdit {...defaultProps} />);
        fireEvent.click(screen.getByText('cancel'));
        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('displays an error when the server returns an error', async () => {
        axiosReq.get.mockRejectedValueOnce({
            response: {
                status: 401,
                data: { title: ['Title is required'] },
            },
        });

        render(<PostEdit {...defaultProps} />);

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
        });
    });

    it('handles form submission with image', async () => {
        axiosReq.get.mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Test Title',
                content: 'Test Content',
                image: 'test.png',
                tag: 'Test Tag',
                is_owner: true,
            },
        });
        axiosReq.put.mockResolvedValueOnce({});

        render(<PostEdit {...defaultProps} />);

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { name: 'title', value: 'New Title' },
        });

        fireEvent.change(screen.getByLabelText('Content'), {
            target: { name: 'content', value: 'New Content' },
        });

        fireEvent.change(screen.getByLabelText('Tag'), {
            target: { name: 'tag', value: 'New Tag' },
        });

        fireEvent.click(screen.getByText('save'));

        await waitFor(() => {
            expect(axiosReq.put).toHaveBeenCalledWith('/posts/1/', {
                title: 'New Title',
                content: 'New Content',
                tag: 'New Tag',
            });
            expect(mockPush).toHaveBeenCalledWith('/posts/1');
        });
    });

    it('handles form submission without image', async () => {
        axiosReq.get.mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Test Title',
                content: 'Test Content',
                image: 'test.png',
                tag: 'Test Tag',
                is_owner: true,
            },
        });
        axiosReq.put.mockResolvedValueOnce({});

        render(<PostEdit {...defaultProps} />);

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { name: 'title', value: 'New Title' },
        });

        fireEvent.change(screen.getByLabelText('Content'), {
            target: { name: 'content', value: 'New Content' },
        });

        fireEvent.change(screen.getByLabelText('Tag'), {
            target: { name: 'tag', value: 'New Tag' },
        });

        fireEvent.click(screen.getByText('save'));

        await waitFor(() => {
            expect(axiosReq.put).toHaveBeenCalledWith('/posts/1/', {
                title: 'New Title',
                content: 'New Content',
                tag: 'New Tag',
            });
            expect(mockPush).toHaveBeenCalledWith('/posts/1');
        });
    });

    it('handles form submission with image change', async () => {
        axiosReq.get.mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Test Title',
                content: 'Test Content',
                image: 'test.png',
                tag: 'Test Tag',
                is_owner: true,
            },
        });
        axiosReq.put.mockResolvedValueOnce({});

        render(<PostEdit {...defaultProps} />);

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { name: 'title', value: 'New Title' },
        });

        fireEvent.change(screen.getByLabelText('Content'), {
            target: { name: 'content', value: 'New Content' },
        });

        fireEvent.change(screen.getByLabelText('Tag'), {
            target: { name: 'tag', value: 'New Tag' },
        });

        fireEvent.change(screen.getByLabelText('Change the image'), {
            target: {
                files: [
                    { name: 'new-image.png', size: 2048, type: 'image/png' },
                ],
            },
        });

        fireEvent.click(screen.getByText('save'));

        await waitFor(() => {
            expect(axiosReq.put).toHaveBeenCalledTimes(1);

            // Verify that image URL is revoked and recreated
            expect(mockRevokeObjectURL).toHaveBeenCalledWith('test.png');
            expect(mockCreateObjectURL).toHaveBeenCalledWith('new-image.png');
        });
    });

    it('handles form submission with image change and no files selected', async () => {
        axiosReq.get.mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Test Title',
                content: 'Test Content',
                image: 'test.png',
                tag: 'Test Tag',
                is_owner: true,
            },
        });
        axiosReq.put.mockResolvedValueOnce({});

        render(<PostEdit {...defaultProps} />);

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { name: 'title', value: 'New Title' },
        });

        fireEvent.change(screen.getByLabelText('Content'), {
            target: { name: 'content', value: 'New Content' },
        });

        fireEvent.change(screen.getByLabelText('Tag'), {
            target: { name: 'tag', value: 'New Tag' },
        });

        // Simulate selecting no files
        fireEvent.change(screen.getByLabelText('Change the image'), {
            target: {
                files: [],
            },
        });

        fireEvent.click(screen.getByText('save'));

        await waitFor(() => {
            expect(axiosReq.put).toHaveBeenCalledTimes(1);

            // Verify that image URL is not revoked and not recreated
            expect(mockRevokeObjectURL).not.toHaveBeenCalled();
            expect(mockCreateObjectURL).not.toHaveBeenCalled();
        });
    });
});
