const singleProfilePost = async (props: PageProps<'/users/[username]'>) => {
    const params = await props.params;
    const username = params.username;

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold">This is user profile page</h1>
            <p className="mt-2 text-slate-350">Username: {username}</p>
        </div>
    );
}

export default singleProfilePost;