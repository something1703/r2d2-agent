// TODO: This needs proper implementation
export function processData(input: any) {
  console.log("Processing data:", input)
  
  // Missing error handling
  const result = input.map((item: any) => {
    return item.value * 2
  })
  
  console.log("Result:", result)
  return result
}

// FIXME: Add validation
export async function fetchUserData(userId: string) {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
