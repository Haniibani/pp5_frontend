import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LikeButton from '../LikeButton'; // Import the component

describe('LikeButton Component', () => {
    it('renders correctly when not liked', () => {
        const setPostsMock = jest.fn();

        render(
            <LikeButton isOwner={false} likeId={null} setPosts={setPostsMock} postId={1} />
        );

        expect(screen.getByTestId('like-button')).toBeInTheDocument();

        const likeButton = screen.getByTestId('like-button');
        fireEvent.click(likeButton);

        expect(setPostsMock).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders correctly when already liked', () => {
        const setPostsMock = jest.fn();

        render(
            <LikeButton isOwner={false} likeId={1} setPosts={setPostsMock} postId={1} />
        );

        expect(screen.getByTestId('like-button')).toBeInTheDocument();

        const likeButton = screen.getByTestId('like-button');
        fireEvent.click(likeButton);

        expect(setPostsMock).toHaveBeenCalledWith(expect.any(Function));
    });

    it("renders correctly when the owner of the post", () => {
        render(
            <LikeButton isOwner={true} likeId={null} setPosts={() => {}} postId={1} />
        );

        expect(screen.queryByTestId('like-button')).toBeNull();

        fireEvent.mouseEnter(screen.getByTestId('tooltip'));
        expect(screen.getByText("You can't like your own post!")).toBeInTheDocument();
    });
});
