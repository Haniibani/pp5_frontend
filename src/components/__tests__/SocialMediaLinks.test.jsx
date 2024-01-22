import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SocialMediaLinks from '../SocialMediaLinks';

const mockProfile = {
    facebook_link: 'https://www.facebook.com/user123',
    linkedin_link: 'https://www.linkedin.com/in/user123',
    twitter_link: null,
};

describe('SocialMediaLinks Component', () => {
    it('renders correctly with social media links', () => {
        render(<SocialMediaLinks profile={mockProfile} />);
        
        // Check if social media icons are rendered
        const facebookIcon = screen.getByTestId('facebook-icon');
        const linkedinIcon = screen.getByTestId('linkedin-icon');
        const twitterIcon = screen.getByTestId('twitter-icon');

        expect(facebookIcon).toBeInTheDocument();
        expect(linkedinIcon).toBeInTheDocument();
        expect(twitterIcon).toBeInTheDocument();
    });

    it('renders correctly with missing social media links', () => {
        const mockProfileWithMissingLinks = {
            facebook_link: null,
            linkedin_link: null,
            twitter_link: null,
        };

        render(<SocialMediaLinks profile={mockProfileWithMissingLinks} />);
        
        // Check if social media icons are rendered
        const facebookIcon = screen.getByTestId('facebook-icon');
        const linkedinIcon = screen.getByTestId('linkedin-icon');
        const twitterIcon = screen.getByTestId('twitter-icon');

        expect(facebookIcon).toBeInTheDocument();
        expect(linkedinIcon).toBeInTheDocument();
        expect(twitterIcon).toBeInTheDocument();
    });
});
