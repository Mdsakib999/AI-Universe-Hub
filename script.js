const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}

const displayData = results => {
    const divContainer = document.getElementById('div-container');
    results.forEach(result => {
        console.log(result);
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('col');
        creatDiv.innerHTML =`
        <div class="card" style="width: 25rem;">
        <img src="${result.image}" class="card-img-top p-3 " alt="...">
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
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
          </li>
        </ul>
        
    </div>

        `
        divContainer.appendChild(creatDiv);
        
    });
}


loadData();