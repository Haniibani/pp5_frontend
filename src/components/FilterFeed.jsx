import React, { useState, useCallback } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { useCurrentUser } from '../contexts/CurrentUserContext';

import appStyles from "../styles/App.module.css";

import tags from '../constants/tags';

const FilterFeed = ({ setFilter, mobile }) => {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id;

    const [isCheckedLikes, setIsCheckedLikes] = useState(false);
    const [isCheckedFollowed, setIsCheckedFollowed] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');

    const handleLikesChange = useCallback(() => {
        setIsCheckedLikes(prev => {
            const newChecked = !prev;
            setFilter(newChecked ? `likes__owner__profile=${profile_id}&ordering=-likes__created_at` : '');
            return newChecked;
        });
        if (isCheckedFollowed) {
            setIsCheckedFollowed(false);
        }

        if (selectedTag !== '') {
            setSelectedTag('');
        }

    }, [isCheckedFollowed, setFilter, profile_id, selectedTag]);

    const handleFollowedChange = useCallback(() => {
        setIsCheckedFollowed(prev => {
            const newChecked = !prev;
            setFilter(newChecked ? `owner__followed__owner__profile=${profile_id}` : '');
            return newChecked;
        });
        if (isCheckedLikes) {
            setIsCheckedLikes(false);
        }

        if (selectedTag !== '') {
            setSelectedTag('');
        }

    }, [isCheckedLikes, setFilter, profile_id, selectedTag]);

    const handleTagChange = useCallback((e) => {
        const selectedValue = e.target.value;
        setSelectedTag(selectedValue);
        setFilter(`tag=${selectedValue}`)

        if (isCheckedFollowed) {
            setIsCheckedFollowed(false);
        }

        if (isCheckedLikes) {
            setIsCheckedLikes(false);
        }


    }, [isCheckedFollowed, isCheckedLikes]);

    if (!currentUser) return null;

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
            <Row>
                <Col>
                    <label htmlFor="tagSelect">Filter on Tag: </label>
                    <select
                        id="tagSelect"
                        value={selectedTag}
                        onChange={handleTagChange}
                    >
                        <option value="">Select a Tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
        </Container>
    );
}

export default FilterFeed;
