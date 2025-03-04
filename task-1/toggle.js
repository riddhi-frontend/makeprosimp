// toggle.js
function toggleInfo() {
    var extraInfo = document.querySelector('.extra-info');
    var button = document.querySelector('.show-more-btn');

    // Toggle the visibility of the extra info
    if (extraInfo.style.display === 'none' || extraInfo.style.display === '') {
        extraInfo.style.display = 'block';
        button.textContent = 'Show Less';
    } else {
        extraInfo.style.display = 'none';
        button.textContent = 'Show More';
    }
}
