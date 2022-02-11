import fetch from 'node-fetch'

class Point {
  constructor(public latitude: number, public longitude: number) {}
}

const token =
  'pk.eyJ1IjoiZW1heGVkb24iLCJhIjoiY2txd2syYmV0MHBmbTJ3dDkzbnZ5MWxvOSJ9.R6Oao057pj74zyIbfjwZsQ'

export async function fetchRoute(from: Point, to: Point, token: string) {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?alternatives=false&geometries=polyline&overview=full&steps=false&access_token=${token}`
    const response = await fetch(url)

    if (response.ok) {
      const data: any = await response.json()

      return {
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
        geometry: data.routes[0].geometry,
      }
    } else return null
  } catch (e) {
    throw new Error("HttpError('General', ErrorCode.DIRECTIONS_SERVICE_UNAVAILABLE)")
  }
}

;(async () => {
  const route = await fetchRoute(
    new Point(45.49590453262737, -73.57936033069402),
    new Point(45.49033287397587, -73.58572071494612),
    token
  )

  console.log(route)
})()
