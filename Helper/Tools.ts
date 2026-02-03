export async function getEnv(name: string): Promise<string> {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in env variables`);
  }
  return value;
}

export async function convertHexToRGB(hex: string): Promise<string> {
  // Remove the # if it exists
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
};