export function saveData(server) {
  localStorage.setItem('requests', JSON.stringify(server.db.dump()))
}

export function loadData() {
  try {
    const data = localStorage.getItem('requests')

    return JSON.parse(data)
  } catch (_) {
    return null
  }
}
