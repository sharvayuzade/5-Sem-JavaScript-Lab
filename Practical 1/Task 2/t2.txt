const logButton = document.getElementById('log-button');
const paragraph = document.getElementById('paragraph');
logButton.addEventListener('click', () => {
    console.log('Button clicked!');
    paragraph.textContent = 'Text changed on button click!';
});