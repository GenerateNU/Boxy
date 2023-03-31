import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export default function DateRangeSelector(dates_available: string[]) {
    /**
     * The below variables are temporary as we prep to move date selection to a calendar: 
     */
    const firstAvailable = new Date(dates_available[0])
    const lastAvailable = new Date(dates_available[dates_available.length - 1])

    const [dateRange, setDateRange] = useState<string | Date | Date[] | undefined | null>(null)

    // Locate the dates that make up gaps in available period: 
    function locDateGaps() {
        const date_diff = (dayjs(lastAvailable).diff(dayjs(firstAvailable)) / 86400000) + 1
        var disabledDays = []

        var cur_date = firstAvailable
        for (var i = 0 ; i < date_diff ; i++) {
            const found = dates_available.find(date => dayjs(date).date() == dayjs(cur_date).date()
                                               && dayjs(date).month() == dayjs(cur_date).month()
                                               && dayjs(date).year() == dayjs(cur_date).year())

            if (found === undefined) {
                disabledDays.push(cur_date)
            }
            cur_date = new Date(dayjs(cur_date).add(1, 'day').toString())
        }

        return disabledDays
    }

    // Compute all dates in reach: 
    function computeInReach() {
        
        // Instantiate the dictionary: 
        var inReach: { [id: string]: string[] } = {}
        const date_length = dates_available.length

        // For each date: 
        for (var i = 0 ; i < date_length ; i++) {
            // Grab the current date: 
            var currentDate = dayjs(dates_available[i])
            var key = currentDate.date().toString() + '-' + currentDate.month().toString() + '-' + currentDate.year().toString()
            inReach[key] = []
            
            // If there is a date after in the list: 
            if (i > 0) {
                // Grab the next date: 
                var pastDate = dayjs(dates_available[i-1])
                var past_key = pastDate.date().toString() + '-' + pastDate.month().toString() + '-' + pastDate.year().toString()

                // If they are within one day of eachother: 
                if (currentDate.diff(pastDate, 'days') <= 1) {
                    inReach[key] = [past_key]
                    inReach[key] = inReach[key].concat(inReach[past_key])
                }
            }
        }
        return inReach
    }

    // Identify whether start and end date make a valid date range given available dates: 
    function identifyValidRange() {
        if (dateRange && Array.isArray(dateRange) && dateRange.length == 2) {
            const start = dateRange[0]
            const end = dateRange[1]

            if (end == null) {
                return dateRange
            }

            // If end can reach start, we are good. If it cannot, reset to firstAvailable: 
            const inReach = computeInReach()
            const start_key = start.getDate().toString() + '-' + start.getMonth().toString() + '-' + start.getFullYear().toString()
            const end_key = end.getDate().toString() + '-' + end.getMonth().toString() + '-' + end.getFullYear().toString()
            if (!inReach[end_key].includes(start_key)) {
                return firstAvailable
            }
        }   
        return dateRange
    }

    return (
        <div>
            <Calendar selectionMode='range' disabledDates={locDateGaps()} viewDate={firstAvailable} value={identifyValidRange()} onChange={(event) => setDateRange(event.value)} dateFormat='M dd, yy' minDate={firstAvailable} maxDate={lastAvailable}/>
        </div>
    )
}