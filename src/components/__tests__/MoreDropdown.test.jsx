import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MoreDropdown, ProfileEditDropdown } from '../Dropdown'; // Import the components

describe('MoreDropdown Component', () => {
    it('renders correctly', () => {
        const handleEditMock = jest.fn(); // Mock the handleEdit function
        const handleDeleteMock = jest.fn(); // Mock the handleDelete function

        render(
            <MoreDropdown handleEdit={handleEditMock} handleDelete={handleDeleteMock} />
        );

        // Check if the Edit button is displayed
        expect(screen.getByText('Edit')).toBeInTheDocument();

        // Click the Edit button to trigger handleEdit
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

        // Check if handleEdit is called
        expect(handleEditMock).toHaveBeenCalled();
    });

    it('calls handleDelete when Delete button is clicked', () => {
        const handleEditMock = jest.fn(); // Mock the handleEdit function
        const handleDeleteMock = jest.fn(); // Mock the handleDelete function

        render(
            <MoreDropdown handleEdit={handleEditMock} handleDelete={handleDeleteMock} />
        );

        // Click the Delete button to trigger handleDelete
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        // Check if handleDelete is called
        expect(handleDeleteMock).toHaveBeenCalled();
    });
});

describe('ProfileEditDropdown Component', () => {
    it('renders correctly', () => {
        const historyPushMock = jest.fn(); // Mock history.push function

        // Mock the useHistory hook
        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useHistory: () => ({
                push: historyPushMock,
            }),
        }));

        render(
            <ProfileEditDropdown id={1} />
        );

        // Check if the "Edit Profile" button is displayed
        expect(screen.getByText('edit profile')).toBeInTheDocument();

        // Click the "Edit Profile" button to trigger history.push
        const editProfileButton = screen.getByText('edit profile');
        fireEvent.click(editProfileButton);

        // Check if history.push is called with the correct URL
        expect(historyPushMock).toHaveBeenCalledWith('/profiles/1/edit');
    });
});
