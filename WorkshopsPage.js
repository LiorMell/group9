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
    });



    // Define multiple workshop objects
    const sushi_workshop ={ name: 'סדנאת סושי',
                                    date: "2024-02-29",
                                    time: "19:00",
                                    chef: 'אבי ברק',
                                    price: 350,
                                    city: "נתניה",
                                    photo:"img/Sushi.png",
                                    background_color:"pink"
    }

    const meat_workshop ={ name: 'סדנאת בשרים',
                                    date: "2024-03-05",
                                    time: "19:00",
                                    chef: 'יהודה לביא',
                                    price: 350,
                                    city: "תל אביב",
                                    photo:"img/Meat.png",
                                    background_color:"lightblue"

    }

    const italian_workshop ={ name: 'סדנא איטלקית',
                                    date: "2024-03-19",
                                    time: "20:00",
                                    chef: 'חיים כהן',
                                    price: 300,
                                    city: "ירושלים",
                                    photo:"img/Italian.jpg",
                                    background_color:"lightgoldenrodyellow"

    }

    const workshops = [sushi_workshop, meat_workshop, italian_workshop];

     // Function to display workshop information
    function displayWorkshopInfo(filteredWorkshops) {
        let workshopInfo = "";
        filteredWorkshops.forEach(function(workshop, index) {
            workshopInfo += `
                <a href="WorkshopSubscriptionPage.html?name=${workshop.name}&date=${workshop.date}&city=${workshop.city}&time=${workshop.time}&chef=${workshop.chef}
                                &price=${workshop.price}&photo=${workshop.photo}&location=בית ציוני אמריקה&background_color=${workshop.background_color}">
                <div class="workshop-banner" style="background-color: ${workshop.background_color}">
                    <img class="workshopImg" src=${workshop.photo} alt="next Workshop Img">
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
                    
                    </div>
                        <div class="price-banner">
                             <h3>${workshop.price}</h3>
                        </div>
                    </div>
                </div>
                </a>
            `;
        });
        document.getElementById("workshopInfo").innerHTML = workshopInfo;
    }
            // Function to filter workshops
    function filterWorkshops() {
        let nameFilter = document.getElementById("nameFilter").value.toLowerCase();
        let dateFilter = document.getElementById("dateFilter").value;
        let chefFilter = document.getElementById("chefFilter").value.toLowerCase();
        let cityFilter = document.getElementById("cityFilter").value.toLowerCase();

        let filteredWorkshops = workshops.filter(function(workshop) {
            return (workshop.name.toLowerCase().includes(nameFilter)) &&
                   (workshop.date === dateFilter || dateFilter === "") &&
                   (workshop.chef.toLowerCase().includes(chefFilter)) &&
                   (workshop.city.toLowerCase().includes(cityFilter));
        });

        displayWorkshopInfo(filteredWorkshops);
    }

    // Add event listeners to filter input fields
    document.getElementById("nameFilter").addEventListener("input", filterWorkshops);
    document.getElementById("dateFilter").addEventListener("input", filterWorkshops);
    document.getElementById("chefFilter").addEventListener("input", filterWorkshops);
    document.getElementById("cityFilter").addEventListener("input", filterWorkshops);

    // Initial display
    displayWorkshopInfo(workshops); // Display all workshops initially
