const url = "http://localhost:54321";
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

async function fetchSchemaInfo() {
  const result = await fetch(`${url}/rest/v1/?apikey=${apikey}`);
  const data = await result.json();
  console.log(data);
}

fetchSchemaInfo();
