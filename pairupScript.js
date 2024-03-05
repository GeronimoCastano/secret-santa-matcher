


document.addEventListener('DOMContentLoaded', () => {

    emailjs.init({
        publicKey: 'H7mOFYYfBdQ4wI7Ty',
    });

    const storedData = localStorage.getItem('participantsLookup');
    const participantNames = JSON.parse(storedData);
    console.log(participantNames);



    function updateAfterPairing() {
        const title = document.querySelector('.loading-container h1');
        title.textContent = 'Done! The participants have each received an email with their correspondent matches.';
      
        const loadingBar = document.querySelector('.loading-bar');
        loadingBar.style.display = 'none';
    }
    
    
    function generateMatches() {
    let names = Array.from(Object.keys(participantNames)); // Make sure it's an array
    let shuffled;
    do {
        // Shuffle array
        shuffled = names
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
        // Check if any name matches the same index after shuffle
    } while (names.some((name, index) => name === shuffled[index]));
    
    // Pair names

    let result = {}

    for (let i = 0; i < shuffled.length; i++) {
        result[names[i]] = shuffled[i];
    }

    return result;
    }
    
    const progress = document.querySelector('.loading-progress');


    
    setTimeout(() => {
        progress.style.width = '100%';
    }, 2000);
    setTimeout (() => {
        updateAfterPairing();
    }, 5000);

    const pairs = generateMatches();
    console.log(pairs);

    function sendEmails(pairs, participantNames) {
        Object.entries(pairs).forEach(([santa, recipient]) => {
            
            const recipientEmail = participantNames[recipient];
    

            emailjs.send('service_p4wsdc2', 'template_nsvgk4k', {
                sender_name: "_",
                sender_email: "gerocastano8@gmail.com",
                recipient_name: recipient,
                recipient_email: recipientEmail,
                message: `Hello ${recipient},\n\nYou have been matched with ${santa} for the Secret Santa gift exchange.\n\nHappy gifting!\n\nBest regards,\nThe Secret Santa Team`
            })
            .then((response) => {
                console.log('Email sent successfully:', response);
            }, (error) => {
                console.error('Error sending email:', error);
            });
        });
    }
    

    sendEmails(pairs, participantNames);
});


