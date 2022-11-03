"use strict";

// ==================== NAV ==================== //
const navCheckbox = document.getElementById('check');
const navMenu = document.querySelector('.nav-menu');

navCheckbox.addEventListener('change', () => {
    if (navCheckbox.checked) {
        navMenu.classList.add('active');
    } else {
        navMenu.classList.remove('active');
    }
});


// ==================== PORTFOLIO ==================== //
const portfolioTabs = document.querySelectorAll('.portfolio-section .section-tabs .tab');
const portfolioSlides = document.querySelectorAll('.portfolio-section .slider-wrapper .slider');
const sliderControlWrapper = document.querySelector('.slider-control-wrapper');
const sliderControls = document.querySelector('.slider-control-wrapper .slider-control');
const sliderItemTemplate = document.getElementById('slider-item-template');

const frontEndProjects = [
    NewEmptyProject('../imgs/covers/netmovies-cover.png',
        'NetMovies',
        'Projeto acadêmico recriando o catálogo do netflix consumindo a api de filmes do TMDB.',
        '../potfolio/NetMovies/index.html',
        'https://github.com/MoisesMarchini/NetMovies',
        'html|css|javascript'),
    NewEmptyProject('../imgs/covers/star_devs.png',
        'Star Devs',
        "Projeto do curso <a class='course-link' target='_blank' href='https://www.udemy.com/course/html5-css3-e-javascript-na-pratica-3-projetos/'>HTML5, CSS3 E Javascript na prática</a> consumindo uma api de Star Wars.",
        '../potfolio/Star-Devs/index.html',
        'https://github.com/MoisesMarchini/Star-Devs',
        'html|css|javascript'),
    NewEmptyProject('../imgs/covers/login_helper.png',
        'Login Helper',
        "Projeto do curso <a class='course-link' target='_blank' href='https://www.udemy.com/course/html5-css3-e-javascript-na-pratica-3-projetos/'>HTML5, CSS3 E Javascript na prática</a> reproduzindo uma tela de login simples.",
        '../potfolio/Login-Helper/index.html',
        'https://github.com/MoisesMarchini/Projeto---Login-Helper',
        'html|css|javascript'),
    NewEmptyProject('../imgs/covers/guess_number.png',
        'GuessNumber',
        "Projeto do curso <a class='course-link' target='_blank' href='https://www.udemy.com/course/html5-css3-e-javascript-na-pratica-3-projetos/'>HTML5, CSS3 E Javascript na prática</a> sobre um jogo onde você precisa acertar o número escolhido pela máquina.",
        '../potfolio/Guess-Number/index.html',
        'https://github.com/MoisesMarchini/Guess-Number',
        'html|css|javascript')
];
const fullStackProjects = [
    NewEmptyProject('../imgs/covers/MyTodoApp.png',
        'Lista de tarefas - CRUD Simples',
        'Projeto acadêmico utilizando Angular, Bootstrap, ASP.NET e Sqlite.',
        null,
        'https://github.com/MoisesMarchini/TodoApp',
        'Angular|bootstrap|ASP.NET|Sqlite'),
    NewEmptyProject('https://via.placeholder.com/640x320?text=No+Image',
        'ProEventos - Curso Udemy',
        "Projeto do curso <a class='course-link' target='_blank' href='https://www.udemy.com/course/angular-dotnetcore-efcore/'>Full-Stack com .NET Web API e Angular + EF Core</a>.",
        null,
        'https://github.com/MoisesMarchini/Curso-Udemy-.NET-Web-API-e-Angular---ProEventos',
        'Angular|bootstrap|ASP.NET|Sqlite')
];
const gameDevProjects = [
    NewEmptyProject('https://img.itch.zone/aW1hZ2UvMzIzNjc5LzE1OTg5NzYucG5n/original/79yHl7.png',
        'Super Niceboy',
        'Um jogo troll que criei para conhecer a ferramenta.',
        'https://moisesmp.itch.io/superniceboy',
        null,
        'Construct 2'),
    NewEmptyProject('https://img.itch.zone/aW1hZ2UvMTcxNTMwMS8xMDEwNDgwNS5wbmc=/original/4Ki7o9.png',
        'Tiny Despair',
        'Jogo roguelike com masmorras geradas randomicamente.',
        'https://moisesmp.itch.io/tiny-despair',
        null,
        'Unity Engine|C#'),
    NewEmptyProject('https://img.itch.zone/aW1hZ2UvMTYzNzMzNi85ODA4MDI2LnBuZw==/original/kQK0SL.png',
        'Destiny Dungeon',
        'Jogo roguelike de cartas inspirado por Slay The Spire.',
        'https://moisesmp.itch.io/destiny-dungeon',
        null,
        'Unity Engine|C#')
];



