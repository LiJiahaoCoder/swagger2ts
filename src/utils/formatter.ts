const INDENT_CHARS = '    ';

export const formatJSON = (json: string | null) => {
  if (!json) return '';

  let i = 0,
    result = '',
    inString = false,
    indentLevel = 0;

  for (i = 0; i < json.length; ++i) {
    const current = json.charAt(i);

    switch (current) {
      case '{':
      case '[':
        result += current;
        if (!inString) {
          result += changeToNextLine(++indentLevel);
        }
        break;
      case ',':
        result += current;
        if (!inString) {
          result += changeToNextLine(indentLevel);
        }
        break;
      case ':':
        result += current;
        if (!inString) {
          result += ' ';
        }
        break;
      case ' ':
      case '\n':
      case '\t':
        if (inString) {
          result += current;
        }
        break;
      case '}':
      case ']':
        if (!inString) {
          result += changeToNextLine(--indentLevel);
        }
        result += current;
        break;
      case '"':
        if (i > 0 && json.charAt(i - 1) !== '\\') {
          inString = !inString;
        }
        result += current;
        break;
      default:
        result += current;
        break;
    }
  }

  return result;
};

const repeat = (char: string, count: number) => {
  return new Array(count + 1).join(char);
};

const changeToNextLine = (level: number) => {
  return '\n' + repeat(INDENT_CHARS, level);
};
