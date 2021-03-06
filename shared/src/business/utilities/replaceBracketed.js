/**
 * Replaces a series of [square bracketed strings] with values
 * @param {string} template
 * @param  {...any} values
 */
const replaceBracketed = (template, ...values) => {
  var bracketsMatcher = /\[.*?\]/;
  while (bracketsMatcher.test(template)) {
    template = template.replace(bracketsMatcher, values.shift() || '');
  }
  return template;
};
exports.replaceBracketed = replaceBracketed;
