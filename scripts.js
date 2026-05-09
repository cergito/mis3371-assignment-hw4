/*
    Program name: scripts.js
    Author: Cergio Manuel A Batang
    Date Created: Feb 27, 2026
    Date last edited: May 8, 2026
    Version: 1.0
    Description: JS external file for patient form
*/

// Dynamic Date Display
// Gets todays date and display it on header

// Dynamic Date Display - shows today's date in the header
const d = new Date();
let text = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
document.getElementById("today").innerHTML = text;
 
// Returns today's date as YYYY-MM-DD (used for the DOB max attribute)
function getTodayStr() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm   = String(now.getMonth() + 1).padStart(2, "0");
    const dd   = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
 
// Returns the date 120 years ago as YYYY-MM-DD (used for the DOB min attribute)
function get120YearsAgoStr() {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 120);
    const yyyy = now.getFullYear();
    const mm   = String(now.getMonth() + 1).padStart(2, "0");
    const dd   = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
 
// Set DOB min/max limits dynamically
document.getElementById("dob").max = getTodayStr();
document.getElementById("dob").min = get120YearsAgoStr();
 
 
// Shows an error message below a field and marks the border red
function showError(fieldId, message) {
    const errEl = document.getElementById(fieldId + "-error");
    if (errEl) {
        errEl.textContent = message;
        errEl.classList.add("show");
    }
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = "#b30000";
        input.style.backgroundColor = "#fff5f5";
    }
}
 
// Clears an error message and resets the field border
function clearError(fieldId) {
    const errEl = document.getElementById(fieldId + "-error");
    if (errEl) errEl.classList.remove("show");
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = "#1a6b9a";
        input.style.backgroundColor = "#f9fdff";
    }
}
 
// Marks a field green to indicate it passed validation
function showSucess(fieldId) {
    const errEl = document.getElementById(fieldId + "-error");
    if (errEl) errEl.classList.remove("show");
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = "#2e7d32";
        input.style.backgroundColor = "#f0fff0";
    }
}
 
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;
 
slider.oninput = function () {
    let display = Math.min(Math.max(this.value, 1), 10);
    output.innerHTML = display;
};
 
 
// User ID - inline warning as user types
document.getElementById("uid").addEventListener("input", function () {
    let val = this.value.trim();
    if (val === "") { clearError("uid"); return; }
    if (/^\d/.test(val)) {
        showError("uid", "User ID cannot start with a number.");
    } else if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(val)) {
        showError("uid", "Only letters, numbers, underscores, and dashes allowed. No spaces.");
    } else if (val.length < 5) {
        showError("uid", "User ID must be at least 5 characters.");
    } else {
        clearError("uid");
    }
});
 
// Password - inline warning as user types
document.getElementById("pword").addEventListener("input", function () {
    let pw = this.value;
    if (pw === "") { clearError("pword"); return; }
    if (pw.length < 8) {
        showError("pword", "Password must be at least 8 characters.");
    } else if (!/[A-Z]/.test(pw)) {
        showError("pword", "Password needs at least 1 uppercase letter.");
    } else if (!/[a-z]/.test(pw)) {
        showError("pword", "Password needs at least 1 lowercase letter.");
    } else if (!/[0-9]/.test(pw)) {
        showError("pword", "Password needs at least 1 number.");
    } else if (!/[!@#%^&*()\-_+=]/.test(pw)) {
        showError("pword", "Password needs at least 1 special character (!@#% etc).");
    } else {
        clearError("pword");
    }
});
 
// Confirm Password - check match in real time
document.getElementById("pword2").addEventListener("input", function () {
    let pass1 = document.getElementById("pword").value;
    let pass2 = this.value;
    if (pass2.length > 0 && pass1 !== pass2) {
        showError("pword2", "Passwords do not match.");
    } else {
        clearError("pword2");
    }
});
 
// First Name - inline warning as user types
document.getElementById("fname").addEventListener("input", function () {
    let val = this.value.trim();
    if (val === "") { showError("fname", "First name cannot be empty."); return; }
    if (!/^[A-Za-z'\-]+$/.test(val)) {
        showError("fname", "Letters, apostrophes, and dashes only.");
    } else if (val.length > 30) {
        showError("fname", "First name cannot exceed 30 characters.");
    } else {
        clearError("fname");
    }
});
 
// First Name - check on blur
document.getElementById("fname").addEventListener("blur", function () {
    if (this.value.trim() === "") {
        showError("fname", "First name cannot be empty.");
    }
});
 
// Middle Initial - check on blur (optional)
document.getElementById("mi").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val === "") { clearError("mi"); return; }
    if (!/^[A-Za-z]$/.test(val)) {
        showError("mi", "Middle initial must be a single letter.");
    } else {
        clearError("mi");
    }
});
 
