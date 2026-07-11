import { use } from "react";

const singleProfilePost = (props: PageProps<'/users/[username]/posts/[postId]'>) => {
    const post = use(props.params);

    console.log(post);

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold">This is user profile page</h1>
            <p className="mt-2 text-slate-350">User Id: {post.postId} user name: {post.username}</p>
        </div>
    )
}

export default singleProfilePost;