export default async function asyncWait(milliseconds: number): Promise<boolean> {
  return await new Promise((resolve, reject) => setTimeout(() => {resolve(true)}, milliseconds));
}