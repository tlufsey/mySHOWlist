// Show Class: represents a Show
class Show {
    constructor(title, episodes, rating) {
        this.title = title;
        this.episodes = episodes;
        this.rating = rating;
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayShows() {

        const shows = Store.getShows();

        shows.forEach((show) => {
            return UI.addShowToList(show);
        });
    }

    static addShowToList(show) {
        const list = document.querySelector('#show-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${show.title}</td>
        <td>${show.episodes}</td>
        <td>${show.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteShow(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#show-form');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#episodes').value = '';
        document.querySelector('#rating').value = '';
    }
}
// Store Class: Handles Storage
class Store {
    static getShows() {
        let shows;
        if(localStorage.getItem('shows') === null) {
            shows = [];
        } else {
            shows = JSON.parse(localStorage.getItem('shows'));
        }

        return shows;
    }

    static addShow(show) {
        const shows = Store.getShows();

        shows.push(show);

        localStorage.setItem('shows', JSON.stringify(shows));

    }

    static removeShow(show) {
        const shows = Store.getShows();

        shows.forEach((show, index) => {
            if(show.title === title) {
                shows.splice(index, 1);
            }
        });

        localStorage.setItem('shows', JSON.stringify(shows));
    }
}

// Event: Display Shows
document.addEventListener('DOMContentLoaded', UI.displayShows);

// Event: Add a Show
document.querySelector('#show-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    //Get form values
    const title = document.querySelector('#title').value;
    const episodes = document.querySelector('#episodes').value;
    const rating = document.querySelector('#rating').value;

    // Validate
    if(title === '' || episodes === '' || rating === '') {
        UI.showAlert('Please fill out all fields', 'danger');
    } else {
    // Instatiate show
    const show = new Show(title, episodes, rating);

    // Add Show to UI
    UI.addShowToList(show);

    // Add Show to store
    Store.addShow(show);

    // Show Success Message
    UI.showAlert('Show Added', 'success')

    // Clear fields
    UI.clearFields();
    }

 
});

// Event: Remove a Show
document.querySelector('#show-list').addEventListener('click', (e) => {
    UI.deleteShow(e.target)

    // Remove show from store
    Store.removeShow(e.target.parentElement.textContent);
        
    // Show Success Message
    UI.showAlert('Show Removed', 'success')
});