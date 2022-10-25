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
        'Projeto acadêmico consumindo uma api de Star Wars.',
        '../potfolio/Star-Devs/index.html',
        'https://github.com/MoisesMarchini/Star-Devs',
        'html|css|javascript'),
    NewEmptyProject('../imgs/covers/login_helper.png',
        'Login Helper',
        'Projeto acadêmico reproduzindo uma tela de login simples.',
        '../potfolio/Login-Helper/index.html',
        'https://github.com/MoisesMarchini/Projeto---Login-Helper',
        'html|css|javascript'),
    NewEmptyProject('../imgs/covers/guess_number.png',
        'GuessNumber',
        'Projeto acadêmico de um jogo onde você precisa acertar o número escolhido pela máquina.',
        '../potfolio/Guess-Number/index.html',
        'https://github.com/MoisesMarchini/Guess-Number',
        'html|css|javascript')
];
const fullStackProjects = [
];
const gameDevProjects = [
];



let currentTab;

portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {

        portfolioTabs.forEach(tab => {
            tab.classList.remove('active');
        })

        currentTab = tab.id.split('-')[1];
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

        if (slide.id.split('-')[1] == currentTab) {
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
    itemGithubLink.href = project.githubLink;


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