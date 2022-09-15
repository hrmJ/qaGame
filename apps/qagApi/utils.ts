//asldkj
export function handleDbError(e: unknown) {
  console.log(e);
  throw new Error("Error handling an sql request");
}
