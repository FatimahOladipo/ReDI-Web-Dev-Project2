

class NigerianAttire {
  constructor(id, name, ethnic, description, image, price, available) {
    this.id = id;
    this.name = name;
    this.ethnic = ethnic;
    this.description = description;
    this.image = image;
    this.price = price;
    this.available = available;

  }

  getDisplayName() {
    return `${this.name} (${this.ethnic}Culture)`;
    }
        
  }
  

let nigerianAttire = [];
let displayedAttires = [];
let currentSort = "default";
let currentFilter = "All";
let itemsToShow = 3; 


const originalAttireData = [
    {
    
      name: "Yoruba Aso-Oke",
      ethnic: "Yoruba",
      description: "Aso-Oke is the prestigious hand-woven cloth with amazing patterns and bright colors. Worn by Yoruba people for special celebrations. Yoruba is a major ethnic group in the southwest of Nigeria.",
      image: "images/AsoOke.webp",
      price: 500,
      available: true
    },
    {
    
      name: "Igbo Isiagu",
      ethnic: "Igbo",
      description: "The Igbo men traditional attire is called Isiagu, also known as Chieftaincy. This is made with high-quality suede materials. With lion patterns! Lions are symbols of strength and courage in Igbo culture.",
      image: "images/Isiagwu.jpg",
      price: 400,
      available: true
    },
    {
   
      name: "Hausa Babaringa",
      ethnic: "Hausa",
      description: "The traditional dress of the Hausa consists of loose flowing gowns and trousers. The gowns have wide openings on both sides for ventilation. Flowing robes that keep you cool in hot weather. Perfect for the desert regions where Hausa people live!",
      image: "images/hausaStyle.webp",
      price: 390,
      available: true
    },
    {
  
      name: "Benin Royal Attire",
      ethnic: "Benin",
      description: "Benin traditional attire clothes fit for a king or queen, features coral beads, rich fabrics, and royal symbols reflecting the kingdom's heritage.",
      image: "images/benin.jpg",
      price: 510,
      available: false
    },
    {
     
      name: "Efik Traditional Dress",
      ethnic: "Efik",
      description: "Efik attire features beautiful patterns and designs, often worn during ceremonies and celebrations.",
      image: "images/efikTraditional.jpg",
      price: 28000,
      available: false
    }
  ];


function showLoading(show) {
  const container = document.getElementById("attireContainer");
  if (show) {
    container.innerHTML = "<p style='text-align: center;'>Loading...</p>";
  }
}

  function displayAttires(attires) {
    const container = document.getElementById("attireContainer");
    if (!container) {
        console.error("Attire container not found!");
        return;
    }
    container.innerHTML ="";
  
  const limitedAttires = attires.slice(0, itemsToShow);
  displayedAttires = attires;

  if (limitedAttires.length === 0) {
        container.innerHTML = "<p style='text-align: center; color: red;'>No matching attire found.</p>";
        return;
    }

  limitedAttires.forEach(attire => {
      const attireCard = `
        <div class="attire2">
          <img src="${attire.image}" alt="${attire.name}"> 
          <div class="layer">
            <h3>${attire.getDisplayName()}</h3>
            <p>${attire.description}</p>
            <p><strong>₦${attire.price}</strong> | ${attire.available ? "Available" : "Out of Stock"}</p>
            <a href="#"><i class="fa-solid fa-up-right-from-square"></i></a>
        </div>
      </div>
    `;
    container.innerHTML += attireCard;
  });

    const seeMoreBtn = document.querySelector("#attire .btn");
  if (seeMoreBtn) {
      if (itemsToShow < displayedAttires.length) {
          seeMoreBtn.textContent = "see more";
          seeMoreBtn.style.display = "inline-block";
      } else if (itemsToShow > 3) {
          seeMoreBtn.textContent = "Show less";
          seeMoreBtn.style.display = "inline-block";
      } else {
          seeMoreBtn.style.display = "none";
      }
    } else {
        console.error("See more button not found!");
    }
  }

    function toggleItems() {
    if (itemsToShow > 3) {
      itemsToShow = 3;
    } else {
      itemsToShow += 2;
    }
    displayAttires(displayedAttires);
  }


  function filterAttire() {
  currentFilter = document.getElementById("ethnicFilter").value;
  let filtered = nigerianAttire;

  if (currentFilter !== "All") {
    filtered = nigerianAttire.filter(item => item.ethnic === currentFilter);
  }

  itemsToShow = 3;
  sortAttireByOrder(filtered, currentSort);
}

