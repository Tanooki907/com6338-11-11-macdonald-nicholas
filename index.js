const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'
var data
let title = document.createElement('h2')
let att = document.createElement('h3')

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = () => {
  const title = makeTag('h2')
  const empBy = makeTag('em')
  const stringcombine = str => strB => str + strB
  const makeh3 = makeTag('h3')
  const writeAuthor = pipe(stringcombine(empBy('by ')), makeh3)
  var formattedPoem = data[0].lines.join('<br>')
  formattedPoem = formattedPoem.replaceAll('<br><br>', '</p><p>')
  console.log(formattedPoem)
  return `${title(data[0].title)}
  ${writeAuthor(data[0].author)}
  <p>${formattedPoem}</p>
  `
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  data = await getJSON(poemURL)
  console.log(data)
  poemEl.innerHTML = makePoemHTML(data)
}
