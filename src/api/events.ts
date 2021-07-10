const baseUrl: string = 'http://localhost:3011/event'
    
export const fetchEvents = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json.status === 200 ? json.data : []
}

export const fetchEventsByYear = async (year: number) => {
  const response = await fetch(`${baseUrl}/${year}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json.status === 200 ? json.data : []
}

export const fetchEventsByMonth = async (year: number, month: number) => {
  const response = await fetch(`${baseUrl}/${year}/${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json.status === 200 ? json.data : []
}

export const fetchEventsByDate = async (year: number, month: number, day: number) => {
  const response = await fetch(`${baseUrl}/${year}/${month}/${day}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json.status === 200 ? json.data : []
}

export const fetchEventsInBetween = async (startArr: string[], endArr: string[]) => {
  const response = await fetch(`${baseUrl}/${startArr[0]}/${startArr[1]}/${startArr[2]}/and/${endArr[0]}/${endArr[1]}/${endArr[2]}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json.status === 200 ? json.data : []
}

