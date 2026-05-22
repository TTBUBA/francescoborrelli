document.addEventListener("DOMContentLoaded", () => {

  const projects = document.querySelectorAll(".project");
  const closeBtn = document.getElementById("close-btn");

  function reset() {
    projects.forEach(p => p.classList.remove("active"));
    document.body.classList.remove("has-active");
  }

  projects.forEach(project => {
    const btn = project.querySelector(".project-btn");

    btn.addEventListener("click", () => {
      reset();
      project.classList.add("active");
      document.body.classList.add("has-active");
    });
  });

  closeBtn.addEventListener("click", reset);

});