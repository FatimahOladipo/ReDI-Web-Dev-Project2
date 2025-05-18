//constructor in Java is a special method that is used to initialize objects. 
class Attire {
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
    return `${this.name} (${this.ethnic})`;
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
      description: "Aso-Oke is the prestigious hand-woven cloth of the Yoruba, a major ethnic group in the southwest of Nigeria.",
      image: "images/AsoOke.webp",
      price: 500,
      available: true
    },
    {
    
      name: "Igbo Isiagu",
      ethnic: "Igbo",
      description: "The Igbo men traditional attire is called Isiagu, also known as Chieftaincy. This is made with high-quality suede materials.",
      image: "images/Isiagwu.jpg",
      price: 400,
      available: true
    },
    {
   
      name: "Hausa Babaringa",
      ethnic: "Hausa",
      description: "The traditional dress of the Hausa consists of loose flowing gowns and trousers. The gowns have wide openings on both sides for ventilation.",
      image: "images/hausaStyle.webp",
      price: 390,
      available: true
    },
    {
  
      name: "Benin Royal Attire",
      ethnic: "Benin",
      description: "Benin traditional attire features coral beads, rich fabrics, and royal symbols reflecting the kingdom's heritage.",
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
    container.innerHTML = "<p style='text-align: centre;'>Loading...</p>";
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
  currentFilter = document.getElementById("attireSelect").value;
  let filtered = nigerianAttire;

  if (currentFilter !== "All") {
    filtered = nigerianAttire.filter(item => item.ethnic === currentFilter);
  }

  itemsToShow = 3;
  sortAttireByOrder(filtered, currentSort);
}

function sortAttireByOrder(attires, sortOrder) {
  let sorted = [...attires];
  if(sortOrder === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if(sortOrder === "high") {
    sorted.sort((a,b) => b.price - a.price);
  }
  displayAttires(sorted);
}

  function sortAttire(sortOrder) {
  currentSort = sortOrder;
  sortAttireByOrder(displayedAttires, sortOrder);
}
  
function searchAttire() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filtered = nigerianAttire.filter(item => 
    item.name.toLowerCase().includes(searchInput) ||
    item.description.toLowerCase().includes(searchInput) ||
    item.ethnic.toLowerCase().includes(searchInput)
    );
    itemsToShow = 3;
    sortAttireByOrder(filtered, currentSort);
}

async function fetchAttireData() {
    showLoading(true);
    try {
        const response = await fetch("https://dummyjson.com/products?limit=5");
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();
        nigerianAttire = data.products.map((product, index) => {
        const original = originalAttireData[index % originalAttireData.length];
        
            return new Attire(
                product.id,
                original.name,          // Use original Nigerian name
                original.ethnic,        // Use original ethnic group
                original.description,   // Use original description
                original.image,         // Use original image
                original.price,         // Use original price
                original.available      // Use original availability
            );
        });
        displayAttires(nigerianAttire);
    } catch (error) {
        console.error("Error fetching attire data:", error);
        document.getElementById("attireContainer").innerHTML = "<p style='text-align: center; color: red;'>Failed to load attire data. Please try again later.</p>";
    } finally {
        showLoading(false);
    }
}

window.onload = () => {
    fetchAttireData();

    const seeMoreBtn = document.querySelector("#attire .btn");
    if (seeMoreBtn) {
        seeMoreBtn.onclick = toggleItems;
    } else {
        console.error("Button not found on load!");
    }

    const searchBtn = document.querySelector(".search-container button");
    if (searchBtn) {
        searchBtn.onclick = searchAttire;
    }
};


/*
// Define your local images to map to API data
const localImages = [
    "images/AsoOke.webp",    // Yoruba
    "images/Isiagwu.jpg",    // Igbo
    "images/hausaStyle.webp",// Hausa
    "images/benin.jpg",      // Benin
    "images/efiktraditional.jpg"     // Efik (reusing AsoOke.webp as in your original data)
];*/
/*
  const nigerianAttire = [
    new Attire(1, "Yoruba Aso-Oke", "Yoruba", "Aso-Oke is the prestigious hand-woven cloth of the Yoruba, a major ethnic group in the southwest of Nigeria.", "images/AsoOke.webp", 500, true),
    new Attire(2, "Igbo Isiagu", "Igbo", "The Igbo men traditional attire is called Isiagu, also known as Chieftaincy. This is made with high-quality suede materials.", "images/Isiagwu.jpg", 400, true),
    new Attire(3, "Hausa Babaringa", "Hausa", "The traditional dress of the Hausa consists of loose flowing gowns and trousers. The gowns have wide openings on both sides for ventilation.", "images/hausaStyle.webp", 390, true),
    new Attire(4, "Benin Royal Attire", "Benin", "Benin traditional attire features coral beads, rich fabrics, and royal symbols reflecting the kingdom's heritage.", "images/benin.jpg", 510, false),
    new Attire(5, "Efik Traditional Dress", "Efik", "Efik attire features beautiful patterns and designs, often worn during ceremonies and celebrations.", "images/efiktraditional.jpg", 28000, false)
];*/


