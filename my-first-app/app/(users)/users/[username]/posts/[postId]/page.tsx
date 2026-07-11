import { use } from "react";

const singleProfilePost = (props) => {

    const post = use(props.params);

    console.log(post);

    return (
        <div>
            <h1>This is user profile page</h1>
            <p>User Id: {post.postId} user name: {post.username }</p>
        </div>
    )
}

export default singleProfilePost;