
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById("email-input");
    const participantsList = document.getElementById('participants-list');
    const generateMatchesButton = document.getElementById("generate-match-button");

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}



const addParticipant = () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (name != "") {
    if (isValidEmail(email)) {
        const participantDiv = document.createElement('div');
        participantDiv.className = 'person';
        participantDiv.dataset.email = email;
        
        const p = document.createElement('p');
        p.className = 'name';
        p.textContent = name;
        
        const editButton = document.createElement('button');
        editButton.className = 'edit-icon-button';
        editButton.innerHTML = '<img class="edit-icon" src="https://www.svgrepo.com/show/522527/edit-3.svg">';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-icon-button';
        deleteButton.innerHTML = '<img class="delete-icon" src="https://www.svgrepo.com/show/513658/cross.svg">';
        deleteButton.onclick = function() {
        participantsList.removeChild(participantDiv);
        };

        participantDiv.appendChild(p);
        participantDiv.appendChild(editButton);
        participantDiv.appendChild(deleteButton);

        participantsList.appendChild(participantDiv);
        nameInput.value = '';
        emailInput.value = '';
    }
    else if (!isValidEmail(email)) {
        window.alert("Please enter a Valid Email");
        emailInput.value = '';
    }
    
    }
};

    addButton.addEventListener('click', addParticipant);
    nameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
        addParticipant();
        }
    });
    emailInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
        addParticipant();
        }
    });

    function extractParticipants() {
        const participantElements = document.querySelectorAll('.person');
        const participantsLookup = {};
    
        participantElements.forEach(el => {
            const name = el.querySelector('.name').textContent.trim();
            const email = el.dataset.email; // Assuming you stored the email as a data attribute
            participantsLookup[name] = email;
        });
    
        return participantsLookup;
    }

    function storeParticipantsLookup() {
        const participantsLookup = extractParticipants();
        localStorage.setItem('participantsLookup', JSON.stringify(participantsLookup));
        console.log("Participants lookup stored");
        console.log(participantsLookup);
        return participantsLookup;
    }
    

    generateMatchesButton.addEventListener('click', () => {
        const participantNames = storeParticipantsLookup();
        if (Object.keys(participantNames).length === 0) {
            alert('Please add participants before generating matches.');
        } 
        else if (Object.keys(participantNames).length === 1) {
            alert("There must be more than one participant");
        }
        else {
            window.location.href = 'pairup.html';
        }
    });

});



  





