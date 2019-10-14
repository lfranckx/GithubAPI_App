function displayResults(responseJson) {
    // first clear any previous results displayed.
    $('#results-list').empty();
    // iterate through the list of repos. stopping at the last repo.
    for (let i = 0; i <responseJson.length; i++) {
        $('#results-list').append(
            `<li><a href="${responseJson[i].url}">${responseJson[i].title}</a></li>`)
    };
    // display results section.
    $('#results').removeClass('hidden');
}

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-search-term').val();
        getRepos(username);
    })
}

$(watchForm);