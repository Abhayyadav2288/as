// //  var a = 12;

// // switch (a) {
// //     case 1:
// //         document.write("The Value is True");
// //        break;
// //     case 10:
// //         document.write("The Value is True 1");
// //         break;
// //     case 11:
// //         document.write("The Value is True 2");
// //         break;
// //     case 12:
// //         document.write("The Value is True 3");
// //         break;
// //     default:
// //         document.write("Check the Value");
// // }

// // function abc(){
// //     document.write("This is function");
// // }

// // script.js

// const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
// const gallery = document.getElementById('gallery');

// // Fetch photos from Unsplash API
// fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`)
//   .then(response => response.json())
//   .then(data => {
//     // Create gallery items for each photo
//     data.forEach(photo => {
//       const galleryItem = document.createElement('div');
//       galleryItem.classList.add('gallery-item');

//       const img = document.createElement('img');
//       img.src = photo.urls.regular;
//       img.alt = photo.alt_description;

//       galleryItem.appendChild(img);
//       gallery.appendChild(galleryItem);
//     });
//   })
//   .catch(error => {
//     console.log('Error fetching photos:', error);
//   });

const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 0 and 11";
    return;
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            errorMessageEl.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error happened, try again later";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}

btnEl.addEventListener("click", fetchImage);
