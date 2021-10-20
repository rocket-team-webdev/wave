export function generatePossessive(name) {
  if (name.slice(-1) === "s") {
    return `${name}'`;
  }
  return `${name}'s`;
}
