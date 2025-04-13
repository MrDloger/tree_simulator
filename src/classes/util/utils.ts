export const randomRgbColor = (): string => {
  const red: number = Math.floor(Math.random() * 256);
  const green: number = Math.floor(Math.random() * 256);
  const blue: number = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};
