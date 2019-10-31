let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "database.json");
xhr.send();
xhr.onload = () => {
  database = JSON.parse(xhr.responseText);
}

function getGifs(searchTags) {
  return database.filter(gif => {
    for (let tag of searchTags)
      if (!gif.tags.includes(tag))
        return false;
    return true;
  });
}

let textbox = document.getElementById('search')
let submitButton = document.getElementById('submit');

textbox.addEventListener("keyup", (e) => {
  if (e.keyCode === 13)
    submitButton.click();
});

submitButton.addEventListener('click', () => {
  let searchTags = new Set(textbox.value.split(/\s+/).filter(x => x != ''));
  if (searchTags.size == 0)
    return;

  let content = document.getElementById('content');
  while (content.firstChild) {
   content.firstChild.remove();
  }

  let gifResults = getGifs(searchTags);
  for (let gif of gifResults) {
    let img = document.createElement("img");
    img.src = gif.url;
    img.title = 'Imgur: ' + gif.url.substring(18, 25) + ' Tags: ' + gif.tags.join(", ");

    content.appendChild(img);
  }
});
