//In order to create 2 letter abbreviations for States, I created a function to provide to do that. I will use it later on in my Modal.
function stateAbbr(stateFullName) {
    return stateList[stateFullName];
  }
  stateList = {
    'arizona': 'AZ',
    'alabama': 'AL',
    'alaska': 'AK',
    'arkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY'
  }
// Fetching an API. I specified the aspects I need for every person.
// Changing the results to json format.
// Also, have an error if the fetch API request did not go through
// Populate the people array with people and their information.
// Called createGallery to show the gallery with the folks fetched.
let people = [];
fetch('https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,cell,noinfo,dob')
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log('Looks like there was a problem', error))
    .then(function (json) {
        people = (json.results)
        console.log(people);

        createGallery(people);

        searchHTML();
    });
// Checking to see if the fetch didn't have any issues.
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Gallery HTML
// I also input areas that I want to enter the profile info for each person.
function createGallery(m) {
    for (let i = 0; i < m.length; i++) {
        let galleryHTML =
        `<div class="card" index="${i}">
            <div class="card-img-container">
                <img class="card-img" src=${m[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${m[i].name.first} ${m[i].name.last}</h3>
                <p class="card-text">${m[i].email}</p>
                <p class="card-text cap">${m[i].location.city}, ${m[i].location.state}</p>
            </div>
        </div>`;

        $('#gallery').append(galleryHTML);
    }

    // This function will populate the modal with the specific person clicked on. 
    // While the element does not have the 'card' class, keep searching by checking it's parent element.
    // If the element does have class 'card' then return the element.
    function iterativeSearch (element) {
        while (!element.hasClass('card')) {
            element = element.parent();
        } 
        return element;
    }
    
    // Creating a click function to open the modal and show it. 
    // When a person is clicked, take it's index value and that will be the person you choose from the people array.
    // Create a modal for the chosen person.
    $('.card').on('click', function (event) {
        $('.modal-container').show();
        let clicked = iterativeSearch($(event.target)).attr('index');
        console.log(clicked);
        let chosenPerson = people[clicked];
        createModal(chosenPerson, Number(clicked));
        // console.log(chosenPerson);
    });

}

// Modal HTML
// Create the modal.
// I also inputted areas that I want to enter the profile info for each person.
function createModal(person, index) {
    let options = { date: 'short' };
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
                    <p class="modal-text cap">${person.location.street}, ${person.location.city}, ${stateAbbr(person.location.state)} ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${(new Date(person.dob.date)).toLocaleDateString('en-US', options)}</p>
                </div>
                <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
            </div>`;
    $('.modal-container').remove();
    $('body').append(modalHTML);

// Close modal
// When you click the "X" it will close the modal.
    $('#modal-close-btn').on('click', function () {
        $('.modal-container').hide();
    });

// Previous modal
// When you click the "PREV" it will take you to the previous person's modal.
    $('#modal-prev').on('click', function () {
        let prev;
        if (index == 0) {
            prev = people.length - 1;
        } else {
            prev = index - 1;
        }
        let chosenPerson = people[prev];
        createModal(chosenPerson, prev);
    });

// Next modal
// When you click the "NEXT" it will take you to the next person's modal.
    $('#modal-next').on('click', function () {
        let next;
        if (index == people.length - 1) {
            next = 0
        } else {
            next = index + 1;
        }
        let chosenPerson = people[next];
        createModal(chosenPerson, next);
    });
}

// I created a search button to search for a specific person.
// The search button will hide all the cards and only show the person you searched for by filtering through the array. If it's blank, it will show you the gallery.
function searchHTML() {
    let searchHTML =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
        $('.search-container').append(searchHTML);

        $('#search-submit').on('click', function () {
            $('.card').hide();
            let searchQuery = $('.search-input').val().toLowerCase();
            let searchedName = people.filter(m => m.name.first.includes(searchQuery) || m.name.last.includes(searchQuery));
            if(searchQuery == ""){            
                createGallery(people);
            } else {
                createGallery(searchedName);
            } 
        });
    }