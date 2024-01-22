import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import axiosReq from '../../clients/axios';
import Post from '../../Post';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../../clients/axios');

describe('Post Component', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ id: '1' });
    });

    it('fetches post and comments data and renders correctly', async () => {
        // Mock Axios responses
        axiosReq.get.mockResolvedValueOnce({ data: { title: 'Test Post' } });
        axiosReq.get.mockResolvedValueOnce({
            data: { results: [{ id: 1, content: 'Test Comment 1' }] },
        });

        render(
            <Router>
                <Post />
            </Router>
        );

        // Wait for data to load
        await waitFor(() => {
            expect(axiosReq.get).toHaveBeenCalledTimes(2);
        });

        // Check if post and comment are rendered
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test Comment 1')).toBeInTheDocument();
    });

    it('handles error when fetching data', async () => {
        // Mock Axios responses to simulate an error
        axiosReq.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        render(
            <Router>
                <Post />
            </Router>
        );

        // Wait for error handling
        await waitFor(() => {
            expect(axiosReq.get).toHaveBeenCalledTimes(2);
        });

        // Check if error message is displayed
        expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });

    it('displays "No comments..." message when no comments are available', async () => {
        // Mock Axios responses to simulate no comments
        axiosReq.get.mockResolvedValueOnce({ data: { title: 'Test Post' } });
        axiosReq.get.mockResolvedValueOnce({
            data: { results: [] },
        });

        render(
            <Router>
                <Post />
            </Router>
        );

        // Wait for data to load
        await waitFor(() => {
            expect(axiosReq.get).toHaveBeenCalledTimes(2);
        });

        // Check if "No comments... yet" message is displayed
        expect(screen.getByText("No comments... yet")).toBeInTheDocument();
    });
});
