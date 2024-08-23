/*----------------giỏ hàng///////////////////////////////////////////////////////// */
/*ẩn hiện giỏ hàng*/
function myFunction() {
  document
    .getElementById("myDropdowncartgiohang")
    .classList.toggle("showcartgiohang");
}
/*ẩn hiện giỏ hàng*/
//gio hang//////////////////////////////////////////////////////////////////////////////
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartItemsList = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = [];

// Function to update the cart total price
function updateCartTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += parseFloat(item.price) * item.quantity;
  });
  cartTotalPrice.innerText = `${total.toFixed(2)} đ`; // Format total to 2 decimal places
}

// Function to add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.name === product.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl, // Added property for image URL
    });
  }
  updateCartItemsList();
  updateCartTotal();
}

// Function to remove product from cart
function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  updateCartItemsList();
  updateCartTotal();
}

// Function to update the cart items list in the HTML
function updateCartItemsList() {
  cartItemsList.innerHTML = ""; // Clear existing list items
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
  <img src="${item.imageUrl}" alt="${item.name} image" class="cart-item-image">
  ${item.name} (x${item.quantity}) - ${parseFloat(item.price).toFixed(2)} đ
  <button class="remove-item-btn" data-product-name="${
    item.name
  }"><i class="fa-solid fa-trash-can"></i></button>
  `;
    cartItemsList.appendChild(listItem);
  });
}

// Add click event listener to "Add to cart" buttons
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productName = btn.dataset.productName;
    const productPrice = btn.dataset.productPrice;
    const productImageUrl = btn.dataset.productImage; // Get image URL from button
    addToCart({
      name: productName,
      price: productPrice,
      imageUrl: productImageUrl,
    });
    /*thêm mới 2 dòng*/
    addToCartEffect(btn); // Call the effect function
    showAddToCartNotification(productName); // Call the notification function
  });
});

// Add click event listener to "Remove" buttons
cartItemsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item-btn")) {
    const productName = event.target.dataset.productName;
    removeFromCart(productName);
  }
});

// Add click event listener to "Clear cart" button
clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCartItemsList();
  updateCartTotal();
});
function showAddToCartNotification(productName) {
  // Create the notification element (e.g., using a div or Toast UI)
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("cart-notification"); // Add a class for styling
  notificationElement.innerHTML = `
  <span class="notification-message">Sản phẩm ${productName} đã được thêm vào giỏ hàng!</span>
  `;

  // Append the notification element to the DOM
  const notificationContainer = document.getElementById(
    "notification-container"
  ); // Assuming you have a container
  if (notificationContainer) {
    notificationContainer.appendChild(notificationElement);
  } else {
    document.body.appendChild(notificationElement); // Append to body if no container
  }

  // Add animation or effects (optional)
  notificationElement.classList.add("show"); // Add a class to trigger animation (CSS)

  // Remove the notification after a timeout (optional)
  setTimeout(() => {
    notificationElement.classList.remove("show"); // Remove the class to hide
    setTimeout(() => {
      notificationElement.remove(); // Remove the element from the DOM
    }, 300); // Adjust delay as needed
  }, 2000); // Adjust timeout as needed
}
function addToCartEffect(btn) {
  btn.classList.add("added-to-cart"); // Add a temporary class for the effect
  setTimeout(() => {
    btn.classList.remove("added-to-cart");
  }, 500); // Remove the class after 0.5 seconds (adjust as needed)
}
//gio hang//////////////////////////////////////////////////////////////////////////////

/*---------- end     giỏ hàng///////////////////////////////////////////////////////// */
/*lọc sp--------------------------------------------------------------------*/
filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDivloc");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "showloc");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "showloc");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btnloc");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
/*-----------------------end lọc sp--------------------------------------------------------------------*/
// JavaScript thanh tìm kiếm//////////////////////////////////////////////////////////////

function myFunctiontimkiem() {
  document.getElementById("myDropdowntimkiem").classList.toggle("showtimkiem");
}

function filterFunctiontimkiem() {
  const input = document.getElementById("myInputtimkiemtimkiem");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdowntimkiem");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

/*// Thêm các sự kiện di chuột
document
  .getElementById("myDropdowntimkiem")
  .addEventListener("mouseover", function () {
    // Hiển thị dropdown-content khi di chuột vào
    this.classList.add("showtimkiem");
  });

document
  .getElementById("myDropdowntimkiem")
  .addEventListener("mouseout", function () {
    // Ẩn dropdown-content khi di chuột ra ngoài
    this.classList.remove("showtimkiem");
  });

document
  .getElementById("myDropbtntimkiem")
  .addEventListener("mouseout", function () {
    // Ẩn dropdown-content khi di chuột ra ngoài button
    document
      .getElementById("myDropdowntimkiem")
      .classList.remove("showtimkiem");
  });

function hideDropdowntimkiem() {
  document.getElementById("myDropdowntimkiem").classList.remove("showtimkiem");
}
*/
// JavaScript để xử lý sự kiện (giữ nguyên từ mã trước)

function myFunctiontimkiem() {
  document.getElementById("myDropdowntimkiem").classList.toggle("showtimkiem");
}

function filterFunctiontimkiem() {
  const input = document.getElementById("myInputtimkiem");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdowntimkiem");
  const a = div.getElementsByTagName("a");
  let isMatchFound = false; // Biến để theo dõi kết quả tìm kiếm

  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
      isMatchFound = true; // Đánh dấu có kết quả tìm kiếm
    } else {
      a[i].style.display = "none";
    }
  }
  // Hiển thị/ẩn thông báo "Không tìm thấy sản phẩm"
  document.getElementById("noResultstimkiem").style.display = isMatchFound
    ? "none"
    : "block";
}
// end JavaScript thanh tìm kiếm/////////////////////////////////////////////////

// slideshow////////////////////////////////////////////////////////////
// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 1,
  intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 5000);
};
// Call autoSlide function on page load
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex =
    imageIndex === images.length
      ? 0
      : imageIndex < 0
      ? images.length - 1
      : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);

// //////////////end slideshow////////////////////////////////////////////////////////////
