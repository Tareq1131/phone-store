const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
};
const displayPhone = (phones) => {
  console.log(phones[0]);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";
  //   display 15 phones only
  phones = phones.slice(0, 15);
  //   display no phones
  const noPhone = document.getElementById("message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  //    display all phone
  phones.forEach((phones) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
       <img src="${phones.image}" class="card-img-top" alt="..." />
       <div class="card-body">
       <h4>${phones.brand}</h4>
         <h5 class="card-title">${phones.phone_name}</h5>
         <p class="card-text">
           This is a longer card with supporting text below as a
           natural lead-in to additional content. This content is a
           little bit longer.
         </p>
       </div>
     </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  //stop loader
  toggleSpinne(false);
};
//handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  //start loader
  toggleSpinne(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
});
const toggleSpinne = (isLoading) => {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("d-none");
  } else {
    loaderSpinner.classList.add("d-none");
  }
};
//loadPhones();
