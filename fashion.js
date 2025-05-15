
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
let currentSort = "default";
let currentFilter = "All";
let itemsToShow = 3; // Initially show 3 items

  function displayAttires(attires) {
    const container = document.getElementById("attireContainer");
    container.innerHTML ="";
  
  const limitedAttires = attires.slice(0, itemsToShow);
  displayedAttires = attires;

    limitedAttires.forEach(attire => {
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
    if (attires.length > itemsToShow) {
      seeMoreBtn.style.display = "inline-block";
    } else {
      seeMoreBtn.style.display = "none";
    }
  }
}

function showMore() {
    itemsToShow += 2; 
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

  function sortAttire(sortOrder) {
  currentSort = sortOrder;
  sortAttireByOrder(displayedAttires, sortOrder);
}
  

  window.onload = function () {
    displayAttires(nigerianAttire); 
  

  const seeMoreBtn = document.querySelector("#attire .btn");
    if (seeMoreBtn) {
        seeMoreBtn.onclick = showMore;
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
          