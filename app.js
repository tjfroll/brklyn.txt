const container = append(document.body,
  new Div('.text')
)

const input = append(document.body,
  new Input('.input', {
    type: 'text',
    autofocus: 'autofocus',
    placeholder: 'look',
    onkeypress: (e) => {
      if (e.keyCode === 13) {
        empty(container)
        execute(input.value)
        input.value = ''
      }
    }
  })
)

const execute = (command) => {
  if (command === 'look') {
    input.placeholder = 'look at what?'
    container.append(
      new P('.event', {
        innerHTML: ''
      })
    )
  }
}

const addEvent = () => {
  const event = append(container,
    new P('.event')
  )
  after(.02, () => event.classList.add('visible'))
  return event
}

const agent = (tasks) => {
  const event = addEvent()
  for (const [time, desc] of tasks) {
    after(time, () => desc ? add(event, desc) : remove(event))
  }
}

const dictionary = {
  car: 'noun',
  plane: 'noun',
  train: 'noun',
  station: 'noun',
  passengers: 'noun',
  breeze: 'noun',
  curtains: 'noun',
  window: 'noun',
  intersection: 'noun',
  ',': 'punctuation',
  '.': 'punctuation',
  billow: 'verb',
  flap: 'verb',
  thundering: 'verb',
  screeches: 'verb',
  still: 'verb',
  papers: 'noun',
  rustle: 'verb'
}

const car = [
 [0, 'a car pulls up to the intersection'],
 [10, ', drives past'],
 [13, ', away'],
 [15, ', far away'],
 [20]
]
const plane = [
 [0, 'a plane approaches'],
 [20, ', gradually'],
 [25, ' descending'],
 [30, ', soaring overhead'],
 [35, ' to the north'],
 [40, ', away'],
 [45, ', far away'],
 [50]
]
const train = [
 [0, 'a train pulls in to the station down the track'],
 [5, ', screeches to a halt'],
 [10, ', waits for the passengers to board'],
 [15, ', leaves the station'],
 [20, ', thunders past'],
 [30, ', away'],
 [33, ', far away'],
 [35]
]
const breeze = [
  [0, 'a breeze blows in through the window'],
  [5, 'causing the curtains to gently billow'],
  [9, ' and flap'],
  [18, ', papers on the dining table rustle'],
  [22, ', the breeze stops'],
  [25, ', and the curtains fall still'],
  [30]
]
const music = [
  [0, 'spanish music blares from a car at the intersection'],
  [6, 'the sound bounces and echoes in every direction'],
  [10, 'becoming louder as it passes'],
  [15, ', then, fainter'],
  [19, 'until it is inaudible'],
  [23]
]
const honk = [
  [0, 'a car honks repeatedly'],
  [5, ', followed by the shouts of a cab driver'],
  [9, 'and the squealing of tires'],
  [11, 'as someone races away'],
  [20]
]
const whistle = [
  [0, 'a traffic cop whistles at oncoming traffice'],
  [3, ', holding one arm out to stop a lane'],
  [7, ', waving pedestrians on'],
  [10]
]
const couple = [
  [0, 'a couple walks together'],
  [4, ', hand in hand'],
  [10]
]
const door = [
  [0, 'the next-door neighbor\'s door opens'],
  [4, ', muffled voices echo in the hallway'],
  [9, 'which grow faint as they descend the stairwell'],
  [12, 'until silent'],
  [20, 'the front door to the building slams shut'],
  [25]
]
const sirens = [
  [0, 'sirens wail in the distance'],
  [10, ', steadily growing louder'],
  [13, 'and louder'],
  [15, 'and louder'],
  [18, 'until they pass by'],
  [20, 'and become inaudible'],
  [24]
]

const cars = () => {
  agent(car)
  if (Math.random() < .05)
    after(2, () => agent(music))
  if (Math.random() < .05)
    after(11, () => agent(honk))
  if (Math.random() < .25)
    after(2, () => agent(whistle))
  if (Math.random() < .25)
    after(2, () => agent(couple))
}
const planes = () => {
  agent(plane)
}
const trains = () => {
  agent(train)
  after(20, () => {
    agent([
      [0, 'the apartment is filled with the noise of the train'],
      [6]
    ])
  })
}
const breezes = () => {
  agent(breeze)
}

const CAR_INTERVAL = seconds(5)
const PLANE_INTERVAL = seconds(100)
const TRAIN_INTERVAL = seconds(30)
const BREEZE_INTERVAL = seconds(30)

const start = () => {
  after(1, cars)
  after(3, trains)
  after(5, breezes)
  after(30, () => agent(door))
  after(45, () => agent(sirens))
  routine(cars, CAR_INTERVAL)
  routine(planes, PLANE_INTERVAL)
  routine(trains, TRAIN_INTERVAL)
  routine(breezes, BREEZE_INTERVAL)
}

start()