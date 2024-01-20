import { useParams } from "react-router";

const Post = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{`Hello from post:${id}`}</h1>
    </div>
  );
};

export default Post
