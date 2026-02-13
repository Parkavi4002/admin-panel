function showSection(sectionId) {
  document.getElementById("products").classList.add("hidden");
  document.getElementById("users").classList.add("hidden");

  document.getElementById(sectionId).classList.remove("hidden");
}
