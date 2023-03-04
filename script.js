const loadData = () => {
    
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools.slice(0, 6)))
    loading(true);
}


// to show 6 data only
const displayData = results => {
    const divContainer = document.getElementById('div-container');
    divContainer.innerHTML = "";

    results.forEach(result => {
        // console.log(result);
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('col');
        creatDiv.innerHTML =`
        <div class="card" style="width: 25rem;">
        <img src="${result.image}" style="height: 250px; border-radius: 5%;" class="card-img-top p-3 " alt="...">
        <div class="card-body">
          <h3 class="card-title">Features</h3>
          <ol>
              <li>${result.features[0]}</li>
              <li>${result.features[1]}</li>
              <li>${result.features[2]}</li>
              
        </ol>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h3>${result.name}</h3>
                    <i class="fa-solid fa-calendar-days"></i> <span class='ms-2'>${result.published_in} </span>
                </div>
                <div>
                    <i onclick="seeModel('${result.id}')" type="button" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </div>
            </div>
          </li>
        </ul>
        
    </div>`
        divContainer.appendChild(creatDiv);   
    });
    loading(false)
}

// show all card 
const seeMore = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
    loading(true);
    const hide = document.getElementById('see-more');
    hide.classList.add('d-none');
}


// Show Modal
const seeModel = (id) => {
    
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
    .then((res) => res.json())
    .then((data => showModalDetails(data.data)));
}

const showModalDetails = (value) => {
    // console.log(value.pricing[0]);
    const gets = Object.keys(value.features);

    for(const i of gets){
        // console.log(value.accuracy.score);
    }


    const modalDiv = document.getElementById('modal-div');
    modalDiv.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
    <div class="modal-header">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    
    </div>

  <div class="modal-body d-lg-flex gap-5 mx-5 my-5">

    <div  class="b w-lg-50 p-3 bg-danger bg-opacity-10">
        <h3>${value.description}</h3>
        <div class="d-lg-flex g-2 justify-content-around my-3">
        
        <div class=" bg-light text-center my-2 p-3 shadow-sm rounded fw-bold text-success">${value.pricing[0].price ==="No cost" || value.pricing === null ? "Free of cost" : value.pricing[0].price} 
        <p>${value.pricing[0].plan}</p>
        </div>
        <div class="bg-light text-center my-2 p-3 shadow-sm rounded fw-bold text-warning">${value.pricing[1].price ==="No cost" || value.pricing === null ? "Free of cost" : value.pricing[1].price} 
        <p>${value.pricing[1].plan}</p>
        </div>
        <div class="bg-light text-center my-2 p-3 shadow-sm rounded fw-bold text-danger">${value.pricing[2].price} 
        <p>${value.pricing[2].plan}</p>
        </div>
        </div>

        <div class="d-flex justify-content-around mt-4">
            <div>
                <h3>Features</h3>
                <ul>
                    <li>${value.features[1].feature_name}</li>
                    <li>${value.features[2].feature_name}</li>
                    <li>${value.features[3].feature_name}</li>
                </ul>
            </div>

            <div>
                <h3>Integrations</h3>
                <ul>
                    <li>${value.integrations[0]  === undefined ? "Not Found" : value.integrations[0]}</li>
                    <li>${value.integrations[1] === undefined ? "Not Found" : value.integrations[1]}</li>
                    <li>${value.integrations[2] === undefined ? "Not Found" : value.integrations[2]}</li>
                </ul>
            </div>

        </div>
        
    </div>

    <div  class="parent p-3 w-100 shadow-sm rounded">
    <img src="${value.image_link[0]}" style="height: 350px; width: 100%" alt="">
    <h3 class="text-center mt-3">${value.input_output_examples[0].input}</h3>
    <p class="text-center">${value.input_output_examples[0].output}</p>

    
    <button id="acu" class="btn btn-danger top"><span id="accuracy">${value.accuracy.score === null ? '' : value.accuracy.score}</span>% accuracy</button>
    </div>
    
    
  </div>
  </div>
    `
    modalDiv.appendChild(div);
}

// loading spinner
const loading = isLoading => {
    const loadSection = document.getElementById('spinner');
    if(isLoading) {
        loadSection.classList.remove('d-none');
    }
    else{
        loadSection.classList.add('d-none');
    }
}

loadData();