const form = document.getElementById('form')
const customer_first_name = document.getElementById('customer_first_name');
const customer_last_name = document.getElementById('customer_last_name');
const customer_email = document.getElementById('customer_email');
const customer_phone = document.getElementById('customer_phone');
const customer_allergy = document.getElementById('customer_allergy');
const logoutLink = document.getElementById('logout');
const isAuthenticated = sessionStorage.getItem('authenticated');

    window.onload = function() {

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
        window.location.href="WorkshopsPage.html"
    });

    class Subscription {
        constructor(customer_first_name, customer_last_name, customer_email, customer_phone, customer_allergy) {

            this.customer_first_name = customer_first_name;
            this.customer_last_name = customer_last_name;
            this.customer_email = customer_email;
            this.customer_phone = customer_phone;
            this.customer_allergy = customer_allergy;
        }
    }


    form.addEventListener('submit', e => {
        e.preventDefault();
        // validateInputs();

        if (isAuthenticated === 'true') {
            if (validateInputs()) {
                const newSubscription = new Subscription(customer_first_name.value, customer_last_name.value, customer_email.value, customer_phone.value, customer_allergy.value);
                document.getElementById("form").reset();
                alert("ההרשמה בוצעה בהצלחה!");
            }
        } else {
            alert("נא להתחבר כדי להרשם לסדנה."); // You can replace this with your desired action, such as redirecting to the login page
        }
    });


    const setError = (element, message) => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error')

            errorDisplay.innerText = message;
            inputControl.classList.add('error');
            inputControl.classList.remove('success');
        }
        const setSuccess = (element) => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error')

            errorDisplay.innerText = '';
            inputControl.classList.add('success');
            inputControl.classList.remove('error');
        }


        const validateInputs = () => {
            const customer_firstnameValue = customer_first_name.value.trim();
            const customer_lastnameValue = customer_last_name.value.trim();
            const emailValue = customer_email.value.trim();
            const customer_phoneValue = customer_phone.value.trim();
            let ans = true;

            if(emailValue === '') {
                setError(customer_email, 'נא למלא דואר אלקטרוני');
                ans = false;
            } else if (!isValidEmail(emailValue)) {
                setError(customer_email, 'כתובת דואר אלקטרוני לא תקינה');
                ans = false;
            } else {
                setSuccess(customer_email);
            }

            if(customer_firstnameValue === ''){
                setError(customer_first_name, 'נא למלא שם פרטי')
                ans = false;
            } else if (!validateNameField(customer_firstnameValue)){
                setError(customer_first_name, "נא להכניס אותיות בלבד")
                ans = false;
            } else {
                setSuccess(customer_first_name);
            }

            if(customer_lastnameValue === ''){
                setError(customer_last_name, 'נא למלא שם משפחה')
                ans = false;
            } else if (!validateNameField(customer_lastnameValue)){
                setError(customer_last_name, "נא להכניס אותיות בלבד")
                ans = false;
            } else {
                setSuccess(customer_last_name);
            }

            if(customer_phoneValue === ''){
                setError(customer_phone, 'נא למלא מספר טלפון')
                ans = false;
            } else if ((customer_phoneValue.length !== 10) || (!validateNumber(customer_phoneValue))){
                setError(customer_phone, "מספר טלפון חייב להכיל 10 ספרות בלבד")
                ans = false;
            } else {
                setSuccess(customer_phone);
            }

            return ans;
        };


      const isValidEmail = email => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function validateNameField(name) {
            let lettersOnly = /^[a-zA-Zא-ת\s]*$/;
            return lettersOnly.test(name);
        }

        function validateNumber(phone) {
            let phoneRegex = /^[0-9]+$/; // This regex matches any sequence of digits
            return phoneRegex.test(phone)
        }

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
    // Quantity counter functionality


    const plus = document.querySelector(".plus")
    const minus = document.querySelector(".minus")
    const num = document.querySelector(".num")
    let a = 1;

    plus.addEventListener("click", () => {
        a++;
        num.innerText = a;
        console.log(a);
    });
    minus.addEventListener("click", () => {
        if (a > 1) {
            a--;
        }

        num.innerText = a;
        console.log(a);
    });