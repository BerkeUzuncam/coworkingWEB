// Selecteer elementen
let buttonEl = document.querySelectorAll(".button-el");
console.log(buttonEl);
let all = document.querySelector(".all");
let remove = document.querySelector(".remove");
let flourEl = document.querySelector(".flour-el");

// Controleer of de pop-up al is gezien
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("popupSeen")) {
    // Toon de pop-up als deze nog niet is gezien
    all.style.display = "block";
  }
});

for (let i = 0; i < buttonEl.length; i++) {
  buttonEl[i].addEventListener("click", function () {
    all.style.display = "block";
  });
}

remove.addEventListener("click", function () {
  all.style.display = "none";
  // Sla op dat de pop-up is gezien
  localStorage.setItem("popupSeen", "true");
});

flourEl.addEventListener("click", function () {
  all.style.display = "none";
  // Sla op dat de pop-up is gezien
  localStorage.setItem("popupSeen", "true");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && all.style.display === "block") {
    all.style.display = "none";
    // Sla op dat de pop-up is gezien
    localStorage.setItem("popupSeen", "true");
  }
});

