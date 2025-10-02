const amigos = ["Juan","Carlos","María"]
const [data1] = amigos
const [,data2] = amigos
const [,,data3] = amigos

const apps = [
  ["VSCode", "Xampp", "AndroidStudio"],
  ["Photoshop", "Ilustrator", "Premier"],
  ["Excel", "PowerBI", "SAP"]
]

const [appDev] = apps
const [,appDesign] = apps
const [,,appAdmin] = apps

//Deserialización de objetos
const SENATI = {
  zonal: "Ica Ayacucho",
  sede: "UCP Chincha",
  carrera: "Ing de software IA"
}

const {zonal, sede, carrera} = SENATI
/*
const infoZonal = SENATI.zonal
const infoSede = SENATI.sede
const infoCarrera = SENATI.carrera
*/
console.log(carrera)
 