/*
  window.onload = () => {
    showLoading(true);
     try {
        displayAttires(nigerianAttire); 
  } catch (error) {
    console.error("Error fetching attire data:", error);
    document.getElementById("attireContainer").innerHTML = "<p style='text-align: center; color: red;'>Failed to load attire data. Please try again later.</p>";
  } finally {
  showLoading(false);
  }

  const seeMoreBtn = document.querySelector("#attire .btn");
    if (seeMoreBtn) {
        seeMoreBtn.onclick = toggleItems;
    }

  const searchBtn = document.querySelector(".search-container button");
    if (searchBtn) {
        searchBtn.onclick = searchAttire;
    }
};
*/

/*
const nigerianAttire = [
    {
      id: 1,
      name: "Yoruba Aso-Oke",
      ethnic: "Yoruba",
      description: "Aso-Oke is the prestigious hand-woven cloth of the Yoruba, a major ethnic group in the southwest of Nigeria.",
      image: "images/AsoOke.webp",
      price: 500,
      available: true
    },
    {
      id: 2,
      name: "Igbo Isiagu",
      ethnic: "Igbo",
      description: "The Igbo men traditional attire is called Isiagu, also known as Chieftaincy. This is made with high-quality suede materials.",
      image: "images/Isiagwu.jpg",
      price: 400,
      available: true
    },
    {
      id: 3,
      name: "Hausa Babaringa",
      ethnic: "Hausa",
      description: "The traditional dress of the Hausa consists of loose flowing gowns and trousers. The gowns have wide openings on both sides for ventilation.",
      image: "images/hausaStyle.webp",
      price: 390,
      available: true
    },
    {
      id: 4,
      name: "Benin Royal Attire",
      ethnic: "Benin",
      description: "Benin traditional attire features coral beads, rich fabrics, and royal symbols reflecting the kingdom's heritage.",
      image: "images/benin.jpg",
      price: 510,
      available: false
    },
    {
      id: 5,
      name: "Efik Traditional Dress",
      ethnic: "Efik",
      description: "Efik attire features beautiful patterns and designs, often worn during ceremonies and celebrations.",
      image: "images/efiktraditional.jpg",
      price: 28000,
      available: false
    }
  ];
 */



/*
        const img = new Image();
        img.src = attire.image;
        img.onerror = () => console.error(`Image not found: ${attire.image}`);
*/




















/*
  window.onload = function () {*/




  

    
    /*function searchAttire() {
    console.log("Search functionality not implemented yet!");*/


/*
  
  // Simple verification that the array is working
console.log("Nigerian Attire array loaded successfully!");
console.log("Number of attire:", nigerianAttire.length);

// You can add more code here as needed to use the array data


const nigerianAttire = [
  { name: "Yoruba Aso Oke", category: "Yoruba", image: "yorubaAsoOke.webp" },
  { name: "Igbo Isi Agu", category: "Igbo", image: "Isiagwu.jpg" },
  { name: "Hausa Babban Riga", category: "Hausa", image: "hausaStyle.webp" },
  { name: "Benin Royal Wear", category: "Benin", image: "benin.jpg" },
  { name: "Efik Traditional", category: "Efik", image: "efiktraditional.jpg" },
  
];

function filterAttire() {
  const selected = document.getElementById("attireSelect").value;

  const filtered = selected === "All"
  ? nigerianAttire
  : nigerianAttire.filter(item => item.category === selected);
  displayAttires(nigerianAttire);
}

*/







/*
//filter
const filterAttires = ["All", "Yoruba", "Igbo", "Hausa", "Benin", "Efik"];

function filterAttire(){
  const selected = document.getElementById("attireSelect").value;

  const result = selected === "All"
  ? filterAttires
  : filterAttires.filter(attire => attire === selected);
  document.getElementById("attireSelect").innerHTML = result.join(", ");
}

*/
