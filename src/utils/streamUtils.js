import scheduleData from '../data/schedule.json'

export const streamUrls = [
    "https://player.infomaniak.com?channel=PR99617043325684504&player=12679",
    "https://player.infomaniak.com?channel=RG99617043325684505&player=12678",
    "https://player.infomaniak.com?channel=SA99617043325684507&player=12681",
    "https://player.infomaniak.com?channel=GM99617043325684506&player=12680"
]

export const streamDescriptions = [
    "Salle Arnold Reymond - 1", // Lié à scheduleData.salles[0]
    "Salle Arnold Reymond - 2", // Lié à scheduleData.salles[1]
    "Collège Annexe-Ouest - Salle 1", // Lié à scheduleData.salles[2]
    "Collège Annexe-Ouest - Salle 2"  // Lié à aucune salle dans scheduleData.salles
];

export const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return date.toLocaleDateString('fr-FR', options)
}

export const findCurrentEvent = (currentTime, streamIndex) => {
    const description = streamDescriptions[streamIndex];

    if (!description) {
        console.warn(`No stream description found for streamIndex: ${streamIndex}`);
        return null;
    }

    // Find the salle in scheduleData that matches the description
    const salle = scheduleData.salles.find(s => s.nom === description);
    
    if (!salle) {
        console.warn(`No schedule found for description: "${description}" (from streamIndex: ${streamIndex})`);
        return null;
    }
      if (!salle.planning || salle.planning.length === 0) {
        console.warn(`Planning not found or empty for salle: "${salle.nom}"`);
        return null;
    }

    for (const event of salle.planning) {
        const [startHour, startMinute] = event.start.split(':').map(Number);
        const [endHour, endMinute] = event.end.split(':').map(Number);
        
        const startDate = new Date(currentTime);
        startDate.setHours(startHour, startMinute, 0, 0);
        
        const endDate = new Date(currentTime);
        endDate.setHours(endHour, endMinute, 0, 0);
        
        // Si l'heure de fin est 00:00, cela signifie probablement minuit le lendemain.
        // Cependant, pour des événements dans la même journée, on s'attend à ce que endHour >= startHour.
        // Pour des événements qui se terminent à minuit (ex: 23:00 - 00:00), il faudrait une gestion de date.
        // Ici, on suppose que tous les événements sont dans la même journée et que endHour/endMinute est après startHour/startMinute.
        // Ou que la fin est inclusive.

        if (currentTime >= startDate && currentTime <= endDate) {
            return event; // event contient { start, end, evenement }
        }
    }
    return null;
}