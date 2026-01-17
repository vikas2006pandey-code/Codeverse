export type TerminalLevel = {
  level: number;
  instruction: string;
  expectedCommand: string;
  successMessage: string;
  errorMessage: string;
};

export const terminalLevels: TerminalLevel[] = [
  {
    level: 1,
    instruction: 'Create a paragraph element.',
    expectedCommand: 'html create p',
    successMessage: 'Success! `p` element created.',
    errorMessage: 'Error: Unknown command. Try `html create p`.',
  },
  {
    level: 2,
    instruction: 'Set the color of the new paragraph to red.',
    expectedCommand: 'css color red',
    successMessage: 'Success! Color set to red.',
    errorMessage: 'Error: Invalid syntax. Use `css color <color>`.',
  },
  {
    level: 3,
    instruction: 'Print "Hello World" to the console.',
    expectedCommand: 'js print "Hello World"',
    successMessage: 'Success! "Hello World" printed.',
    errorMessage: 'Error: Command failed. Use `js print "<message>"`.',
  },
  {
    level: 4,
    instruction: 'Create a main heading element.',
    expectedCommand: 'html create h1',
    successMessage: 'Success! `h1` element created.',
    errorMessage: 'Error: Unknown command. Try `html create h1`.',
  },
  {
    level: 5,
    instruction: 'Change the background color to blue.',
    expectedCommand: 'css background-color blue',
    successMessage: 'Success! Background color set to blue.',
    errorMessage: 'Error: Invalid property. Use `css background-color <color>`.',
  },
  {
    level: 6,
    instruction: 'Declare a variable named "score".',
    expectedCommand: 'js declare score',
    successMessage: 'Success! Variable "score" declared.',
    errorMessage: 'Error: Invalid command. Use `js declare <variableName>`.',
  },
];
