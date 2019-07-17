//Defining varibles
const apiData = 'https://randomuser.me/api/?results=12&?inc=picture,name,email,location,cell,noinfo,dob';
// const btn = document.querySelector('button');

// Make an AJAX request
let people = [];
fetch(apiData)
    .then(response => response.json())
    .then(function(json) {
        people = (json.results);
// console.log(people.gender);
//     .then(getProfiles);
    console.log(people);

  //Gallery HTML
    function galleryHTML () {
        for (let i = 0; i < people.length; i++) {
            const gallery = $('#gallery');
            let galleryHTML = '';
            galleryHTML +=
            `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${people[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${people[i].name.first} ${people[i].name.last}</h3>
                <p class="card-text">${people[i].email}</p>
                <p class="card-text cap">${people[i].location.city}, ${people[i].location.state}</p>
            </div>
            </div>`;

            gallery.append(galleryHTML);
        }
    }
    galleryHTML();

    //Modal HTML
    function modalHTML () {
        for (let i = 0; i < people.length; i++) {
            let modalHTML = '';
            modalHTML +=
            `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${people[i].picture.large}"https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${people[i].name}name</h3>
                    <p class="modal-text">${people[i].email}email</p>
                    <p class="modal-text cap">${people[i].location.city}city</p>
                    <hr>
                    <p class="modal-text">${people[i].cell}(555) 555-5555</p>
                    <p class="modal-text">${people[i].location.street.city.state.postcode}123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: ${people[i].dob.date}10/21/2015</p>
                </div>
            </div>`;
        }
        gallery.append(modalHTML);
    }
    modalHTML();

    $('#modal-close-btn').on('change', function () {

    });

    $('.card-info-container').on('change', function () {

    });
});

// function getJSON(apiData) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', apiData);
//     xhr.onload = () => {
//       if(xhr.status === 200) {
//         let data = JSON.parse(xhr.responseText);
//         console.log(data);
//       }
//     };
//     xhr.send();
//   }
  
// getJSON(apiData);

//   function getProfiles(json) {
//       const profiles = json.people.map(person => {
//             return fetch(apiData)
//                 .then(response =>response.json())
//       });
//       return Promise.all(profiles);
//   }
// $('#gallery').append('<div class="card">');
// $('.card').append('<div class="card-img-container">');
// $('.card-img-container').append('<img class="card-img" src="https://placehold.it/90x90" alt="profile picture">');
// // $(`</div>`);

// $('.card').append('<div class="card-info-container">');
// $('.card-info-container').append('<h3 id="name" class="card-name cap">first last</h3>');
// $('.card-info-container').append('<p class="card-text">email</p>');
// $('.card-info-container').append('<p class="card-text cap">city, state</p>');
// // $(`</div>`);


//   // Generate the markup for each profile
//   function generateHTML(data) {
//     const section = document.createElement('section');
//     peopleList.appendChild(section);
//     section.innerHTML = `
//       <img src=${data.thumbnail.source}>
//       <h2>${data.title}</h2>
//       <p>${data.description}</p>
//       <p>${data.extract}</p>
//     `;
//   }

// btn.on('click', () => getJSON(apiData));
// $.ajax({
//     url: 'https://randomuser.me/api/?results=12&?inc=picture,name,email,location,cell,noinfo,dob',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });
// function getJSON (url) {
//     const xhr = XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             let data = JSON.parse(xhr.responseText);
//             data.map(p => console.log(p));
//         }
//     }
//     xhr.send();
// }

// getJSON();
// alert('welcome to page!');