const form = document.getElementById('form')
const notes = document.getElementById('notes');
const logoutLink = document.getElementById('logout');


    window.onload = function() {
        const isAuthenticated = sessionStorage.getItem('authenticated');

        if (isAuthenticated === 'true') {
            document.getElementById('loggedInPage').style.display = 'block';
            document.getElementById('logout').style.display = 'block';
        }
    };

    logoutLink.addEventListener('click', function (event){
        event.preventDefault();
        sessionStorage.removeItem('authenticated');
        document.getElementById('loggedInPage').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
        window.location.href="HomePage.html"
    });

    class Rank {
        constructor(rank, notes) {

            this.rank = rank;
            this.notes = notes;
        }
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
       // Get the value of the selected radio button
        let selectedValue = document.querySelector('input[name="rank"]:checked').value;

        if(selectedValue!== ''){
            const newRank = new Rank(selectedValue, notes);
            document.getElementById("form").reset();
            alert("הדירוג נקלט בהצלחה!")
        }
    });


    // Function to parse query parameters from URL
    function parseQueryString() {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return {
            name: urlParams.has('name') ? urlParams.get('name') : "",
            date: urlParams.has('date') ? urlParams.get('date') : "",
            city: urlParams.has('city') ? urlParams.get('city') : "",
            time: urlParams.has('time') ? urlParams.get('time') : "",
            chef: urlParams.has('chef') ? urlParams.get('chef') : "",
            price: urlParams.has('price') ? urlParams.get('price') : "",
            photo: urlParams.has('photo') ? urlParams.get('photo') : "",
            background_color: urlParams.has('background_color') ? urlParams.get('background_color') : "",
            location: urlParams.has('location') ? urlParams.get('location') : ""
        };

    }
    console.log(parseQueryString());

    // Retrieve workshop from query string
    const workshop = parseQueryString();


     // Display workshop details in HTML
    const workshopDetailsDiv = document.getElementById('workshopDetails');
    workshopDetailsDiv.innerHTML = `
        <div class="workshop-banner" style="background-color: ${workshop.background_color}">
            <img class="workshopImg" src=${workshop.photo} alt="${workshop.name} Workshop Img"/>
        
            <div class="banner-section">
                <h1>${workshop.name}</h1>
                <h2>${workshop.date}</h2>
            </div>
            <div class="banner-section">
                <h2>${workshop.city}</h2>
                <h2>${workshop.time}</h2>
                <h2>${workshop.chef}</h2>
            </div>
            <div>
                <div class="price-banner">
                    <h3>${workshop.price} שח</h3>
                </div>
            </div>
        </div>
    `;
