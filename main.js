//generate in order 9 images on a page every time a number is pressed it will take you to that number's page
// Variables
let pages = document.querySelector('.pages');
let pageNumbers = document.querySelector('.pageNumbers');
let numberOne = document.querySelector('.numberOne ');
let numberLast = document.querySelector('.numberLast ');
let hamburger = document.querySelector(".hamburger");
let nav = document.querySelector('nav');
let lines = document.querySelector('.lines');
let button = document.querySelector('.getter');
let message = document.querySelector('header h3');
let message2 = document.querySelector('header h4');

let text = `<div class="page">
<div class="content"></div>
</div>`;
let textContainer = '';

let counter = 0;


// Main function
async function startAs() {
    try {
        // Data fetching
        let imagesData = await fetch('https://jsonplaceholder.typicode.com/photos');
        let postsData = await fetch('https://jsonplaceholder.typicode.com/posts');

        let convImgDat = await imagesData.json();
        let convPostDat = await postsData.json();
        let images = convImgDat.filter(cd => cd.id <= 90).map(im => im.url);
        let post = convPostDat.filter(cp => cp.id <= 90).map(bod => bod.body);

        // Function variables
        let creator = 9;
        let creator2 = Math.ceil(images.length / 9);
        let mainArray = [];
        let secondArray = [];
        let counter = 0;

        // For-loops

        // Array creator loop
        for (i = 0; i < creator2; i++) {
            counter++;
            mainArray.push(images.slice((creator * counter) - creator, creator * counter));
            secondArray.push(post.slice((creator * counter) - creator, creator * counter));
        };

        // Html inserting loop
        mainArray.forEach((MA) => {
            textContainer += text;
            pages.innerHTML = textContainer;
            counter++;
        });

        // Page numbers loop
        for (let i = 0; i < mainArray.length; i++) {
            pageNumbers.innerHTML += `<li id="${i}">${i+1}</li>`;
        };

        // First page number
        numberOne.innerHTML = '<p id ="0">1</p>';


        // Function variables post-html inseration
        let content = document.querySelectorAll('.content');
        let position = document.querySelectorAll('.pageNumbers li');

        // First and last numbers hide
        position[0].style.display = 'none';
        position[position.length - 1].style.display = 'none';


        // Last page number
        numberLast.innerHTML = `<p id ="${position.length-1}">${position.length}</p>`;

        // Content insert loop for first page
        for (let i = 0; i < mainArray[0].length; i++) {
            content[0].innerHTML += `<div><img src="${mainArray[0][i]}"><p>${secondArray[0][i]}</p></div>`;
        };

        // Initial hide
        for (let i = 4; i < position.length; i++) {
            position[i].style.display = 'none'
        }

        // Page changing event listener
        position.forEach(pos => pos.addEventListener('click', (e) => {

            // Event listener variables
            changer = e.target.id;
            let numberizeUp = parseInt(changer) + 2;
            let numberize = parseInt(changer) + 1;
            let numberizeDes = parseInt(changer) - 2;
            let numberizeDe = parseInt(changer) - 1;
            numberLast.style.color = 'rgb(68, 68, 177)';
            numberOne.style.color = 'rgb(68, 68, 177)';
            for (let i = 0; i < position.length; i++) {
                position[i].style.color = 'rgb(68, 68, 177)'
            }
            e.target.style.color = 'red';
            console.log(e.target)

            for (let i = 0; i < mainArray.length; i++) {
                content[i].innerHTML = '';
            };

            // Page changing loop
            for (let i = 0; i < mainArray[changer].length; i++) {
                if (i >= mainArray[0].length) {
                    i = 0;
                };
                content[changer].innerHTML += `<div><img src="${mainArray[changer][i]}"><p>${secondArray[changer][i]}</p></div>`;

            };

            // Page numbers display controler
            if (e.target.id != 1) {
                position[numberizeUp].style.display = 'none';
                position[numberizeDe].style.display = 'block';
                position[numberizeDes].style.display = 'none';
            } else return;

            if (numberize != mainArray.length - 1) {
                position[numberize].style.display = 'block'
            } else return

        }));

        // First and last page content inserting event listeners

        // First page
        numberOne.addEventListener('click', (e) => {
            let changer = 0;
            numberOne.style.color = 'red'
            for (let i = 0; i < mainArray.length; i++) {
                content[i].innerHTML = '';
            };
            for (let i = 0; i < mainArray[changer].length; i++) {
                if (i >= mainArray[0].length) {
                    i = 0;
                };
                content[changer].innerHTML += `<div><img src="${mainArray[changer][i]}"><p>${secondArray[changer][i]}</p></div>`;
            };
            for (let i = 0; i < position.length; i++) {
                position[i].style.display = 'none'
                position[i].style.color = 'rgb(68, 68, 177)'
            }
            for (let i = 1; i < 4; i++) {
                position[i].style.display = 'block'
            }
            numberLast.style.color = 'rgb(68, 68, 177)'
        })

        // Last page
        numberLast.addEventListener('click', (e) => {
            let changer = mainArray.length - 1;
            numberLast.style.color = 'red'
            for (let i = 0; i < mainArray.length; i++) {
                content[i].innerHTML = '';
            };
            for (let i = 0; i < mainArray[changer].length; i++) {
                if (i >= mainArray[0].length) {
                    i = 0;
                };
                content[changer].innerHTML += `<div><img src="${mainArray[changer][i]}"><p>${secondArray[changer][i]}</p></div>`;
            };
            for (let i = 0; i < position.length; i++) {
                position[i].style.display = 'none'
                position[i].style.color = 'rgb(68, 68, 177)'
            }
            for (let i = position.length - 4; i < position.length - 1; i++) {
                position[i].style.display = 'block'
            }
            numberOne.style.color = 'rgb(68, 68, 177)'
        })


    } catch (err) {
        console.log('Err0r: check your code');
    };

};

//Prevents user from requesting data multiple times

let controler = true;
button.addEventListener('click', () => {
    if (controler == false) {
        message2.style.opacity = '1';
        setTimeout(() => {
            message2.style.opacity = '0';
        }, 3000);
        return;
    }
    message.style.opacity = '1';
    setTimeout(() => {
        message.style.opacity = '0';
    }, 3000);
    startAs();
    controler = false;
})