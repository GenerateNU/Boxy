import { DateCalendar, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { start } from 'repl';

export default function DateRangeEditor(dates_available: Date[]) {
    const firstAvailable = dates_available[0]
    const lastAvailable = dates_available[dates_available.length - 1]
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(firstAvailable).add(1, 'day'));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(firstAvailable))

    // Loop through each date. If there is a next, add the next to canVisit (array)
    // Will be a dictionary object with key "String version of date" and value array of can visits
    function computeInReach(dates_available: Date[]) {
        
        // Instantiate the dictionary: 
        var inReach: { [id: string]: string[] } = {}
        const date_length = dates_available.length

        // For each date: 
        for (var i = 0 ; i < date_length ; i++) {
            // Grab the current date: 
            var currentDate = dayjs(dates_available[i])
            var key = (currentDate.date() + 1).toString() + '-' + currentDate.month().toString() + '-' + currentDate.year().toString()
            inReach[key] = []
            
            // If there is a date after in the list: 
            if (i > 0) {
                // Grab the next date: 
                var pastDate = dayjs(dates_available[i-1])
                var past_key = (pastDate.date() + 1).toString() + '-' + pastDate.month().toString() + '-' + pastDate.year().toString()

                // If they are within one day of eachother: 
                if (currentDate.diff(pastDate, 'days') <= 1) {
                    inReach[key] = [past_key]
                    inReach[key] = inReach[key].concat(inReach[past_key])
                }
            }
        }
        return inReach
    }

    // Compute in reach dates for available dates: 
    const inReach = computeInReach(dates_available)

    // Disable all dates that are not included in dates available: 
    function shouldDisableEndDate(date: Dayjs) {
        const found = dates_available.find(day => dayjs(day).date() + 1 == date.date() 
                                          && dayjs(day).month() == date.month()
                                          && dayjs(day).year() == date.year());

        if (found === undefined) {
            return true
        }

        var key = (dayjs(found).date() + 1).toString() + '-' + dayjs(found).month().toString() + '-' + dayjs(found).year().toString()

        if (startDate) {
            var startKey = (startDate.date()).toString() + '-' + startDate.month().toString() + '-' + startDate.year().toString()
            console.log(key)
            console.log(startKey)
            if (inReach[key].includes(startKey) || key == startKey) {
                return false
            }
        }

        return true
    }

    // Disable all dates that are not included in dates available: 
    function shouldDisableStartDate(date: Dayjs) {
        const found = dates_available.find(day => dayjs(day).date() + 1 == date.date() 
                                          && dayjs(day).month() == date.month()
                                          && dayjs(day).year() == date.year());

        if (found === undefined) {
            return true
        }
        return false
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='container flex'>
                <DatePicker shouldDisableDate={shouldDisableStartDate} value={startDate} onChange={(newValue) => setStartDate(newValue)}/>
                <DatePicker shouldDisableDate={shouldDisableEndDate} value={endDate?.isBefore(startDate) ? startDate : endDate} onChange={(newValue) => setEndDate(newValue)}/>
            </div>
        </LocalizationProvider>
    )
}