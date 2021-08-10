/* Task1
*/
let text1 = "'I'd rather be small, ' aren't they nice?', don't be so 'cool'! 'It's absolute!'. 'Never say What you've done!'";
const newText1 = text1.replace(/^'|'$|'(?=\s)|(?<=\w)'(?=\W)|(?<=\W)'(?=\W)|( )'(?=.*)/g, '$1"')
console.log(text1);
console.log(newText1);

/*Task2
 */
let text = "'I'd rather be small, ' aren't they nice?', don't be so 'cool'! 'It's absolute!'. 'Never say What you've done!'";
const newText = text.replace(/^'|'$|'\B|\B'/g, '"')
console.log(text);
console.log(newText);


/* Task3
 */

const checkName = () => {
    const nameEl = document.querySelector('#name');
    let valid = false;
    const min = 1,
        max = 25;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Name must be between ${min} and ${max} characters.`)
    } else if (!isNameValid(name)) {
        showError(nameEl, `Name should contain only english letters`)
    }
    else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    const emailEl = document.querySelector('#email');
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPhone = () => {
    const phoneEl = document.querySelector('#phNumber');
    let valid = false;
    const phone = phoneEl.value.trim();
    if (!isRequired(phone)) {
        showError(phoneEl, 'Phone cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneEl, 'Phone is not valid. please use format +7(000)000-0000')
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
};



const isEmailValid = (email) => {
    const re = /^[\w.-]+@(([a-zA-Z0-9])+.[a-zA-Z]{2,})$/;
    return re.test(email);
};
const isNameValid = (name) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
}
const isPhoneValid = (phone) => {
    const re = /^\+\d{1}\((\d{3})\)(\d{3})[-](\d{4})$/;
    return re.test(phone);
}



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('error');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('error');
    error.textContent = '';
}

const form = document.querySelector('#form');
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPhoneValid;

});
