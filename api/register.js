export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password required");
  }

  // Dummy save logic (Replace with database logic)
  console.log("Registering:", email, password);

  return res.status(200).send("✅ Registration Successful!");
}
