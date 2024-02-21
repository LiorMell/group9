const login_email = document.getElementById("login_email")
const login_password = document.getElementById("login_password")
const form = document.getElementById("form")
const error = document.getElementById("error")
const logoutLink = document.getElementById('logout');


    document.addEventListener('DOMContentLoaded', function() {
        const isAuthenticated = sessionStorage.getItem('authenticated');
        console.log(isAuthenticated)
        if (isAuthenticated === 'true') {
            document.getElementById('loggedInPage').style.display = 'block';
            document.getElementById('logout').style.display = 'block';
        }
    });

    logoutLink.addEventListener('click', function (event){
        event.preventDefault();
        sessionStorage.removeItem('authenticated');
        document.getElementById('loggedInPage').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(validateInputs()){
            document.getElementById("form").reset();
            document.getElementById('loggedInPage').style.display = 'block';
            document.getElementById('logout').style.display = 'block';
            sessionStorage.setItem('authenticated', 'true');
        }
    })


    //validateInputs
    const validateInputs = () =>{
        const emailValue = login_email.value.trim();
        const passwordValue = login_password.value.trim();
        let ans = true;

         if(emailValue === '') {
            setError(login_email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(login_email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(login_email);
        }

        if(passwordValue === ''){
            setError(login_password, 'נא למלא סיסמא')
            ans = false;
        } else if (passwordValue.length < 6){
            setError(login_password, 'סיסמא חייבת להיות לפחות 6 תווים.')
            ans = false;
        } else {
            setSuccess(login_password);
        }

        return ans;
    }

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


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

    // call to function
    window.onload = function() {
        displayWorkshopInfo();
    };


    // nearest workshop
    const workshop = {
        name: 'סדנאת סושי',
        date: "29-02-2024",
        time: "19:00",
        chef: 'אבי ברק',
        price: 350,
        city: "נתניה",
        photo: "img/Sushi.png",
        background_color: "pink"
    }

    // display workshop info
    function displayWorkshopInfo() {
        let workshopInfo = "";
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
            `
        document.getElementById("workshopInfo").innerHTML = workshopInfo;
    }



