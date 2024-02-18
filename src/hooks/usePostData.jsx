import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router";

import { axiosReq } from "../clients/axios";

const usePostData = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [{ data: post }, { data: commentsData }] = await Promise.all([
        axiosReq.get(`/posts/${id}`),
        axiosReq.get(`/comments/?post=${id}`),
      ]);
      setPost(post);
      setComments(commentsData.results);
    } catch (err) {
      // Handle error
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    id,
    post,
    setPost,
    comments,
    setComments,
    refetch,
  };
};

export default usePostData;
