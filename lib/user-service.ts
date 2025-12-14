// TODO: implement proper authentication
// FIXME: this is a temporary solution

export async function fetchUserData(userId: string) {
  console.log("Fetching user data for:", userId);
  
  // Missing error handling!
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data: any = response.json(); // Using 'any' is bad practice
  
  console.log("User data:", data);
  
  // TODO: add validation
  return data;
}

export function processUserData(data: any) {
  console.log("Processing user data...");
  
  // No null checks!
  const userName = data.user.name;
  const userEmail = data.user.email;
  
  // FIXME: hardcoded values
  const apiKey = "sk_test_1234567890";
  
  return {
    name: userName,
    email: userEmail,
    timestamp: new Date()
  };
}

// Debug code left in
if (process.env.NODE_ENV !== "production") {
  console.log("Development mode - using test data");
}
