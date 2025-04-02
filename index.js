'use strict'

const body = document.querySelector('.body')
const containerBtnsThemes = document.querySelector('.task-manager__theme')
const inputTask = document.querySelector('.task-manager__input')
const buttonTaskAdd = document.querySelector('.task-manager__button_task_add')
const containerTasks = document.querySelector('.task-manager__container-tasks')
const templateTask = document.querySelector('.template-task')
const dateLastTask = document.querySelector('.task-manager__date')
const paginationPanel = document.querySelector('.task-manager__pagination-panel')
const buttonPrevPagination = document.querySelector('.task-manager__button_pagination_prev')
const buttonNextPagination = document.querySelector('.task-manager__button_pagination_next')
const page = document.querySelector('.task-manager__page')

let arrayTasks = []
let currentPage = 0
let countTasksOnPage = 3

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

const getMaxCountPage = () => Math.ceil(arrayTasks.length / countTasksOnPage)

const setEventListener = (element, action) => element.addEventListener('click', action)

const checkTaskComplete = (event) => event.target.closest('.task-manager__task').classList.toggle('task-manager__task_complete')

const deleteTask = (event) => {
    const currentTask = event.target.closest('.task-manager__task')
    const dateCurrentTask = currentTask.getAttribute('data-time-create')
    arrayTasks = arrayTasks.filter(task => task.date !== dateCurrentTask)
    updateDate()
    viewTasks()
}

const updateDate = () => {
    if (arrayTasks.length > 0) dateLastTask.textContent = arrayTasks.at(-1).date
    else dateLastTask.textContent = `You don't have a single task.`
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

const createTask = (text, dateCreateTask) => {
    const task = (templateTask.content.cloneNode(true))
    task.querySelector('.task-manager__task-text').textContent = text
    task.querySelector('.task-manager__task').setAttribute("data-time-create", dateCreateTask)
    const btnTaskComplete = task.querySelector('.task-manager__button_task_complete')
    const btnTaskDelete = task.querySelector('.task-manager__button_task_delete')
    setEventListener(btnTaskComplete, checkTaskComplete)
    setEventListener(btnTaskDelete, deleteTask)
    containerTasks.append(task)
}

const setCountPage = () => {
    if (arrayTasks.length < countTasksOnPage) {
        currentPage = 0
        return
    }
    const maxCountPage = getMaxCountPage()
    if (currentPage + 1 > maxCountPage) currentPage = maxCountPage - 1
}

const viewTasks = () => {
    if (arrayTasks.length < countTasksOnPage) {
        setCountPage()
        hidePaginationPanel()
        sliceTasks()
        updateDate()
        return
    }
    setCountPage()
    showPaginationPanel()
    sliceTasks()
    updateDate()
}

const clearContainerTasks = () => containerTasks.textContent = ''

const viewPage = () => {
    const maxCountPage = getMaxCountPage()
    if (maxCountPage === 1) {
        page.textContent = currentPage + 1
    } else {
        page.textContent = `${currentPage + 1} / ${maxCountPage}`
    }
}

const sliceTasks = () => {
    clearContainerTasks()
    viewPage()
    const currentSlice = currentPage * countTasksOnPage
    arrayTasks.toReversed().slice(currentSlice, currentSlice + countTasksOnPage).map(task => createTask(task.text, task.date))
}

const showPaginationPanel = () => paginationPanel.classList.remove('display-none')

const hidePaginationPanel = () => paginationPanel.classList.add('display-none')

containerBtnsThemes.addEventListener('click', event => {
    const theme = getTheme(event)
    if (theme) setTheme(theme)
})

buttonTaskAdd.addEventListener('click', (event => {
    const taskText = inputTask.value
    if (!taskText) return
    const currentDate = getDate()
    // запрет на добавление задачи с одинаковой датой и временем, т.е. добавление новой таски д.б. не чаще раза в секунду
    if (arrayTasks.find(task => task.date === currentDate)) return
    arrayTasks.push({text: taskText, date: currentDate})
    viewTasks()
}))

buttonPrevPagination.addEventListener('click', ()=> {
    if (currentPage === 0) return
    --currentPage
    sliceTasks()
})

buttonNextPagination.addEventListener('click', ()=> {
    if (currentPage + 1 === getMaxCountPage()) return
    ++currentPage
    sliceTasks()
})