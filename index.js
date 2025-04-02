'use strict'

const body = document.querySelector('.body')
const containerBtnsThemes = document.querySelector('.task-manager__theme')
const inputTask = document.querySelector('.task-manager__input')
const buttonTaskAdd = document.querySelector('.task-manager__button_task_add')
const containerTasks = document.querySelector('.task-manager__container-tasks')
const templateTask = document.querySelector('.template-task')

const arrayTasks = []

const addClasses = (element, ...className) => element.classList.add(...className)

const removeClasses = (element, ...className) => {
    if (className.length === 0) element.className = ""
    else element.classList.remove(...className)
}

const getTheme = (event) => {
    const theme = event.target.className.split('_').at(-1)
    if (theme === body.className.split('_').at(-1)) return  // если текущая тема та же, что и была, тогда тему не менять
    const possibleThemes = ['grey', 'white', 'black']
    if (possibleThemes.includes(theme)) return theme
}

const setTheme = (theme) => {
    switch (theme) {
        case'grey': {
            removeClasses(body)
            addClasses(body, 'body', 'body_theme_grey')
            break
        }
        case'white': {
            removeClasses(body)
            addClasses(body, 'body', 'body_theme_white')
            break
        }
        case'black': {
            removeClasses(body)
            addClasses(body, 'body', 'body_theme_black')
            break
        }
        default: {
            removeClasses(body)
            body.classList.add('body', 'body_theme_grey')
        }
    }
}

const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${hours > 12 ? 'PM' : 'AM'}`
}

const createTask = (text) => {
    const task = (templateTask.content.cloneNode(true))
    task.querySelector('.task-manager__task-text').textContent = text
    containerTasks.prepend(task)
}

containerBtnsThemes.addEventListener('click', event => {
    const theme = getTheme(event)
    if (theme) setTheme(theme)
})

buttonTaskAdd.addEventListener('click', (event => {
    const taskText = inputTask.value
    if (!taskText) return
    arrayTasks.push({text: taskText, time: getDate()})
    createTask(taskText)
}))