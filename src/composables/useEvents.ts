import { ref, onMounted, watch } from 'vue'
import { fetchEvents, fetchEventsByYear, fetchEventsByMonth, fetchEventsByDate, fetchEventsInBetween } from '../api/events'

export default function useEvents(getYearRef: any = null, getMonthRef: any = null, getDayRef: any = null, getToggleRef: any = null) {
  const getEvents = ref<any[]>([])
  const getEventsByYear = ref<any[]>([])
  const getEventsByMonth = ref<any[]>([])
  const getEventsByDate = ref<any[]>([])
  const getEventsInBetween = ref<any[]>([])
  
  const startDateRef = ref<string>('')
  const endDateRef = ref<string>('')
  
  const setEvents = async () => {
    getEvents.value = await fetchEvents()
  }
  
  const setEventsByYear = async () => {
    getEventsByYear.value = await fetchEventsByYear(getYearRef.value)
  }
  
  const setEventsByMonth = async () => {
    getEventsByMonth.value = await fetchEventsByMonth(getYearRef.value, getMonthRef.value)
  }
  
  const setEventsByDate = async () => {
    getEventsByDate.value = await fetchEventsByDate(getYearRef.value, getMonthRef.value, getDayRef.value)
  }
  
  const setEventsInBetween = async () => {
    getEventsInBetween.value = await fetchEventsInBetween(startDateRef.value.split('-'), endDateRef.value.split('-'))
  }
  
  onMounted(setEvents)
  onMounted(setEventsByYear)
  onMounted(setEventsByMonth)
  onMounted(setEventsByDate)
  onMounted(setEventsInBetween)
  
  watch(getYearRef, setEventsByYear)
  watch(getMonthRef, setEventsByMonth)
  watch(getDayRef, setEventsByDate)
  watch(endDateRef, setEventsInBetween)
  watch(getToggleRef, () => {
    setEventsByMonth()
    setEventsInBetween()
  })
  
  return {
    getEvents,
    getEventsByYear,
    getEventsByMonth,
    getEventsByDate,
    getEventsInBetween,
    startDateRef,
    endDateRef,
    setEvents,
    setEventsByYear,
    setEventsByMonth,
    setEventsByDate,
    setEventsInBetween
  }
}
