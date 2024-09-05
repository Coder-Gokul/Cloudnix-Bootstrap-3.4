// Function to find the maximum of two numbers
function max() {
  // Get the values from input fields and parse them as floats
  let number1 = parseFloat(document.getElementById("num1").value);
  const number2 = parseFloat(document.getElementById("num2").value);

  // Get references to the result and error message elements
  const resultElement = document.getElementById("max_result");
  const errorElement = document.getElementById("max_error");

  // Check if either of the inputs is not a valid number
  if (isNaN(number1) || isNaN(number2)) {
    resultElement.innerText = ""; // Clear result
    errorElement.innerText = "Please enter valid numbers!"; // Show error message
    return; // Exit the function
  }

  // Determine the maximum value
  const maxValue = number1 > number2 ? number1 : number2;
  errorElement.innerText = ""; // Clear error message
  resultElement.innerText = `Max: ${maxValue}`; // Display the result
}

// Function to reverse a string
function reverse() {
  // Get the input string from the input field
  const inputString = document.getElementById("stringInput").value;
  
  // Get references to the result and error message elements
  const errorElement = document.getElementById("reverse_error");
  const resultElement = document.getElementById("reverse_result");

  // Clear previous error and result messages
  errorElement.innerText = "";
  resultElement.innerText = "";

  // Check if the input string is empty
  if (inputString.trim() === "") {
    errorElement.innerText = "Please Enter a Valid String"; // Show error message
    return; // Exit the function
  }

  // Reverse the string
  const reversedString = inputString.split("").reverse().join("");
  resultElement.innerText = reversedString; // Display the reversed string
}

// Function to find the longest word in a comma-separated list
function FindLongestWord() {
  // Get the input string from the input field
  const inputString = document.getElementById("wordInput").value;
  
  // Get references to the result and error message elements
  const errorElement = document.getElementById("longestWord_error");
  const resultElement = document.getElementById("longestWord_result");
  
  // Clear previous error and result messages
  errorElement.innerText = "";
  resultElement.innerText = "";

  // Check if the input string is empty
  if (inputString.trim() === "") {
    errorElement.innerText = "Field cannot be Empty"; // Show error message
    return; // Exit the function
  }

  // Split the input string into an array of words, trimming each word
  const wordsArray = inputString.split(",").map((word) => word.trim());
  
  // Find the longest word
  const longestWord = wordsArray.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  
  resultElement.innerText = longestWord; // Display the longest word
}

// Function to load user details from cookies and display them
function loadDetails() {
  // Split cookies into an array of individual cookies
  const cookies = document.cookie.split(";");
  
  // Check if there are cookies present
  if (cookies.length > 1) {
    cookies.forEach((cookie) => {
      // Split each cookie into name and value
      const [name, value] = cookie.trim().split("=");
      
      // Display the value based on cookie name
      if (name === "name") {
        document.querySelector(
          ".header-name"
        ).innerText = `${decodeURIComponent(value)}`; // Display name
      } else if (name === "phone") {
        document.querySelector(
          ".phone"
        ).innerHTML = `<span>Phone:</span> ${decodeURIComponent(value)}`; // Display phone number
      }
    });
  } else {
    // Set default values if no cookies are present
    document.querySelector(".header-name").innerText = "Manoj Kumar";
    document.querySelector(
      ".phone"
    ).innerHTML = `<span>Phone:</span>9908993803`;
  }
}

// Function to save user details to cookies
function saveDetails() {
  // Get values from input fields
  const name = document.getElementById("nameInput").value;
  const phone = document.getElementById("phoneInput").value;
  
  // Get references to the error and result message elements
  const errorElement = document.getElementById("cookie_error");
  const resultElement = document.getElementById("cookie_result");

  // Define regular expressions for valid name and phone number
  const validName = /^[a-zA-Z\s]*$/;
  const validPhone = /^[0-9\s]*$/;

  // Clear previous error and result messages
  errorElement.innerText = "";
  resultElement.innerText = "";

  // Validate input values
  if (name.trim() === "") {
    errorElement.innerText = "Please Enter Your Name!"; // Show error message
  } else if (!validName.test(name)) {
    errorElement.innerText = "Name contains invalid characters!"; // Show error message
  } else if (phone.trim() === "") {
    errorElement.innerText = "Please Enter Your Phone Number!"; // Show error message
  } else if (!validPhone.test(phone)) {
    errorElement.innerText = "Phone Number contains invalid characters!"; // Show error message
  } else {
    // Save name and phone to cookies with an expiry of 7 days
    document.cookie = `name=${encodeURIComponent(name)}; max-age=${
      7 * 24 * 60 * 60
    }`;
    document.cookie = `phone=${encodeURIComponent(phone)}; max-age=${
      7 * 24 * 60 * 60
    }`;

    errorElement.innerText = ""; // Clear error message
    resultElement.innerText = "Data Saved Successfully!"; // Show success message
  }
}





// jQuery Document Ready Function
$(document).ready(function () {
  // Initially hide the h1 element inside #mypage_header
  $("#mypage_header h1").css({ display: "none" });

  // Setup hover effect for #mypage_header
  $("#mypage_header").hover(
    function () {
      // Mouse enters the header
      $("#mypage_header h1").css({ display: "block" }); // Show h1
      $(this).stop(true).animate({ height: "100px" }, 600); // Expand height
    },
    function () {
      // Mouse leaves the header
      $("#mypage_header h1").css({ display: "none" }); // Hide h1
      $(this).stop(true).animate({ height: "10px" }, 600); // Collapse height
    }
  );

  // Setup footer functionality
  const $footer = $("#mypage_footer footer");
  let isPopup = false;
  $footer.css({ display: "none" }); // Initially hide the footer

  // Show footer and modal when mouse enters #mypage_footer
  $("#mypage_footer").on("mouseenter", function () {
    $footer.stop(true, true).slideDown(10000, function () {
      isPopup = true; // Set popup flag
      $("#myModal").modal("show"); // Show modal
    });
  });

  // Hide footer when mouse leaves #mypage_footer, unless the modal is shown
  $("#mypage_footer").on("mouseleave", function () {
    if (!isPopup) {
      $footer.stop(true).slideUp(500); // Slide up the footer
    }
  });

  // Hide footer when button is clicked
  $(".btn").on("click", function () {
    isPopup = false; // Reset popup flag
    $footer.stop(true).slideUp(500); // Slide up the footer
  });

  // Call loadDetails to populate data on page load
  loadDetails();
});
