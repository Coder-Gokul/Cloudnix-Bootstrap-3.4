$(document).ready(function () {
  // Function to find the maximum of two numbers
  function max(event) {
    event.preventDefault(); // Prevent default form submission

    let number1 = parseFloat($("#num1").val());
    const number2 = parseFloat($("#num2").val());

    const resultElement = $("#max_result");
    const errorElement = $("#max_error");

    if (isNaN(number1) || isNaN(number2)) {
      resultElement.text("");
      errorElement.text("Please enter valid numbers!");
      return;
    }

    const maxValue = number1 > number2 ? number1 : number2;
    errorElement.text("");
    resultElement.text(`Max: ${maxValue}`);
  }

  // Function to reverse a string
  function reverse(event) {
    event.preventDefault(); // Prevent default form submission

    const inputString = $("#stringInput").val();
    const errorElement = $("#reverse_error");
    const resultElement = $("#reverse_result");

    errorElement.text("");
    resultElement.text("");

    if (inputString.trim() === "") {
      errorElement.text("Please Enter a Valid String");
      return;
    }

    const reversedString = inputString.split("").reverse().join("");
    resultElement.text(reversedString);
  }

  // Function to find the longest word
  function FindLongestWord(event) {
    event.preventDefault(); // Prevent default form submission

    const inputString = $("#wordInput").val();
    const errorElement = $("#longestWord_error");
    const resultElement = $("#longestWord_result");

    errorElement.text("");
    resultElement.text("");

    if (inputString.trim() === "") {
      errorElement.text("Field cannot be Empty");
      return;
    }

    const wordsArray = inputString.split(",").map((word) => word.trim());
    const longestWord = wordsArray.reduce(
      (a, b) => (a.length > b.length ? a : b),
      ""
    );
    resultElement.text(longestWord);
  }

  // Function to save user details to cookies
  function saveDetails(event) {
    event.preventDefault(); // Prevent default form submission

    const name = $("#nameInput").val();
    const phone = $("#phoneInput").val();

    const errorElement = $("#cookie_error");
    const resultElement = $("#cookie_result");

    const validName = /^[a-zA-Z\s]*$/;
    const validPhone = /^[0-9\s]*$/;

    errorElement.text("");
    resultElement.text("");

    if (name.trim() === "") {
      errorElement.text("Please Enter Your Name!");
    } else if (!validName.test(name)) {
      errorElement.text("Name contains invalid characters!");
    } else if (phone.trim() === "") {
      errorElement.text("Please Enter Your Phone Number!");
    } else if (!validPhone.test(phone)) {
      errorElement.text("Phone Number contains invalid characters!");
    } else {
      document.cookie = `name=${encodeURIComponent(name)}; max-age=${
        7 * 24 * 60 * 60
      }`;
      document.cookie = `phone=${encodeURIComponent(phone)}; max-age=${
        7 * 24 * 60 * 60
      }`;

      errorElement.text("");
      resultElement.text("Data Saved Successfully!");
    }
  }

  // Bind the form submit events to prevent default submission and call respective functions
  $("#maxForm").on("submit", max);
  $("#reverseForm").on("submit", reverse);
  $("#findLongestForm").on("submit", FindLongestWord);
  $("#saveForm").on("submit", saveDetails);

  // Initially hide the h1 element inside #mypage_header
  $("#mypage_header h1").css({ display: "none" });

  // Setup hover effect for #mypage_header
  $("#mypage_header").hover(
    function () {
      $("#mypage_header h1").css({ display: "block" });
      $(this).stop(true).animate({ height: "100px" }, 600);
    },
    function () {
      $("#mypage_header h1").css({ display: "none" });
      $(this).stop(true).animate({ height: "10px" }, 600);
    }
  );

  // Setup footer functionality
  const $footer = $("#mypage_footer footer");
  let isPopup = false;
  $footer.css({ display: "none" });

  $("#mypage_footer").on("mouseenter", function () {
    $footer.stop(true, true).slideDown(10000, function () {
      isPopup = true;
      $("#myModal").modal("show");
    });
  });

  $("#mypage_footer").on("mouseleave", function () {
    if (!isPopup) {
      $footer.stop(true).slideUp(500);
    }
  });

  $(".btn").on("click", function () {
    isPopup = false;
    $footer.stop(true).slideUp(500);
  });

  // Call loadDetails to populate data on page load
  loadDetails();
});
