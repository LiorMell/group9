const customer_form = document.getElementById('Customer')
const customer_email = document.getElementById('customer_email');
const customer_password = document.getElementById('customer_password');
const customer_password2 = document.getElementById('customer_password2');
const customer_first_name = document.getElementById('customer_first_name');
const customer_last_name = document.getElementById('customer_last_name');
const customer_phone = document.getElementById('customer_phone');
const customer_dob = document.getElementById('customer_dob');
const card_number = document.getElementById('card_number');
const card_valid_until = document.getElementById('card_valid_until');
const CCV = document.getElementById('CCV');
//--------------------------
const chef_form = document.getElementById('Chef')
const chef_email = document.getElementById('chef_email');
const chef_password = document.getElementById('chef_password');
const chef_password2 = document.getElementById('chef_password2');
const chef_first_name = document.getElementById('chef_first_name');
const chef_last_name = document.getElementById('chef_last_name');
const chef_phone = document.getElementById('chef_phone');
const chef_notes = document.getElementById('chef_notes');
const chef_categories = document.getElementById('chef_categories');
//---------------------------------
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




    function showCreditCard() {
        let checkbox = document.getElementById("showCreditCard_Checkbox");
        let detailsSection = document.getElementById("detailsSection");

        if (checkbox.checked) {
            detailsSection.style.display = "block"; // Show hiddenSection
        } else {
            detailsSection.style.display = "none"; // Hide hiddenSection
        }
    }

    function chef_Register() {
        let x = document.getElementById("Customer")
        let y = document.getElementById("Chef")
        let z = document.getElementById("btn")
        x.style.left = "-600px"
        y.style.left = "50px"
        z.style.left = "130px"
    }

    function customer_Register() {
        let x = document.getElementById("Customer")
        let y = document.getElementById("Chef")
        let z = document.getElementById("btn")
        x.style.left = "50px"
        y.style.left = "650px"
        z.style.left = "0px"
    }

