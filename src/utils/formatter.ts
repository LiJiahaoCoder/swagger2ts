const INDENT_CHARS = '    ';

export function formatJSON(json: string) {
  if (!json) return '';

  let result = '',
    inString = false,
    indentLevel = 0;

  for (let i = 0; i < json.length; ++i) {
    const current = json.charAt(i);

    switch (current) {
      case '{':
      case '[':
        result = appendChar(result, current);
        if (!inString) {
          result += changeToNextLine(++indentLevel);
        }
        break;
      case '}':
      case ']':
        if (!inString) {
          result += changeToNextLine(--indentLevel);
        }
        result = appendChar(result, current);
        break;
      case ',':
        result = appendChar(result, current);
        if (!inString) {
          result += changeToNextLine(indentLevel);
        }
        break;
      case ':':
        result = appendChar(result, current);
        if (!inString) {
          result += ' ';
        }
        break;
      case ' ':
      case '\n':
      case '\t':
        if (inString) {
          result = appendChar(result, current);
        }
        break;
      case '"':
        if (i > 0 && json.charAt(i - 1) !== '\\') {
          inString = !inString;
        }
        result = appendChar(result, current);
        break;
      default:
        result = appendChar(result, current);
        break;
    }
  }

  return result;
}

function repeat(char: string, count: number) {
  return new Array(count + 1).join(char);
}

function changeToNextLine(level: number) {
  return '\n' + repeat(INDENT_CHARS, level);
}

function appendChar(result: string, current: string) {
  return result + current;
}
