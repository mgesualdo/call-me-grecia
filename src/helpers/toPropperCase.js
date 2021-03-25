export const toPropperCaseAndTrim = (string, justFirstWord = false) => {
  if (!string) return ''
  var sentence = string.toLowerCase().trim().split(' ')

  for (var i = 0; i < sentence.length; i++) {
    if (justFirstWord) {
      sentence[i] =
        i === 0
          ? sentence[i][0].toUpperCase() + sentence[i].slice(1)
          : sentence[i]
    } else {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
  }
  return sentence.join(' ')
}