let currentTabName;

portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {

        portfolioTabs.forEach(tab => {
            tab.classList.remove('active');
        })

        currentTabName = tab.id.split('-')[1];
        SetCurrentSlide();
        tab.classList.add('active');
    })
});
portfolioSlides.forEach(slide => {

    if (slide.id.split('-')[1] == 'frontend') {
        frontEndProjects.forEach(element => {
            SetNewItemToSlide(slide, element)
        });
    }
    if (slide.id.split('-')[1] == 'fullstack') {
        fullStackProjects.forEach(element => {
            SetNewItemToSlide(slide, element)
        });
    }
    if (slide.id.split('-')[1] == 'gamedev') {
        gameDevProjects.forEach(element => {
            SetNewItemToSlide(slide, element)
        });
    }

})

function SetCurrentSlide() {
    portfolioSlides.forEach(slide => {
        slide.classList.add('disabled');

        if (slide.id.split('-')[1] == currentTabName) {
            slide.classList.remove('disabled');
            const slidesDisabled = slide.querySelectorAll('.placeholder').length;

            if (slide.childElementCount - slidesDisabled > 0) {
                slide.querySelector('.placeholder').classList.add('fulldisabled')
                if (slide.childElementCount - slidesDisabled > 1)
                    sliderControlWrapper.classList.remove('disabled');
            } else {
                slide.querySelector('.placeholder').classList.remove('fulldisabled')
                sliderControlWrapper.classList.add('disabled')
            }
        }

    });
}
function IncreaseCurrentSlideItem(value) {
    value = Math.min(1, Math.max(-1, value));
    portfolioSlides.forEach(slide => {

        if (slide.id.split('-')[1] == currentTabName) {

            const scrRight = () => {
                let scrollPreview = slide.scrollLeft + slide.lastChild.offsetWidth*0.66;
                slide.scrollLeft = scrollPreview;
                
                if (scrollPreview >= slide.lastChild.offsetWidth* (slide.childElementCount-2))
                    slide.scrollLeft = 0;
            };
      
            const scrLeft = () => {
                slide.scrollLeft = slide.scrollLeft - slide.lastChild.offsetWidth * 0.66;
                if (slide.scrollLeft <= 0)
                    slide.scrollLeft = slide.lastChild.offsetWidth* slide.childElementCount;
            };
            

            if (value > 0)
                scrRight();
            if (value < 0)
                scrLeft();
            
        
            console.log(slide.scrollLeft, slide.lastChild.offsetWidth* (slide.childElementCount-2), slide.lastChild.offsetWidth);
        }

    });
}
function SetNewItemToSlide(slide, project) {
    let newItem = sliderItemTemplate.cloneNode(true);

    let itemImg = newItem.querySelector('.slider-cover');
    let itemDemoLink = newItem.querySelector('.slider-link-demo');
    let itemGithubLink = newItem.querySelector('.slider-link-github');
    let itemTitle = newItem.querySelector('.slider-title');
    let itemSubtitle = newItem.querySelector('.slider-subtitle');
    let itemTagList = newItem.querySelector('.slider-tags');
    let itemTag = newItem.querySelector('.tag');


    itemImg.src = project.cover;
    itemTitle.innerHTML = project.title;
    itemSubtitle.innerHTML = project.subtitle;
    itemDemoLink.href = project.demoLink;

    if (project.demoLink == null) {
        itemDemoLink.classList.add('fulldisabled');
    }

    itemGithubLink.href = project.githubLink;

    if (project.githubLink == null) {
        itemGithubLink.classList.add('fulldisabled');
    }



    let projectTags = project.tagsList.split('|');

    for (let index = 0; index < projectTags.length; index++) {
        let newTag = itemTag.cloneNode();
        newTag.innerHTML = projectTags[index];
        itemTagList.appendChild(newTag);
    }
    itemTagList.removeChild(itemTag);
    newItem.classList.remove('fulldisabled');

    slide.appendChild(newItem);
}
function NewEmptyProject(cover, title, subtitle, demoLink, githubLink, tagsList) {
    let emptyProject = {
        cover: cover,
        title: title,
        subtitle: subtitle,
        demoLink: demoLink,
        githubLink: githubLink,
        tagsList: tagsList
    }
    return emptyProject;
};