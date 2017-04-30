let { Variable,
  Input,
  Button,
  not,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Div,
  P,
  A,
  Span,
  Strong,
  TFoot,
  H1,
  H2,
  Textarea
} = alkali

const append = (target, elements) => {
  if (target == null || elements == null)
    return
  if (_.isArray(elements)) {
    for (const element of elements) {
      target.append(element)
    }
  } else {
    target.append(elements)
  }
  return elements
}

const empty = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const remove = (element) => {
  element.classList.remove('visible')
  after(1, () => element.remove())
}

const add = (parent, text) => {
  count = 0
  for (const word of text.split(' ')) {
    after(count, () => {
      const el = append(parent, new Span(`.event.${dictionary[word] || 'nothing'}`, {
        innerHTML: word
      }))
      after(.01, () => el.classList.add('visible'))
    })
    count += .17
  }
}

const seconds = (secs) => secs * 1000

const after = (secs, action) => {
  window.setTimeout(action, seconds(secs))
}

const routine = (action, interval) => {
  window.setInterval(action, interval + Math.random() * 10000)
}