export const formatJSON = (jsonString: string | null) => {
  if (!jsonString) return '';

  return jsonString
          .replace(/\{/g, '{\n')
          .replace(/\}/g, '\n}')
          .replace(/\,/g, ',\n')
          .replace(/\:/g, ': ');
};