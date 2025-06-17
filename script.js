'use strict';

async function getDailyData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data.filter(item => item.timeframes.daily);
    } catch (error) {
        console.error('Error fetching daily data:', error);
        return [];
    }
}

async function getWeeklyData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data.filter(item => item.timeframes.weekly);
    } catch (error) {
        console.error('Error fetching weekly data:', error);
        return [];
    }
}

async function getMonthlyData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data.filter(item => item.timeframes.monthly);
    } catch (error) {
        console.error('Error fetching monthly data:', error);
        return [];
    }
}

async function getTimeframeData(timeframe) {
    if (timeframe === 'daily') {
        return getDailyData();
    } else if (timeframe === 'weekly') {
        return getWeeklyData();
    } else if (timeframe === 'monthly') {
        return getMonthlyData();
    }
}

const workCurrent = document.getElementById('work-current');
const workPrevious = document.getElementById('work-previous');
const playCurrent = document.getElementById('play-current');
const playPrevious = document.getElementById('play-previous');
const studyCurrent = document.getElementById('study-current');
const studyPrevious = document.getElementById('study-previous');
const exerciseCurrent = document.getElementById('exercise-current');
const exercisePrevious = document.getElementById('exercise-previous');
const socialCurrent = document.getElementById('social-current');
const socialPrevious = document.getElementById('social-previous');
const selfCareCurrent = document.getElementById('self-care-current');
const selfCarePrevious = document.getElementById('self-care-previous');

const dailyCard = document.querySelector('.header-menu-button.left');
const weeklyCard = document.querySelector('.header-menu-button.active');
const monthlyCard = document.querySelector('.header-menu-button.right');

const timeDoms = [workCurrent, workPrevious, playCurrent, playPrevious, studyCurrent, studyPrevious, exerciseCurrent, exercisePrevious, socialCurrent, socialPrevious, selfCareCurrent, selfCarePrevious];

function updateTimeDoms(data, timeframe) {
    timeDoms.forEach((dom, index) => {
        dom.textContent = data[Math.floor(index / 2)].timeframes[timeframe].current;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    getTimeframeData('daily').then(data => {
        dailyData = data;
    })
    getTimeframeData('weekly').then(data => {
        weeklyData = data;
        updateTimeDoms(weeklyData, 'weekly');
    })
    getTimeframeData('monthly').then(data => {
        monthlyData = data;
    })
})

var dailyData;
var weeklyData;
var monthlyData;

dailyCard.addEventListener('click', () => {
    dailyCard.classList.add('active');
    weeklyCard.classList.remove('active');
    monthlyCard.classList.remove('active');
    updateTimeDoms(dailyData, 'daily');
});

weeklyCard.addEventListener('click', () => {
    weeklyCard.classList.add('active');
    dailyCard.classList.remove('active');
    monthlyCard.classList.remove('active');

    updateTimeDoms(weeklyData, 'weekly');
});

monthlyCard.addEventListener('click', () => {
    monthlyCard.classList.add('active');
    dailyCard.classList.remove('active');
    weeklyCard.classList.remove('active');
    updateTimeDoms(monthlyData, 'monthly');
});