function sortAttireByOrder(attires, sortOrder) {
  console.log("attires", attires)
  let sorted = [...attires];
  if(sortOrder === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if(sortOrder === "high") {
    sorted.sort((a,b) => b.price - a.price);
  }
  console.log("sorted", sorted)
  displayAttires(sorted);
}

  function sortAttire(sortOrder) {
  currentSort = sortOrder;
  sortAttireByOrder(displayedAttires, sortOrder);
}

  
function searchAttire() {
    console.log("Search button clicked!"); 
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) {
    console.error("Search input not found!");
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();
   // console.log(`Search text: "${searchText}"`); 

    if (!searchText) {
        displayAttires(nigerianAttire); 
        return;
    }

    if (nigerianAttire.length === 0) {
        console.warn("No attire data loaded yet. Please wait...");
        return;
    }

    const filtered = nigerianAttire.filter(item =>
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.ethnic.toLowerCase().includes(searchText)
    );
   
    itemsToShow = 3;
    displayAttires(filtered);

}

function showError(message) {
  const container = document.getElementById("attireContainer");
  container.innerHTML = `<p style='text-align: center; color: red;'>${message}</p>`;
  
}


async function fetchAttireData() {   
    showLoading(true);

    try {  
        const response = await fetch("https://dummyjson.com/products?limit=5");
        if (!response.ok) {
            throw new Error("Failed to fetch data from API/Could not get clothes from the internet");
        }
        const data = await response.json();
        nigerianAttire = data.products.map((product, index) => {
        const item = originalAttireData[index % originalAttireData.length];
        
            return new NigerianAttire(
                product.id,
                item.name,          
                item.ethnic,        
                item.description,   
                item.image,         
                item.price,         
                item.available      
            );
        });


      console.log("Successfully loaded clothes:", nigerianAttire);
      displayAttires(nigerianAttire);

    } catch (error) {
      console.error("Error loading clothes:", error);
      showError('Oops! Could not load clothes from the internet. Showing sample clothes instead.');
   
        nigerianAttire = originalAttireData.map((data, index) => 
            new NigerianAttire(index, data.name, data.ethnic, data.description, data.image, data.price, data.available)
        );
        displayAttires(nigerianAttire);
   
    } finally {
      showLoading(false);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Starting Nigerian Fashion Explorer!");
    
    fetchAttireData();

    document.getElementById('searchBtn').addEventListener("click", searchAttire);
    console.log("Search button event listener added successfully.");

    document.getElementById('searchInput').addEventListener('keyup', function(event) {
       if (event.key === 'Enter') {
           searchAttire();
       }
  });


    const seeMoreBtn = document.querySelector("#attire .btn");
    if (seeMoreBtn) {
      seeMoreBtn.addEventListener("click", toggleItems);
      } else {
        console.error("See more button not found!");
    }


    const searchBtn = document.querySelector(".search-container button");
    if (searchBtn) {
        searchBtn.addEventListener("click", searchAttire);
        console.log("Search button event listener added successfully.");
    } else {
        console.error("Search button not found!");
    }


  const sheetName = 'Form Responses';
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");
  const scriptURL = "https://script.google.com/macros/s/AKfycbxuRZKnXgHuRlfa5D7Q31ttTtuQ7hrDuxKX9IcYo_C1dQswKulFM-2lfhpW1bL6PUZP8Q/exec";


document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully!";
        msg.style.color = "green";
        setTimeout(() => msg.innerHTML = "", 5000);
        form.reset();
      })
      .catch(error => {
        msg.innerHTML = "Error sending message.";
        msg.style.color = "red";
        console.error("Form submission error:", error.message);
      });

   });
});











