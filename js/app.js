const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};
const displayPhone = (phones, dataLimit) => {
  console.log(phones[0]);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";
  //   display 15 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

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
         <button onClick="loadPhoneDetails('${phones.slug}')" href='#' class = 'btn btn-primary' data-bs-toggle="modal"
         data-bs-target="#phoneDetailModal" >show details</button>
      
      
         </div>
     </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  //stop loader spinner
  toggleSpinne(false);
};

const processSearch = (dataLimit) => {
  toggleSpinne(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

//handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  //start loader
  //   toggleSpinne(true);
  //   const searchField = document.getElementById("search-field");
  //   const searchText = searchField.value;
  //   loadPhones(searchText);
  processSearch(10);
});
//search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      processSearch(10);
    }
  });

const toggleSpinne = (isLoading) => {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("d-none");
  } else {
    loaderSpinner.classList.add("d-none");
  }
};


//not best way to load show all data for the api
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone =>{
  console.log(phone);
  const modaltitle = document.getElementById('phoneDetailModalLabel');
  modaltitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <p>Relase Date:${phone.releaseDate ? phone.releaseDate :'No releaseDate'}</p>
  <p>Storage:${phone.mainFeatures ? phone.mainFeatures
    .storage: "No storage"
  }</p>
  <p>Display:${phone.mainFeatures
    .displaySize
}</p>
  `
}

loadPhones('apple');
