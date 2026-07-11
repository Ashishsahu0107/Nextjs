const singleProfilePost = async (props) => {

    const post = await props.params;

    console.log(post);

    return (
        <div>
            <h1>This is user profile page</h1>
            <p>Username: {user.username}</p>
        </div>
    )

  
}

export default singleProfilePost;