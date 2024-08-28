import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZj1SRSar7lCB6TDb_wYQFZFNDHgGY0yc",
  authDomain: "torneo-robotica-2024.firebaseapp.com",
  projectId: "torneo-robotica-2024",
  storageBucket: "torneo-robotica-2024.appspot.com",
  messagingSenderId: "33083892195",
  appId: "1:33083892195:web:425852abb85ad57b9200d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Guardar un nuevo registro
export async function saveRecord(equipo, robot, institucion) {
  try {
    await addDoc(collection(db, "robots"), {
      equipo: equipo,
      robot: robot,
      institucion: institucion,
      asistencia: false
    });
  } catch (error) {
    console.error("Error al guardar el registro: ", error);
  }
}

// Obtener todos los registros
export async function getRecords() {
  const querySnapshot = await getDocs(collection(db, "robots"));
  const registros = [];
  querySnapshot.forEach((doc) => {
    registros.push({ id: doc.id, ...doc.data() });
  });
  return registros;
}

// Actualizar un registro
export async function updateRecord(id, robot, institucion) {
  try {
    const registroRef = doc(db, "robots", id);
    await updateDoc(registroRef, {
      robot: robot,
      institucion: institucion
    });
  } catch (error) {
    console.error("Error al actualizar el registro: ", error);
  }
}

// Eliminar un registro
export async function deleteRecord(id) {
  try {
    const registroRef = doc(db, "robots", id);
    await deleteDoc(registroRef);
  } catch (error) {
    console.error("Error al eliminar el registro: ", error);
  }
}

// Actualizar asistencia
export async function updateAttendance(id, asistencia) {
  try {
    const registroRef = doc(db, "robots", id);
    await updateDoc(registroRef, {
      asistencia: asistencia
    });
  } catch (error) {
    console.error("Error al actualizar la asistencia: ", error);
  }
}
