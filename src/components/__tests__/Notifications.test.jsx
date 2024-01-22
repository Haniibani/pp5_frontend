import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axiosReq from '../../clients/axios'; 
import Notifications from '../Notifications';

jest.mock('../../clients/axios', () => ({
    get: jest.fn(() =>
        Promise.resolve({
            data: {
                results: [
                    { id: 1, message: 'Notification 1', read: false },
                    { id: 2, message: 'Notification 2', read: true },
                ],
            },
        })
    ),
    patch: jest.fn(() => Promise.resolve()),
}));

describe('Notifications Component', () => {
    it('renders correctly', async () => {
        render(
            <BrowserRouter>
                <Notifications />
            </BrowserRouter>
        );
        
        // Wait for notifications to be fetched
        await waitFor(() => {
            expect(screen.getByText('Notifications')).toBeInTheDocument();
        });
        
        // Check if the Bell icon and notification count are displayed
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Notification 1')).toBeInTheDocument();
        expect(screen.queryByText('Notification 2')).not.toBeInTheDocument();
    });

    it('marks notifications as read when opened', async () => {
        render(
            <BrowserRouter>
                <Notifications />
            </BrowserRouter>
        );
        
        // Wait for notifications to be fetched
        await waitFor(() => {
            expect(screen.getByText('Notifications')).toBeInTheDocument();
        });

        // Click the Bell icon to open the dropdown
        const bellIcon = screen.getByText('Notifications');
        fireEvent.click(bellIcon);

        // Wait for notifications to be marked as read
        await waitFor(() => {
            expect(axiosReq.patch).toHaveBeenCalledWith('/notifications/1', { read: true });
        });
    });
});