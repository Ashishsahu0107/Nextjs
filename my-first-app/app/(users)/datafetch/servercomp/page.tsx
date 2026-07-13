interface DataFetchServerProps {
  user?: {
    name?: string;
    gender?: string;
    probability?: number;
  };
}

const DataFetchServer = async ({ user }: DataFetchServerProps) => {
  const userName = user?.name ?? "ashish";

  if (!userName) {
    return <div>user not defined</div>;
  }

  const res = await fetch(
    `https://api.genderize.io?name=${encodeURIComponent(userName)}`,
  );

  const data = await res.json();

    console.log(data);

    const confidencePercentage = data.probability * 100;

  return (
    <div>
      <h1>Data Fetching</h1>
      <p>Name: {userName}</p>
      <p>Predicted Gender: {data.gender ?? "N/A"}</p>
      <p>Probability: {confidencePercentage ?? "N/A"}</p>
    </div>
  );
};

export default DataFetchServer;
