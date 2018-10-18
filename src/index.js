document.addEventListener("DOMContentLoaded", function(){
  getAllHogs();

  let form = document.getElementById('hog-form');
  form.addEventListener('submit', submitNewHog);
})


function getAllHogs(){
  let container = document.getElementById('hog-container');

  container.innerHTML = "";


  fetch("http://localhost:3000/hogs").
  then(res => res.json()).
  then(data => {
    data.forEach(hog => renderHog(hog))
  });
}


function renderHog(hog){
  let container = document.getElementById('hog-container');

  let div = document.createElement('div')
  div.classList.add('hog-card');
  div.dataset.id = hog.id

  let image = document.createElement('img');
  image.src = hog.image;

  let p = document.createElement('p');
  p.innerText = `Name: ${hog.name}`;

  let ul = document.createElement('ul');

  let specialty = document.createElement('li');
  specialty.innerText = `Specialty: ${hog.specialty}`;

  let medal = document.createElement('li');
  medal.innerText = `Awards: ${hog["highest medal achieved"]}`;

  let weight = document.createElement('li');
  weight.innerText = `Weight: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`;

  let span = document.createElement('span');
  span.innerText = "greased: ";

  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "greased";
  checkbox.value = "greased";
  checkbox.checked = hog.greased;
  checkbox.id = hog.id;
  checkbox.addEventListener('click', getCurrentGreased)

  let button = document.createElement('button');
  button.innerText = "delete";
  button.id = hog.id;
  button.addEventListener("click", deleteHog);

  container.appendChild(div);
  div.appendChild(image);
  div.appendChild(p);
  div.appendChild(ul);
  ul.appendChild(specialty);
  ul.appendChild(medal);
  ul.appendChild(weight);
  ul.appendChild(span);
  span.appendChild(checkbox);
  div.appendChild(button);
}


function submitNewHog(e){
  e.preventDefault();

  let name = e.currentTarget.children[0].value;
  let specialty = e.currentTarget.children[2].value;
  let medal = e.currentTarget.children[4].value;
  let weight = e.currentTarget.children[6].value;
  let url = e.currentTarget.children[8].value;
  let greased = e.target.children[10].querySelector('input').checked;


  fetch("http://localhost:3000/hogs", {
    method: "POST",

    headers: {
      "Content-Type" : "application/json"
    },

    body: JSON.stringify({
      "name": name,
      "specialty": specialty,
      "greased": greased,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
      "highest medal achieved": medal,
      "image": url
    })

  }).then(res => res.json()).then(data => {

    let form = document.getElementById('hog-form');

    form.reset();

    getAllHogs()})
}


function deleteHog(e){
  e.preventDefault();

  let id = e.target.id

  fetch(`http://localhost:3000/hogs/${id}`, {
    method: "DELETE"
  }).
  then(res => res.json()).
  then(data => getAllHogs())

}


function getCurrentGreased(e){
  
  let id = e.target.id;
  let greased = e.target.checked;

  fetch(`http://localhost:3000/hogs/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type" : "application/json"
      },

      body: JSON.stringify({
        "greased": greased
      })
}).then(res => res.json()).then(data => console.log(data))


}


function toggleGreased(){

}
//make "greased" a checkbox for each hog

// toggle "greased"
