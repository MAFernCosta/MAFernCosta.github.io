// back to top button
const backUpBtn = document.getElementById("back-up");
function scrollBacktoTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = () => {
    if (document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20) {
        backUpBtn.classList.remove('d-none');
    } else {
        backUpBtn.classList.add('d-none');
    }
}
const projectsContainer = document.getElementById("projects-container");
const projectsNav = document.getElementById("projects-nav");

const itemsToShow = 6;
let pageIndex = 1;
let startingIndex = 0;
let endingIndex = itemsToShow;
let projectsArr = [];
let numOfPages = 0;

fetch('./projects/projects.json')
  .then((res) => res.json())
  .then((data) => {
    projectsArr = data;
    displayProjects(projectsArr.slice(startingIndex, endingIndex), projectsArr.length);
  })
  .catch((err) => {
    projectsContainer.innerHTML = '<p class="alert alert-danger my-5">There was an error loading the authors</p>';
  });

  const displayProjects = (projects , length) =>{
    displayPagination(length);
    projectsContainer.innerHTML = "";
    projects.forEach(({title, description, image, demo, github, date}) =>{
        projectsContainer.innerHTML +=`
        <div class="card tile">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <img src="${image}" alt="" class="border card-img tile-img">
              <p class="card-text py-2">
                ${description}
              </p>
              <p class="card-text text-body-secondary pb-2"> <small> ${date ? "Date: " + date : ""}</small></p>
              ${demo ? '<a href="' + demo +'" class="btn btn-secondary"><i class="bi bi-play-fill"></i> Live</a>' : ""}
              ${github ? '<a href="' + github +'" class="btn btn-secondary"><i class="bi bi-github"></i> GitHub</a>' : ""}
              
            </div>
          </div>
        `;
    });    
  }

  const displayPagination = (length) =>{
    numOfPages = Math.ceil(length / itemsToShow);
    //console.log("Number of Pages: " + numOfPages);
    if(numOfPages === 0){
        return;
    }
    
    let content = `
    <ul class="pagination">
    <li class="page-item">
      <a class="page-link link-secondary" aria-label="Previous" href="#my-projects" onclick="changePage('prev')">
        <span aria-hidden="true">&laquo;</span>
      </a>
    `;
    for(let i = 1; i <= numOfPages; i++){
        content += `
        <li class="page-item"><a class="page-link link-secondary ${pageIndex === i ? "text-bg-secondary text-light" : "" }" href="#my-projects" onclick="changePage(${i})">${i} </a></li>
        `;
    }
    content += `
        <li class="page-item">
        <a class="page-link link-secondary" href="#my-projects" aria-label="Next" onclick="changePage('next')">
            <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
    </ul>
    `;
    projectsNav.innerHTML = content;
  }

const changePage = (index) => {
  if(index === "next"){
    if( pageIndex + 1 > numOfPages ){
      return
    }
    index = pageIndex + 1;
  }else if (index === "prev"){
    if( pageIndex - 1 <= 0 ){  
      return
    }
    index = pageIndex - 1;
  }
  endingIndex = index * itemsToShow;
  startingIndex = endingIndex - itemsToShow;
  pageIndex = index;
  displayProjects(projectsArr.slice(startingIndex, endingIndex), projectsArr.length);
  //console.log("Index: " + index + " Page Index: " + pageIndex + " startingIndex: " + startingIndex + " EndingIndex: " + endingIndex);
}