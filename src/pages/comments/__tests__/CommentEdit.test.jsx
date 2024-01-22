import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentEdit from '../../CommentEdit';
import { axiosRes } from '../../../clients/axios';

jest.mock('../../../clients/axios', () => ({
    put: jest.fn(),
}));

const mockShowEditForm = jest.fn();

const defaultProps = {
    id: 1,
    content: 'Test Comment',
    setShowEditForm: mockShowEditForm,
};

describe('CommentEdit Component', () => {
    it('renders with initial content and handles form submission', async () => {
        const { container } = render(<CommentEdit {...defaultProps} />);

        expect(screen.getByDisplayValue('Test Comment')).toBeInTheDocument();

        axiosRes.put.mockResolvedValueOnce({});

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Updated Comment' },
        });

        fireEvent.click(screen.getByText('save'));

        await waitFor(() => {
            expect(axiosRes.put).toHaveBeenCalledWith('/comments/1/', {
                content: 'Updated Comment',
            });
        });

        expect(mockShowEditForm).toHaveBeenCalledWith(false);
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('cancels the edit form', () => {
        render(<CommentEdit {...defaultProps} />);

        fireEvent.click(screen.getByText('cancel'));

        expect(mockShowEditForm).toHaveBeenCalledWith(false);
    });

    it('disables save button when content is empty', () => {
        render(<CommentEdit {...defaultProps} content="" />);

        expect(screen.getByText('save')).toBeDisabled();
    });
});
