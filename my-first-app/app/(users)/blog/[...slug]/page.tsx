interface PageProps {
  params: {
    slug?: string[];
  };
}

const BlogPage = ({ params }: PageProps) => {
  return (
    <div>
      <h1>Optional Catch All</h1>

      {params.slug ? (
        params.slug.map((item, index) => (
          <p key={index}>{item}</p>
        ))
      ) : (
        <p>No slug provided</p>
      )}
    </div>
  );
}

export default BlogPage;