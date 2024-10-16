async function fetchData(page = 1) {
    try {
        document.querySelector('.loading-button').style.display = 'block';

        const response = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await response.json();

        const container = document.querySelector('.row');

        container.innerHTML = '';

        data.data.forEach(user => {
            const card = `<div class="card d-flex justify-content-center m-4" style="width: 12rem;">
                    <img src="${user.avatar}" class="card-img-top " alt="...">
                    <div class="card-body">
                        <h5 class="name">${user.first_name}</h5>
                        <h6 class="last-name">${user.last_name}</h6>
                        <p class="email">${user.email}</p>
                        <p class="id">${user.id}</p>
                    </div>
                </div>`;
            container.innerHTML += card
            
        });

        setTimeout(() => {
            document.querySelector('.loading-button').style.display = 'none';
        }, 3000);

    } catch (error) {
        console.error('Error, algo salió mal', error);
    }
}

function handlePagination() {
    const paginationLinks = document.querySelectorAll('.page-link');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const page = event.target.textContent;
            
            document.querySelector('.loading-button').style.display = 'block';
            fetchData(page);
        });
    });
}

window.onload = () => {
    fetchData();
    handlePagination();
};