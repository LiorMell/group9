const form = document.getElementById('form')
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const contact_reason = document.getElementById('contact_reason');
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

    class Contact_Request {
            constructor(first_name, last_name, email, phone, contact_reason) {
                this.email = email;
                this.first_name = first_name;
                this.last_name = last_name;
                this.phone = phone;
                this.contact_reason = contact_reason;
            }
        }

     // Contact_Request Validate inputs
    form.addEventListener('submit', e => {
        e.preventDefault();

        // validateInputs();
        if (validateInputs()){
            const newContact_Request = new Contact_Request(first_name, last_name, email, phone, contact_reason);
            console.log(newContact_Request)
            document.getElementById("form").reset();
            alert("הטופס נשלח בהצלחה!")
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
        const firstnameValue = first_name.value.trim();
        const lastnameValue = last_name.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();
        const contact_reasonValue = contact_reason.value.trim();
        let ans = true;

        if(emailValue === '') {
            setError(email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(email);
        }

        if(firstnameValue === ''){
            setError(first_name, 'נא למלא שם פרטי')
            ans = false;
        } else if (!validateNameField(firstnameValue)){
            setError(first_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(first_name);
        }

        if(lastnameValue === ''){
            setError(last_name, 'נא למלא שם משפחה')
            ans = false;
        } else if (!validateNameField(lastnameValue)){
            setError(last_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(last_name);
        }

        if(phoneValue === ''){
            setError(phone, 'נא למלא מספר טלפון')
            ans = false;
        } else if ((phoneValue.length !== 10) || (!validateNumber(phoneValue))){
            setError(phone, "מספר טלפון חייב להכיל 10 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(phone);
        }

        if(contact_reasonValue === ''){
            setError(contact_reason, 'נא למלא סיבת פנייה')
            ans = false;
        } else {
            setSuccess(contact_reason);
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