// Define the customer class
    class Customer {
        constructor(email, password, firstName, lastName, phone, dob, card_number, card_valid_until, ccv) {
            this.email = email;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.dob = new Date(dob);
            this.creditnum = card_number;
            this.creditdate = card_valid_until;
            this.ccv = ccv;
        }
    }

    class Chef {
        constructor(email, password, firstName, lastName, phone, notes, chef_categories) {
            this.email = email;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.notes = notes;
            this.chef_categories = chef_categories;
        }
    }


    // Customer Validate inputs
    customer_form.addEventListener('submit', e => {
        e.preventDefault();

        if(validateInputs_customer()){
            const newCustomer = new Customer(customer_email, customer_password, customer_first_name, customer_last_name, customer_phone, customer_dob,
            card_number, card_valid_until, CCV);
            document.getElementById("Customer").reset();
        alert("הטופס נשלח בהצלחה!")
        }

    });

    // Chef Validate inputs
    chef_form.addEventListener('submit', e => {
        e.preventDefault();

        if(validateInputs_chef()) {
            const newChef = new Chef(chef_email, chef_password, chef_first_name, chef_last_name, chef_phone, chef_notes,
                chef_categories);
            document.getElementById("Chef").reset();
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


    const validateInputs_customer = () => {
        const emailValue = customer_email.value.trim();
        const customer_passwordValue = customer_password.value.trim();
        const customer_password2Value = customer_password2.value.trim();
        const customer_firstnameValue = customer_first_name.value.trim();
        const customer_lastnameValue = customer_last_name.value.trim();
        const customer_phoneValue = customer_phone.value.trim();
        const card_numberValue = card_number.value.trim();
        const card_valid_untilValue = card_valid_until.value.trim();
        const ccvValue = CCV.value.trim();

        let ans=true;

        if(emailValue === '') {
            setError(customer_email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(customer_email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(customer_email);
        }

        if(customer_passwordValue === ''){
            setError(customer_password, 'נא למלא סיסמא')
            ans = false;
        } else if (customer_passwordValue.length < 6){
            setError(customer_password, 'סיסמא חייבת להיות לפחות 6 תווים.')
            ans = false;
        } else {
            setSuccess(customer_password);
        }

        if(customer_password2Value === ''){
            setError(customer_password2, 'נא לאמת את הסיסמא')
            ans = false;
        } else if (customer_password2Value !== customer_passwordValue){
            setError(customer_password2, "הסיסמאות לא תואמות")
            ans = false;
        } else {
            setSuccess(customer_password2);
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

        if(card_numberValue === ''){
            setError(card_number, 'נא למלא מספר כרטיס אשראי')
            ans = false;
        } else if ((card_numberValue.length !== 16) || (!validateNumber(card_numberValue))){
            setError(card_number, "מספר אשראי חייב להכיל 16 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(card_number);
        }

        if(card_valid_untilValue === ''){
            setError(card_valid_until, 'נא למלא תוקף כרטיס')
            ans = false;
        } else if ((card_valid_untilValue.length !== 7) || (!validateCreditCardExpiry(card_valid_untilValue))){
            setError(card_valid_until, "נדרש תאריך עתידי בפורמט נדרש MM/YYYY")
            ans = false;
        } else {
            setSuccess(card_valid_until);
        }

        if(ccvValue === ''){
            setError(CCV, 'נא למלא CCV')
            ans = false;
        } else if ((ccvValue.length !== 3) || (!validateNumber(ccvValue))){
            setError(CCV, "CCV חייב להכיל 3 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(CCV);
        }

        return ans;
    };




    const validateInputs_chef = () => {
        const emailValue = chef_email.value.trim();
        const chef_passwordValue = chef_password.value.trim();
        const chef_password2Value = chef_password2.value.trim();
        const chef_firstnameValue = chef_first_name.value.trim();
        const chef_lastnameValue = chef_last_name.value.trim();
        const chef_phoneValue = chef_phone.value.trim();
        let ans = true;

        if(emailValue === '') {
            setError(chef_email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(chef_email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(chef_email);
        }

        if(chef_passwordValue === ''){
            setError(chef_password, 'נא למלא סיסמא')
            ans = false;
        } else if (chef_passwordValue.length < 6){
            setError(chef_password, 'סיסמא חייבת להיות לפחות 6 תווים.')
            ans = false;
        } else {
            setSuccess(chef_password);
        }

        if(chef_password2Value === ''){
            setError(chef_password2, 'נא לאמת את הסיסמא')
            ans = false;
        } else if (chef_password2Value !== chef_passwordValue){
            setError(chef_password2, "הסיסמאות לא תואמות")
            ans = false;
        } else {
            setSuccess(chef_password2);
        }

        if(chef_firstnameValue === ''){
            setError(chef_first_name, 'נא למלא שם פרטי')
            ans = false;
        } else if (!validateNameField(chef_firstnameValue)){
            setError(chef_first_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(chef_first_name);
        }

        if(chef_lastnameValue === ''){
            setError(chef_last_name, 'נא למלא שם משפחה')
            ans = false;
        } else if (!validateNameField(chef_lastnameValue)){
            setError(chef_last_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(chef_last_name);
        }

        if(chef_phoneValue === ''){
            setError(chef_phone, 'נא למלא מספר טלפון')
            ans = false;
        } else if ((chef_phoneValue.length !== 10) || (!validateNumber(chef_phoneValue))){
            setError(chef_phone, "מספר טלפון חייב להכיל 10 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(chef_phone);
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

    function validateCreditCardExpiry(expiryDate) {

        let expiryRegex = /^(0[1-9]|1[0-2])\/(20)\d{2}$/; //valid format (MM/YYYY)

        if (!expiryRegex.test(expiryDate)){
            return false
        }else {
             const [expiryMonth, expiryYear] = expiryDate.split('/');
             const today = new Date();

            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            if (parseInt(expiryYear) < currentYear) {
                return false;
            } else if (parseInt(expiryYear) === currentYear) {
                return parseInt(expiryMonth) >= currentMonth;
            } else {
                return true;
            }
        }
    }




