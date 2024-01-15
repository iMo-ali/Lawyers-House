//THIS IS A TEST FOR API DATA FETCHING

// You can use This json placeholder api for testing "https://jsonplaceholder.typicode.com/posts"

export default async function Home() {
  const response = await fetch("http://localhost:8000/all-lawyers");
  const data = await response.json();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((lawyer: { title: string; body: string; id: string }) => (
        <div key={lawyer.id}>
          <h1>{lawyer.title}</h1>
          <p>{lawyer.body}</p>
          <br />
        </div>
      ))}
    </main>
  );
}
