
(function() {
  var images = document.querySelectorAll('.image-holder');
  var heading = document.querySelector('.heading');
  var subhead = document.querySelector('.main-copy h2');
  var seasonText = document.querySelector('.main-copy p');
  var appliedClass;

  class Lightbox {
    constructor() {
      this.el = document.querySelector('.lightbox');
      this.img = this.el.querySelector('.lightbox-img');
      this.desc = this.el.querySelector('.img-desc');
      this.close = this.el.querySelector('.close-lightbox');
      this.left = this.el.querySelector('.fa-arrow-left');
      this.right = this.el.querySelector('.fa-arrow-right');
    }
  }

  //change all the content on the page
  function changeElements() {
    //debugger; //this is a special term that stops code execution
    let subImages = document.querySelector('.subImagesContainer');
    let objectIndex = dynamicContent[this.id];

    //remove previous images
    while(subImages.firstChild) {
      subImages.removeChild(subImages.firstChild);
    }

    //add the images to the bottom ofthe page
    objectIndex.images.forEach(function(img, index) {
      //create and image element
      let newSubImg = document.createElement('img');

      //add a css class to it
      newSubImg.classList.add('thumb');

      //change src propertie
      newSubImg.src = 'images/' + objectIndex.images[index];

      newSubImg.dataset.index = index;

      //add an event handler to trigger a lightbox
      //using a function to call another one to pass arguments
      newSubImg.addEventListener('click', function() {popLightbox(index, objectIndex);}, false);

      subImages.appendChild(newSubImg);
    });

    subhead.classList.remove(appliedClass);
    heading.classList.remove(appliedClass);

    subhead.firstChild.nodeValue = objectIndex.headline;
    seasonText.firstChild.nodeValue = objectIndex.text;

    subhead.classList.add(this.id);
    heading.classList.add(this.id);

    appliedClass = this.id;
  }

  images.forEach(function(img, index) {
    //add an event handler to each image
    img.addEventListener('click', changeElements, false);
  });

  function popLightbox(currentIndex, currentObject) {
    //move window to the top every time we click - quick bug fix
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    let lightbox = new Lightbox();

    lightbox.el.style.display = 'block';
    lightbox.img.src = 'images/' + currentObject.images[currentIndex];
    lightbox.desc.innerHTML = currentObject.imageDescription[currentIndex];

    lightbox.close.addEventListener('click', closeLightbox, false);
  }

  function closeLightbox() {
    let lightbox = new Lightbox();

    lightbox.el.style.display = null;
    document.body.style.overflow = null;
    lightbox.img.src = "#";
    lightbox.desc.innerHTML = null;
  }

  changeElements.call(document.querySelector('#spring'));

})();
