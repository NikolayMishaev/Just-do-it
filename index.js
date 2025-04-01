'use strict'

const containerBtnsThemes = document.querySelector('.task-manager__theme')
const body = document.querySelector('.body')

const addClass = (element, ...className) => element.classList.add(...className)
const removeClass = (element, className) => {
    if (!className) element.className = ""
    else element.classList.remove(className)
}

const getTheme = (event) => event.target.className.split('_').at(-1)
const setTheme = (theme) => {
    switch (theme) {
        case'grey': {
            removeClass(body)
            addClass(body, 'body', 'body_theme_grey')
            break
        }
        case'white': {
            removeClass(body)
            addClass(body, 'body', 'body_theme_white')
            break
        }
        case'black': {
            removeClass(body)
            addClass(body, 'body', 'body_theme_black')
            break
        }
        default: {
            removeClass(body)
            body.classList.add('body', 'body_theme_grey')
        }
    }
}

containerBtnsThemes.addEventListener('click', event => setTheme(getTheme(event)))