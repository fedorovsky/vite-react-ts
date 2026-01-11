type User = {
  id: number;
  name: string;
};

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
  }));
}
