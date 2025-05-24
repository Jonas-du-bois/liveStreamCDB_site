import scheduleData from '../data/schedule.json'

export const streamUrls = [
    "https://player.infomaniak.com?channel=PR99617043325684504&player=12679",
    "https://player.infomaniak.com?channel=RG99617043325684505&player=12678",
    "https://player.infomaniak.com?channel=SA99617043325684507&player=12681",
    "https://player.infomaniak.com?channel=GM99617043325684506&player=12680"
]

export const streamDescriptions = [
    "Salle Arnold Reymond - 1",
    "Salle Arnold Reymond - 2",
    "Salle annexe ouest - 1" ,
    "Salle annexe ouest - 2"
]

export const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return date.toLocaleDateString('fr-FR', options)
}

export const findCurrentEvent = (currentTime) => {
    for (const event of scheduleData.schedule) {
        const [startHour, startMinute] = event.start.split(':').map(Number)
        const [endHour, endMinute] = event.end.split(':').map(Number)
        const startDate = new Date(currentTime)
        const endDate = new Date(currentTime)
        startDate.setHours(startHour, startMinute, 0)
        endDate.setHours(endHour, endMinute, 0)
        
        if (currentTime >= startDate && currentTime <= endDate) {
            return event
        }
    }
    return null
}