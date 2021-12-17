const INDENT_CHARS = '    ';

export const formatJSON = (jsonString: string | null) => {
  if (!jsonString) return '';

  let i = 0,
    result = '',
    indentLevel = 0,
    inString = false,
    currentChar = null;

  for (i = 0; i < jsonString.length; i += 1) {
    currentChar = jsonString.charAt(i);

    switch (currentChar) {
      case '{':
      case '[':
        if (!inString) {
          result += currentChar + '\n' + repeat(INDENT_CHARS, indentLevel + 1);
          indentLevel += 1;
        } else {
          result += currentChar;
        }
        break;
      case '}':
      case ']':
        if (!inString) {
          indentLevel -= 1;
          result += '\n' + repeat(INDENT_CHARS, indentLevel) + currentChar;
        } else {
          result += currentChar;
        }
        break;
      case ',':
        if (!inString) {
          result += ',\n' + repeat(INDENT_CHARS, indentLevel);
        } else {
          result += currentChar;
        }
        break;
      case ':':
        if (!inString) {
          result += ': ';
        } else {
          result += currentChar;
        }
        break;
      case ' ':
      case '\n':
      case '\t':
        if (inString) {
          result += currentChar;
        }
        break;
      case '"':
        if (i > 0 && jsonString.charAt(i - 1) !== '\\') {
          inString = !inString;
        }
        result += currentChar;
        break;
      default:
        result += currentChar;
        break;
    }
  }

  return result;
};

const repeat = (char: string, count: number) => {
  return new Array(count + 1).join(char);
};
