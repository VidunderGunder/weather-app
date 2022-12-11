export function celciusToFahrenheit(celcius: number): number {
  return celcius * 1.8 + 32;
}

export function fahrenheitToCelcius(fahrenheit: number): number {
  return (fahrenheit - 32) / 1.8;
}
