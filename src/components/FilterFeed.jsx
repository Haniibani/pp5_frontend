import React, { useState, useCallback } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import appStyles from "../styles/App.module.css";
import { Container, Row, Col } from 'react-bootstrap';

const FilterFeed = ({ setFilter, mobile }) => {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id;

    const [isCheckedLikes, setIsCheckedLikes] = useState(false);
    const [isCheckedFollowed, setIsCheckedFollowed] = useState(false);

    const handleLikesChange = useCallback(() => {
        setIsCheckedLikes(prev => {
            const newChecked = !prev;
            setFilter(newChecked ? `likes__owner__profile=${profile_id}&ordering=-likes__created_at` : '');
            return newChecked;
        });
        if (isCheckedFollowed) {
            setIsCheckedFollowed(false);
        }
    }, [isCheckedFollowed, setFilter, profile_id]);

    const handleFollowedChange = useCallback(() => {
        setIsCheckedFollowed(prev => {
            const newChecked = !prev;
            setFilter(newChecked ? `owner__followed__owner__profile=${profile_id}` : '');
            return newChecked;
        });
        if (isCheckedLikes) {
            setIsCheckedLikes(false);
        }
    }, [isCheckedLikes, setFilter, profile_id]);

    return (
        <Container className={`${appStyles.Content} mb-2 ${mobile ? "d-lg-none text-center my-3" : ""}`}>
            <p className="h4">Filter feed</p>
            <Row>
                <Col>
                    <input
                        type="checkbox"
                        checked={isCheckedLikes}
                        onChange={handleLikesChange}
                    /> Filter on Liked
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="checkbox"
                        checked={isCheckedFollowed}
                        onChange={handleFollowedChange}
                    /> Show posts from Followed Accounts
                </Col>
            </Row>
        </Container>
    );
}

export default FilterFeed;