// Last Name - inline warning as user types
document.getElementById("lname").addEventListener("input", function () {
    let val = this.value.trim();
    if (val === "") { showError("lname", "Last name cannot be empty."); return; }
    if (!/^[A-Za-z'\-]+$/.test(val)) {
        showError("lname", "Letters, apostrophes, and dashes only.");
    } else if (val.length > 30) {
        showError("lname", "Last name cannot exceed 30 characters.");
    } else {
        clearError("lname");
    }
});
 
// Last Name - check on blur
document.getElementById("lname").addEventListener("blur", function () {
    if (this.value.trim() === "") {
        showError("lname", "Last name cannot be empty.");
    }
});
 
// Date of Birth - check when value changes
document.getElementById("dob").addEventListener("change", function () {
    let val = this.value;
    if (val === "") { showError("dob", "Date of birth is required."); return; }
    let selected = new Date(val);
    let today    = new Date();
    let minDate  = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    if (selected > today) {
        showError("dob", "Date of birth cannot be in the future.");
    } else if (selected < minDate) {
        showError("dob", "Date of birth cannot be more than 120 years ago.");
    } else {
        clearError("dob");
    }
});
 
// SSN - auto-dash formatting and inline warning
document.getElementById("ssn").addEventListener("input", function () {
    let val = this.value.replace(/\D/g, "");
    if (val.length > 5) {
        val = val.slice(0, 3) + "-" + val.slice(3, 5) + "-" + val.slice(5, 9);
    } else if (val.length > 3) {
        val = val.slice(0, 3) + "-" + val.slice(3);
    }
    this.value = val;
    let digits = this.value.replace(/\D/g, "");
    if (digits.length < 9) {
        showError("ssn", "SSN must be 9 digits (e.g. 123-45-6789).");
    } else {
        clearError("ssn");
    }
});
 
// Address Line 1 - check on blur
document.getElementById("address1").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val === "") {
        showError("address1", "Address is required.");
    } else if (val.length < 2) {
        showError("address1", "Address must be at least 2 characters.");
    } else {
        clearError("address1");
    }
});
 
// Address Line 2 - check on blur (optional)
document.getElementById("address2").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val === "") { clearError("address2"); return; }
    if (val.length < 2) {
        showError("address2", "If entered, must be at least 2 characters.");
    } else {
        clearError("address2");
    }
});
 
// City - check on blur
document.getElementById("city").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val === "") {
        showError("city", "City is required.");
    } else if (val.length < 2) {
        showError("city", "City must be at least 2 characters.");
    } else {
        clearError("city");
    }
});
 
// Zip - inline warning and digits-only enforcement
document.getElementById("zip").addEventListener("input", function () {
    let val = this.value.trim();
    if (!/^\d{0,5}$/.test(val)) {
        showError("zip", "Zip code must be digits only.");
    } else if (val.length < 5) {
        showError("zip", "Zip code must be exactly 5 digits.");
    } else {
        clearError("zip");
    }
});
 
document.getElementById("zip").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val.length !== 5 || !/^\d{5}$/.test(val)) {
        showError("zip", "Zip code must be exactly 5 digits.");
    } else {
        clearError("zip");
    }
});
 
