//constructor in Java is a special method that is used to initialize objects. 
class Attire {
  constructor(id, name, ethnic, description, image, price, availability) {
    this.id = id;
    this.name = name;
    this.ethnic = ethnic;
    this.description = description;
    this.image = image;
    this.price = price;
    this.available = available;
  }

  getDisplayName() {
    retrun `${this.name} (${this.ethnic})`;
    }
  }
/*
  const nigerianAttire = [
    new Attire(1, "Yoruba Aso-Oke", "Yoruba", "Aso-Oke is the prestigious hand-woven cloth of the Yoruba, a major ethnic group in the southwest of Nigeria.", "images/AsoOke.webp", 500, true),
    new Attire(2, "Igbo Isiagu", "Igbo", "The Igbo men traditional attire is called Isiagu, also known as Chieftaincy. This is made with high-quality suede materials.", "images/Isiagwu.jpg", 400, true),
    new Attire(3, "Hausa Babaringa", "Hausa", "The traditional dress of the Hausa consists of loose flowing gowns and trousers. The gowns have wide openings on both sides for ventilation.", "images/hausaStyle.webp", 390, true),
    new Attire(4, "Benin Royal Attire", "Benin", "Benin traditional attire features coral beads, rich fabrics, and royal symbols reflecting the kingdom's heritage.", "images/benin.jpg", 510, false),
    new Attire(5, "Efik Traditional Dress", "Efik", "Efik attire features beautiful patterns and designs, often worn during ceremonies and celebrations.", "images/AsoOke.webp", 28000, false)
];*/

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
      image: "images/AsoOke.webp",
      price: 28000,
      available: false
    }
  ];
 
let displayedAttires = [];
let nigerianAttire = [];
let currentSort = "default";
let currentFilter = "All";
let itemsToShow = 3; // Initially show 3 items

function showLoading(show) {
  
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
        const img = new Image();
        img.src = attire.image;
        img.onerror = () => console.error(`Image not found: ${attire.image}`);


      const attireCard = `
        <div class="attire2">
        <img src="${attire.image}" alt="${attire.name}">
        <div class="layer">
        <h3>${attire.name}</h3>
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
    }else if (itemsToShow > 3) {
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
  //sortAttireByOrder(displayedAttires, sortOrder);
}
  

  window.onload = function () {
    displayAttires(nigerianAttire); 
  

  const seeMoreBtn = document.querySelector("#attire .btn");
    if (seeMoreBtn) {
        seeMoreBtn.onclick = toggleItems;
    } else {
        console.error("Button not found on load!");
    }
    function searchAttire() {
    console.log("Search functionality not implemented yet!");
}
};

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
  { name: "Efik Traditional", category: "Efik", image: "efikstyle.jpg" },
  
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
          