import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useProfileData } from '../../contexts/ProfileDataContext';
import PopularProfiles from '../PopularProfiles';

jest.mock('../../contexts/ProfileDataContext', () => ({
    useProfileData: jest.fn(() => ({
        popularProfiles: {
            results: [
                { id: 1, name: 'Profile 1' },
                { id: 2, name: 'Profile 2' },
                { id: 3, name: 'Profile 3' },
            ],
        },
    })),
}));

describe('PopularProfiles Component', () => {
    it('renders correctly on desktop', () => {
        render(<PopularProfiles mobile={false} />);
        
        expect(screen.getByText('Popular profiles')).toBeInTheDocument();
        expect(screen.getByText('Profile 1')).toBeInTheDocument();
        expect(screen.getByText('Profile 2')).toBeInTheDocument();
        expect(screen.getByText('Profile 3')).toBeInTheDocument();
    });

    it('renders correctly on mobile', () => {
        render(<PopularProfiles mobile={true} />);
        
        expect(screen.getByText('Popular profiles')).toBeInTheDocument();
        expect(screen.getByText('Profile 1')).toBeInTheDocument();
        expect(screen.getByText('Profile 2')).toBeInTheDocument();
        expect(screen.getByText('Profile 3')).toBeInTheDocument();
    });

    it('renders spinner when popularProfiles is empty', () => {
        useProfileData.mockReturnValueOnce({ popularProfiles: {} });
        
        render(<PopularProfiles mobile={false} />);
        
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