// Email - inline warning and force lowercase
document.getElementById("email").addEventListener("input", function () {
    let val = this.value.toLowerCase();
    this.value = val;
    if (val === "") { clearError("email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError("email", "Email must be in the format name@domain.tld");
    } else {
        clearError("email");
    }
});
 
document.getElementById("email").addEventListener("blur", function () {
    let val = this.value.trim();
    if (val === "") {
        showError("email", "Email address is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError("email", "Email must be in the format name@domain.tld");
    } else {
        clearError("email");
    }
});
 
// Phone - auto-dash formatting and inline warning
document.getElementById("phone").addEventListener("input", function () {
    let val = this.value.replace(/\D/g, "");
    if (val.length > 6) {
        val = val.slice(0, 3) + "-" + val.slice(3, 6) + "-" + val.slice(6, 10);
    } else if (val.length > 3) {
        val = val.slice(0, 3) + "-" + val.slice(3);
    }
    this.value = val;
    let digits = this.value.replace(/\D/g, "");
    if (digits.length < 10) {
        showError("phone", "Phone must be 10 digits (e.g. 832-555-0100).");
    } else {
        clearError("phone");
    }
});
 
 
let form = document.querySelector("form");
 
form.addEventListener("submit", function (event) {
    let pass1 = document.getElementById("pword").value;
    let pass2 = document.getElementById("pword2").value;
    if (pass1 !== pass2) {
        event.preventDefault();
        showError("pword2", "Passwords do not match. Please re-enter your password.");
        document.getElementById("pword2").focus();
    } else {
        clearError("pword2");
    }
});
 
 
function validateEverything() {
    let valid = true;
 
    // First name
    let fname = document.getElementById("fname").value.trim();
    if (fname === "" || !/^[A-Za-z'\-]+$/.test(fname)) {
        showError("fname", "First name is required. Letters, apostrophes, and dashes only.");
        valid = false;
    } else { clearError("fname"); }
 
    // Middle initial (optional)
    let mi = document.getElementById("mi").value.trim();
    if (mi !== "" && !/^[A-Za-z]$/.test(mi)) {
        showError("mi", "Middle initial must be a single letter.");
        valid = false;
    } else { clearError("mi"); }
 
    // Last name
    let lname = document.getElementById("lname").value.trim();
    if (lname === "" || !/^[A-Za-z'\-]+$/.test(lname)) {
        showError("lname", "Last name is required. Letters, apostrophes, and dashes only.");
        valid = false;
    } else { clearError("lname"); }
 
    // Gender
    let gender = document.querySelector('input[name="pgender"]:checked');
    if (!gender) {
        showError("pgender", "Please select a gender.");
        valid = false;
    } else { clearError("pgender"); }
 
    // Date of birth
    let dob = document.getElementById("dob").value;
    if (dob === "") {
        showError("dob", "Date of birth is required.");
        valid = false;
    } else {
        let selected = new Date(dob);
        let today    = new Date();
        let minDate  = new Date();
        minDate.setFullYear(minDate.getFullYear() - 120);
        if (selected > today) {
            showError("dob", "Date of birth cannot be in the future.");
            valid = false;
        } else if (selected < minDate) {
            showError("dob", "Date of birth cannot be more than 120 years ago.");
            valid = false;
        } else { clearError("dob"); }
    }
 
    // SSN
    let ssnDigits = document.getElementById("ssn").value.replace(/\D/g, "");
    if (ssnDigits.length !== 9) {
        showError("ssn", "SSN must be 9 digits (e.g. 123-45-6789).");
        valid = false;
    } else { clearError("ssn"); }
 
    // Address line 1
    let addr1 = document.getElementById("address1").value.trim();
    if (addr1.length < 2) {
        showError("address1", "Address is required (at least 2 characters).");
        valid = false;
    } else { clearError("address1"); }
 
    // Address line 2 (optional)
    let addr2 = document.getElementById("address2").value.trim();
    if (addr2 !== "" && addr2.length < 2) {
        showError("address2", "If entered, must be at least 2 characters.");
        valid = false;
    } else { clearError("address2"); }
 
    // City
    let city = document.getElementById("city").value.trim();
    if (city.length < 2) {
        showError("city", "City is required (at least 2 characters).");
        valid = false;
    } else { clearError("city"); }
 
    // State
    let state = document.getElementById("state").value;
    if (state === "") {
        showError("state", "Please select a state.");
        valid = false;
    } else { clearError("state"); }
 
    // Zip
    let zip = document.getElementById("zip").value.trim();
    if (!/^\d{5}$/.test(zip)) {
        showError("zip", "Zip code must be exactly 5 digits.");
        valid = false;
    } else { clearError("zip"); }
 
    // Email
    let email = document.getElementById("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email", "Email must be in the format name@domain.tld");
        valid = false;
    } else { clearError("email"); }
 
    // Phone
    let phoneDigits = document.getElementById("phone").value.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
        showError("phone", "Phone must be 10 digits (e.g. 832-555-0100).");
        valid = false;
    } else { clearError("phone"); }
 
    // User ID
    let uid = document.getElementById("uid").value.trim();
    if (uid === "") {
        showError("uid", "User ID is required.");
        valid = false;
    } else if (/^\d/.test(uid)) {
        showError("uid", "User ID cannot start with a number.");
        valid = false;
    } else if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(uid)) {
        showError("uid", "Only letters, numbers, underscores, and dashes allowed.");
        valid = false;
    } else if (uid.length < 5 || uid.length > 20) {
        showError("uid", "User ID must be between 5 and 20 characters.");
        valid = false;
    } else { clearError("uid"); }
 
    // Password
    let pw = document.getElementById("pword").value;
    if (pw.length < 8) {
        showError("pword", "Password must be at least 8 characters.");
        valid = false;
    } else if (!/[A-Z]/.test(pw)) {
        showError("pword", "Password needs at least 1 uppercase letter.");
        valid = false;
    } else if (!/[a-z]/.test(pw)) {
        showError("pword", "Password needs at least 1 lowercase letter.");
        valid = false;
    } else if (!/[0-9]/.test(pw)) {
        showError("pword", "Password needs at least 1 number.");
        valid = false;
    } else if (!/[!@#%^&*()\-_+=]/.test(pw)) {
        showError("pword", "Password needs at least 1 special character (!@#% etc).");
        valid = false;
    } else if (pw === uid) {
        showError("pword", "Password cannot be the same as your User ID.");
        valid = false;
    } else { clearError("pword"); }
 
    // Confirm password
    let pw2 = document.getElementById("pword2").value;
    if (pw2 === "") {
        showError("pword2", "Please confirm your password.");
        valid = false;
    } else if (pw !== pw2) {
        showError("pword2", "Passwords do not match.");
        valid = false;
    } else { clearError("pword2"); }
 
    // Show submit only if all passed
    if (valid) {
        document.getElementById("submitBtn").disabled = false;
        document.getElementById("submitBtn").style.display = "inline";
    } else {
        showAlert();
    }
}

 
function showAlert() {
    let alertBox = document.getElementById("alert-box");
    let closeBtn = document.getElementById("close-alert");
    alertBox.style.display = "block";
    closeBtn.onclick = function () {
        alertBox.style.display = "none";
    };
}
 
 
function showReview() {
    // Personal info
    let fname = document.getElementById("fname").value.trim();
    let mi    = document.getElementById("mi").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let fullname = fname;
    if (mi !== "") fullname += " " + mi + ".";
    fullname += " " + lname;
 
    let genderEl = document.querySelector('input[name="pgender"]:checked');
    let gender   = genderEl ? genderEl.value : "Not Selected";
 
    let dob = document.getElementById("dob").value;
 
    // SSN: mask all but last 4 digits
    let ssnRaw  = document.getElementById("ssn").value;
    let ssnShow = "";
    if (ssnRaw.length > 0) {
        ssnShow = ssnRaw.slice(0, -4).replace(/[0-9]/g, "*") + ssnRaw.slice(-4);
    }
 
    // Contact info
    let addr1 = document.getElementById("address1").value.trim();
    let addr2 = document.getElementById("address2").value.trim();
    let city  = document.getElementById("city").value.trim();
    let state = document.getElementById("state").value;
    let zip   = document.getElementById("zip").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
 
    // Build full address
    let fullAddr;
    if (!addr1 && !city && !state && !zip) {
        fullAddr = "Not entered";
    } else {
        fullAddr = addr1 || "(no street)";
        if (addr2 !== "") fullAddr += ", " + addr2;
        fullAddr += ", " + (city || "(no city)") + ", " + (state || "(no state)") + " " + (zip || "");
        fullAddr = fullAddr.trim().replace(/,\s*$/, "");
    }
 
    // Patient history
    let vaxEl  = document.querySelector('input[name="vaccinated"]:checked');
    let vax    = vaxEl ? vaxEl.value : "Not answered";
    let insEl  = document.querySelector('input[name="insurance"]:checked');
    let ins    = insEl ? insEl.value : "Not answered";
    let smkEl  = document.querySelector('input[name="smoker"]:checked');
    let smk    = smkEl ? smkEl.value : "Not answered";
 
    let histBoxes  = document.querySelectorAll('input[name="history"]:checked');
    let histValues = [];
    histBoxes.forEach(function (box) { histValues.push(box.value); });
    let histDisplay = histValues.length > 0 ? histValues.join(", ") : "None selected";
 
    let notes = document.getElementById("notes").value.replace(/"/g, "'").trim();
    let notesDisplay = notes !== "" ? notes : "None provided";
 
    let painVal = document.getElementById("range").value;
 
    // Account info
    let uid   = document.getElementById("uid").value.trim();
    let pwLen = document.getElementById("pword").value.length;
    let pwShow = pwLen > 0 ? "•".repeat(pwLen) + " (hidden for security)" : "Not entered";
 
    // Build HTML
    let tableHTML = `
        <tr>
            <th colspan="2" style="text-align:center; background-color:#1a6b9a; color:white; padding:10px; font-size:1.1em;">
                &mdash; PLEASE REVIEW THIS INFORMATION &mdash;
            </th>
        </tr>
        <tr>
            <th colspan="2" style="background-color:#ddeef8; color:#1a3a52; text-align:left; padding:6px 10px;">
                Personal Information
            </th>
        </tr>
        <tr><td>Full Name</td><td>${fullname}</td></tr>
        <tr><td>Gender</td><td>${gender}</td></tr>
        <tr><td>Date of Birth</td><td>${dob !== "" ? dob : "Not entered"}</td></tr>
        <tr><td>SSN / ID #</td><td>${ssnShow !== "" ? ssnShow : "Not entered"}</td></tr>
 
        <tr>
            <th colspan="2" style="background-color:#ddeef8; color:#1a3a52; text-align:left; padding:6px 10px;">
                Contact Information
            </th>
        </tr>
        <tr><td>Address</td><td>${fullAddr}</td></tr>
        <tr><td>Email Address</td><td>${email !== "" ? email : "Not entered"}</td></tr>
        <tr><td>Phone Number</td><td>${phone !== "" ? phone : "Not entered"}</td></tr>
 
        <tr>
            <th colspan="2" style="background-color:#ddeef8; color:#1a3a52; text-align:left; padding:6px 10px;">
                Patient History
            </th>
        </tr>
        <tr><td>Vaccinated?</td><td>${vax}</td></tr>
        <tr><td>Has Insurance?</td><td>${ins}</td></tr>
        <tr><td>Smoker?</td><td>${smk}</td></tr>
        <tr><td>Conditions / History</td><td>${histDisplay}</td></tr>
        <tr><td>Pain Level</td><td>${painVal} / 10</td></tr>
        <tr><td>Notes / Symptoms</td><td>${notesDisplay}</td></tr>
 
        <tr>
            <th colspan="2" style="background-color:#ddeef8; color:#1a3a52; text-align:left; padding:6px 10px;">
                Account Information
            </th>
        </tr>
        <tr><td>User ID</td><td>${uid !== "" ? uid : "Not entered"}</td></tr>
        <tr><td>Password</td><td>${pwShow}</td></tr>
    `;
 
    document.getElementById("review-table").innerHTML = tableHTML;
    document.getElementById("review-panel").style.display = "block";
    document.getElementById("review-panel").scrollIntoView({ behavior: "smooth" });
}
 
 
 
async function loadStates() {
    // States data defined inline in JS - no external file needed
    const statesData = [
        { value: "AL", label: "Alabama" },       { value: "AK", label: "Alaska" },
        { value: "AZ", label: "Arizona" },        { value: "AR", label: "Arkansas" },
        { value: "CA", label: "California" },     { value: "CO", label: "Colorado" },
        { value: "CT", label: "Connecticut" },    { value: "DE", label: "Delaware" },
        { value: "DC", label: "District of Columbia" },
        { value: "FL", label: "Florida" },        { value: "GA", label: "Georgia" },
        { value: "HI", label: "Hawaii" },         { value: "ID", label: "Idaho" },
        { value: "IL", label: "Illinois" },       { value: "IN", label: "Indiana" },
        { value: "IA", label: "Iowa" },           { value: "KS", label: "Kansas" },
        { value: "KY", label: "Kentucky" },       { value: "LA", label: "Louisiana" },
        { value: "ME", label: "Maine" },          { value: "MD", label: "Maryland" },
        { value: "MA", label: "Massachusetts" },  { value: "MI", label: "Michigan" },
        { value: "MN", label: "Minnesota" },      { value: "MS", label: "Mississippi" },
        { value: "MO", label: "Missouri" },       { value: "MT", label: "Montana" },
        { value: "NE", label: "Nebraska" },       { value: "NV", label: "Nevada" },
        { value: "NH", label: "New Hampshire" },  { value: "NJ", label: "New Jersey" },
        { value: "NM", label: "New Mexico" },     { value: "NY", label: "New York" },
        { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
        { value: "OH", label: "Ohio" },           { value: "OK", label: "Oklahoma" },
        { value: "OR", label: "Oregon" },         { value: "PA", label: "Pennsylvania" },
        { value: "PR", label: "Puerto Rico" },    { value: "RI", label: "Rhode Island" },
        { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" },
        { value: "TN", label: "Tennessee" },      { value: "TX", label: "Texas" },
        { value: "UT", label: "Utah" },           { value: "VT", label: "Vermont" },
        { value: "VA", label: "Virginia" },       { value: "WA", label: "Washington" },
        { value: "WV", label: "West Virginia" },  { value: "WI", label: "Wisconsin" },
        { value: "WY", label: "Wyoming" }
    ];
 
    // Wrap the array in a Blob so we can use fetch() on it (demonstrates Fetch API)
    const blob     = new Blob([JSON.stringify(statesData)], { type: "application/json" });
    const blobURL  = URL.createObjectURL(blob);
    const select   = document.getElementById("state");
 
    try {
        const response = await fetch(blobURL);
        if (!response.ok) {
            throw new Error("Could not read states data (status " + response.status + ")");
        }
        const states = await response.json();
 
        // Keep whichever option is already selected (from the hardcoded HTML),
        // then re-confirm the prompt option is in place
        const currentValue = select.value;
        select.innerHTML = '<option value="" selected disabled>-- Select State --</option>';
 
        states.forEach(function (s) {
            const opt       = document.createElement("option");
            opt.value       = s.value;
            opt.textContent = s.label;
            select.appendChild(opt);
        });
 
        // Restore selection if one was already set (e.g. from localStorage restore)
        if (currentValue) select.value = currentValue;
 
    } catch (err) {
        console.error("loadStates() error:", err);
        // Fallback: the hardcoded options in the HTML are still there, so nothing breaks
    } finally {
        URL.revokeObjectURL(blobURL); // clean up the temporary URL
    }
}
 
// Run immediately on page load
loadStates();
 
 
 
// Save a cookie that expires in `hours` hours (max 48 per assignment requirement)
function setCookie(name, value, hours) {
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) +
                      "; expires=" + expires.toUTCString() +
                      "; path=/";
}
 
// Read a cookie by name. Returns the value or "" if not found.
function getCookie(name) {
    const nameEQ = name + "=";
    const parts  = document.cookie.split(";");
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i].trim();
        if (part.indexOf(nameEQ) === 0) {
            return decodeURIComponent(part.substring(nameEQ.length));
        }
    }
    return "";
}
 
// Expire a cookie immediately by setting its date to the past
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
 
 
function checkCookie() {
    const savedName  = getCookie("cpFirstName");
    const welcomeEl  = document.getElementById("welcome-msg");
    const notYouEl   = document.getElementById("not-you-msg");
    const notYouLink = document.getElementById("not-you-link");
 
    if (savedName !== "") {
        // Returning user
        welcomeEl.textContent = "Welcome back, " + savedName + "!";
 
        // Build the "Not [Name]? Click HERE to start as a new user." link text
        notYouLink.textContent = "Not " + savedName + "? Click HERE to start as a new user.";
        notYouEl.style.display = "block";
 
        // Pre-fill first name from the cookie
        document.getElementById("fname").value = savedName;
 
        // Restore the rest of the form from localStorage
        restoreFromLocalStorage();
 
    } else {
        // First-time visitor
        welcomeEl.textContent  = "Hello, New User!";
        notYouEl.style.display = "none";
    }
}
 
// Run on page load
checkCookie();
 
 
function startAsNewUser() {
    deleteCookie("cpFirstName");
    clearLocalStorage();
    document.querySelector("form").reset();
    document.getElementById("welcome-msg").textContent  = "Hello, New User!";
    document.getElementById("not-you-msg").style.display = "none";
    document.getElementById("review-panel").style.display = "none";
    // Reset slider display back to 1
    document.getElementById("range-slider").textContent = "1";
}
 
 
 
// All non-secure fields we save (NOT password, NOT SSN)
const LS_FIELDS = [
    "fname", "mi", "lname",
    "dob",
    "address1", "address2",
    "city", "zip",
    "email", "phone",
    "notes",
    "uid"
];
 
// Save one text field to localStorage under key "cp_[id]"
function saveFieldToLS(fieldId) {
    const el = document.getElementById(fieldId);
    if (el) localStorage.setItem("cp_" + fieldId, el.value);
}
 
// Save all fields to localStorage
function saveToLocalStorage() {
    // Text, date, textarea fields
    LS_FIELDS.forEach(function (id) { saveFieldToLS(id); });
 
    // Gender radio
    const gEl = document.querySelector('input[name="pgender"]:checked');
    localStorage.setItem("cp_pgender", gEl ? gEl.value : "");
 
    // Vaccinated radio
    const vEl = document.querySelector('input[name="vaccinated"]:checked');
    localStorage.setItem("cp_vaccinated", vEl ? vEl.value : "");
 
    // Insurance radio
    const iEl = document.querySelector('input[name="insurance"]:checked');
    localStorage.setItem("cp_insurance", iEl ? iEl.value : "");
 
    // Smoker radio
    const sEl = document.querySelector('input[name="smoker"]:checked');
    localStorage.setItem("cp_smoker", sEl ? sEl.value : "");
 
    // History checkboxes - comma-separated
    const histChecked = document.querySelectorAll('input[name="history"]:checked');
    const histValues  = [];
    histChecked.forEach(function (cb) { histValues.push(cb.value); });
    localStorage.setItem("cp_history", histValues.join(","));
 
    // Pain slider
    localStorage.setItem("cp_range", document.getElementById("range").value);
 
    // State dropdown
    localStorage.setItem("cp_state", document.getElementById("state").value);
}
 
// Read all fields back from localStorage and fill the form
function restoreFromLocalStorage() {
    // Text, date, textarea fields
    LS_FIELDS.forEach(function (id) {
        const saved = localStorage.getItem("cp_" + id);
        if (saved !== null && saved !== "") {
            document.getElementById(id).value = saved;
        }
    });
 
    // Gender radio
    const savedGender = localStorage.getItem("cp_pgender");
    if (savedGender) {
        const gEl = document.querySelector('input[name="pgender"][value="' + savedGender + '"]');
        if (gEl) gEl.checked = true;
    }
 
    // Vaccinated radio
    const savedVax = localStorage.getItem("cp_vaccinated");
    if (savedVax) {
        const vEl = document.querySelector('input[name="vaccinated"][value="' + savedVax + '"]');
        if (vEl) vEl.checked = true;
    }
 
    // Insurance radio
    const savedIns = localStorage.getItem("cp_insurance");
    if (savedIns) {
        const iEl = document.querySelector('input[name="insurance"][value="' + savedIns + '"]');
        if (iEl) iEl.checked = true;
    }
 
    // Smoker radio
    const savedSmk = localStorage.getItem("cp_smoker");
    if (savedSmk) {
        const sEl = document.querySelector('input[name="smoker"][value="' + savedSmk + '"]');
        if (sEl) sEl.checked = true;
    }
 
    // History checkboxes
    const savedHist = localStorage.getItem("cp_history");
    if (savedHist && savedHist !== "") {
        savedHist.split(",").forEach(function (val) {
            const cbEl = document.querySelector('input[name="history"][value="' + val + '"]');
            if (cbEl) cbEl.checked = true;
        });
    }
 
    // Pain slider
    const savedRange = localStorage.getItem("cp_range");
    if (savedRange) {
        document.getElementById("range").value = savedRange;
        document.getElementById("range-slider").textContent = savedRange;
    }
 
    // State dropdown - retry until loadStates() has finished populating it
    const savedState = localStorage.getItem("cp_state");
    if (savedState) {
        function trySetState(attemptsLeft) {
            const stateEl = document.getElementById("state");
            if (stateEl.options.length > 1) {
                stateEl.value = savedState;
            } else if (attemptsLeft > 0) {
                setTimeout(function () { trySetState(attemptsLeft - 1); }, 200);
            }
        }
        trySetState(10); // retry up to 10 times, 200ms apart (2 seconds total)
    }
}
 
// Remove all localStorage keys this form uses
function clearLocalStorage() {
    LS_FIELDS.forEach(function (id) { localStorage.removeItem("cp_" + id); });
    localStorage.removeItem("cp_pgender");
    localStorage.removeItem("cp_vaccinated");
    localStorage.removeItem("cp_insurance");
    localStorage.removeItem("cp_smoker");
    localStorage.removeItem("cp_history");
    localStorage.removeItem("cp_range");
    localStorage.removeItem("cp_state");
}
 
 
 
function saveOrClearData() {
    const rememberMe = document.getElementById("rememberMe").checked;
    const fname      = document.getElementById("fname").value.trim();
 
    if (rememberMe) {
        setCookie("cpFirstName", fname, 48); // 48 hours max as required
        saveToLocalStorage();
    } else {
        deleteCookie("cpFirstName");
        clearLocalStorage();
    }
}
 
// Hook into the existing form submit listener
form.addEventListener("submit", function () {
    saveOrClearData();
});
 
 
 
LS_FIELDS.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("blur", function () {
            if (document.getElementById("rememberMe").checked) {
                saveFieldToLS(id);
            }
        });
    }
});
 
// State dropdown: save on change (also keep the original validation check)
document.getElementById("state").addEventListener("change", function () {
    if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("cp_state", this.value);
    }
    if (this.value === "") {
        showError("state", "Please select a state.");
    } else {
        clearError("state");
    }
});
 
// Slider: save on move
document.getElementById("range").addEventListener("input", function () {
    if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("cp_range", this.value);
    }
});
 