let pageCounter = 1;
let animalContainer = document.getElementById('animal-info'); 
let btn = document.getElementById('btn');
 
btn.addEventListener('click', () => {

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => { // or xhr.onload
    //console.log(xhr.readyState);

    /**
     * [0] Request not established
     * [1] Server connection established
     * [2] Request recieved
     * [3] Processing request
     * [4] Request is finished and response is ready
     */
    if(xhr.readyState === 4 && xhr.status === 200) { // if request is finished and response is ready and status is 200
      let data = JSON.parse(xhr.responseText);
      render(data);
    } else {
      console.log("connected to server but it returned an error");
    }
  };

  xhr.onerror = () => {
    console.log("connection error");
  }

  // open(method, URL, ASYNC)
  xhr.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+pageCounter+ '.json', true);

  xhr.send();
  if(pageCounter === 3) {
    document.getElementById('btn').disabled = true;
  }
  pageCounter++;
});


let c = 444;
render = (data) => {
  let htmlString = "";

  for(let i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + "I like ";
    for(let ii = 0; ii < data[i].foods.likes.length; ii++) {
      if(ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += ' and ' + data[i].foods.likes[ii];        
      } 
    }
    htmlString += " and dislikes ";
    for(let ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      if(ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += ' and ' + data[i].foods.likes[ii];        
      } 
    }
    htmlString+= '</p>'

  }
  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
