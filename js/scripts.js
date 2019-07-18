//Defining varibles
const apiData = 'https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,cell,noinfo,dob';
// const btn = document.querySelector('button');

// Make an AJAX request
let people = [];
fetch(apiData)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log('Looks like there was a problem', error))
    .then(function (json) {
        people = (json.results)
        console.log(people);

        createGallery();

        searchHTML();
    });
//checking to see if the fetch didn't have any issues
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//Gallery HTML
function createGallery() {
    for (let i = 0; i < people.length; i++) {
        const galleryDiv = $('#gallery');
        let galleryHTML =
        `<div class="card" index="${i}">
            <div class="card-img-container">
                <img class="card-img" src=${people[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${people[i].name.first} ${people[i].name.last}</h3>
                <p class="card-text">${people[i].email}</p>
                <p class="card-text cap">${people[i].location.city}, ${people[i].location.state}</p>
            </div>
        </div>`;

        galleryDiv.append(galleryHTML);
    }

    function iterativeSearch (element) {
        while (!element.hasClass('card')) {
            element = element.parent();
        } 
        return element;
    }
    
    $('.card').on('click', function (event) {
        $('.modal-container').show();
        let clicked = iterativeSearch($(event.target)).attr('index');
        console.log(clicked);
        let chosenPerson = people[clicked];
        createModal(chosenPerson);
    });

}


// function recursiveSearch (element) {
//     if (element.hasClass('card')) {
//         return element;
//     } else {
//         return recursiveSearch(element.parent());
//     }
// }


//Modal HTML
function createModal(person) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let modalHTML = 
            `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${person.cell}</p>
                    <p class="modal-text">${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${(new Date(person.dob.date)).toLocaleDateString('en-US', options)}</p>
                </div>
                <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
            </div>`;
    $('.modal-container').remove();
    $('body').append(modalHTML);

//close modal
    $('#modal-close-btn').on('click', function () {
        $('.modal-container').hide();
    });

    // $('.modal-container').on('click', function (event) {
    //     if ($(event.target).className === 'modal-container') {
    //       modalHTML.style.display = 'none';
    //     }
    // });
}

$('#modal-prev').on('click', function () {
   createModal(index-1);
});

$('#modal-next').on('click', function () {
    createModal(index-1);
 });

function searchHTML() {
    let searchHTML =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
        
    $('.search-container').append(searchHTML);
}

$('#search-submit').on('submit', function () {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = $('myInput');
    filter = input.value.toUpperCase();
    ul = $('ul');
    li = $('li');
    ul.append(li);

    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
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