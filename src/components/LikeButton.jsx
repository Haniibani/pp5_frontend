import { useCallback } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Heart from "../icons/Heart";
import HeartOutlined from "../icons/HeartOutlined";
import { axiosRes } from "../clients/axios";
import styles from "../styles/Button.module.css"; // Assuming you have a CSS module for styles

const LikeButton = ({ isOwner, likeId, setPosts, postId }) => {
  const updateLikes = useCallback(
    (count, itemLikeId) => {
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes_count: post.likes_count + count,
                like_id: itemLikeId,
              }
            : post
        ),
      }));
    },
    [setPosts, postId]
  );

  const handleLikeStatus = useCallback(async () => {
    try {
      if (likeId) {
        await axiosRes.delete(`/likes/${likeId}/`);
        updateLikes(-1, null);
      } else {
        const { data } = await axiosRes.post("/likes/", { post: postId });
        updateLikes(1, data.id);
      }
    } catch (err) {
      console.error(err);
    }
  }, [likeId, postId, updateLikes]);

  if (isOwner) {
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>You can't like your own post!</Tooltip>}
      >
        <span className={styles.Cursor}>
          <HeartOutlined />
        </span>
      </OverlayTrigger>
    );
  }

  return (
    <span onClick={handleLikeStatus} className={styles.likeButton}>
      {likeId ? <Heart /> : <HeartOutlined />}
    </span>
  );
};

export default LikeButton;
