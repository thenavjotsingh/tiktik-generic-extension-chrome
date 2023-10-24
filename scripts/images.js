var imageArray = [
    "../res/images/image1.jpeg",
    "../res/images/image2.jpeg",
    "../res/images/image3.jpeg",
    "../res/images/image4.jpeg",
    "../res/images/image5.jpeg",
    "../res/images/image6.jpeg",
    "../res/images/image7.jpeg",
    "../res/images/image8.jpeg",
    "../res/images/image9.jpeg",
    "../res/images/image10.jpeg",
    "../res/images/image11.jpeg",
    "../res/images/image12.jpeg",
    "../res/images/image13.jpeg",
    "../res/images/image14.jpeg",
    // Add more image URLs here
  ];

  function loadImages() {
    var imageContainer = document.getElementById("imageContainer");
  
    // Loop through the image array
    for (var i = 0; i < imageArray.length; i++) {
      var image = document.createElement("img");
      image.src = imageArray[i];
      image.classList.add("thumbnail");
  
      // Add click event listener to show larger image
      image.addEventListener("click", function () {
        showImage(this.src);
      });
  
      imageContainer.appendChild(image);
    }
  }

  function showImage(src) {
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");
  
    var image = document.createElement("img");
    image.src = src;
    image.classList.add("larger-image");
  
    overlay.appendChild(image);
    document.body.appendChild(overlay);
  
    // Add click event listener to close the image
    overlay.addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
  }

  // Call the loadImages function when the page is loaded
window.onload = function () {
    loadImages();
  };