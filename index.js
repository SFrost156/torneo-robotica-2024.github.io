import { saveRecord, getRecords, updateRecord, deleteRecord, updateAttendance } from './firebase.js';

// Función para cargar los registros en la tabla
async function cargarRegistros() {
  try {
    const registros = await getRecords();
    const tabla = document.getElementById('registrosTabla');
    tabla.innerHTML = '';
    registros.forEach((registro, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${registro.equipo}</td>
        <td>${registro.robot}</td>
        <td>${registro.institucion}</td>
        <td>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="asistencia-${registro.id}" id="asistio-${registro.id}" value="asistio" ${registro.asistencia ? 'checked' : ''} onclick="marcarAsistencia('${registro.id}', true)">
            <label class="form-check-label" for="asistio-${registro.id}">Asistió</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="asistencia-${registro.id}" id="noAsistio-${registro.id}" value="noAsistio" ${!registro.asistencia ? 'checked' : ''} onclick="marcarAsistencia('${registro.id}', false)">
            <label class="form-check-label" for="noAsistio-${registro.id}">No Asistió</label>
          </div>
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarRegistro('${registro.id}', '${registro.robot}', '${registro.institucion}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarRegistro('${registro.id}')">Eliminar</button>
        </td>
      `;
      tabla.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar los registros: ', error);
  }
}

// Función para guardar un nuevo registro
document.getElementById('guardarBtn').addEventListener('click', async () => {
  const equipo = document.getElementById('equipo').value;
  const robot = document.getElementById('robot').value;
  const institucion = document.getElementById('institucion').value;

  if (equipo && robot && institucion) {
    try {
      await saveRecord(equipo, robot, institucion);
      alert('Registro guardado exitosamente');
      cerrarModal('registroModal');
      cargarRegistros();
    } catch (error) {
      alert('Error al guardar el registro');
    }
  } else {
    alert('Todos los campos son obligatorios');
  }
});

// Función para editar un registro
window.editarRegistro = function(id, robot, institucion) {
  document.getElementById('editarEquipo').value = id;
  document.getElementById('editarRobot').value = robot;
  document.getElementById('editarInstitucion').value = institucion;

  const editarModal = new bootstrap.Modal(document.getElementById('editarModal'));
  editarModal.show();

  document.getElementById('editarBtn').onclick = async function() {
    const nuevoRobot = document.getElementById('editarRobot').value;
    const nuevaInstitucion = document.getElementById('editarInstitucion').value;

    if (nuevoRobot && nuevaInstitucion) {
      try {
        await updateRecord(id, nuevoRobot, nuevaInstitucion);
        alert('Registro actualizado exitosamente');
        cerrarModal('editarModal');
        cargarRegistros();
      } catch (error) {
        alert('Error al actualizar el registro');
      }
    } else {
      alert('Todos los campos son obligatorios');
    }
  };
};

// Función para eliminar un registro
window.eliminarRegistro = function(id) {
  const eliminarModal = new bootstrap.Modal(document.getElementById('eliminarModal'));
  eliminarModal.show();

  document.getElementById('confirmarEliminarBtn').onclick = async function() {
    try {
      await deleteRecord(id);
      alert('Registro eliminado exitosamente');
      cerrarModal('eliminarModal');
      cargarRegistros();
    } catch (error) {
      alert('Error al eliminar el registro');
    }
  };
};

// Función para marcar la asistencia
window.marcarAsistencia = async function(id, asistencia) {
  try {
    await updateAttendance(id, asistencia);
    alert('Asistencia actualizada');
  } catch (error) {
    alert('Error al actualizar la asistencia');
  }
};

// Función para cerrar los modales
function cerrarModal(idModal) {
  const modal = bootstrap.Modal.getInstance(document.getElementById(idModal));
  modal.hide();
}

// Cargar registros al cargar la página
window.onload = cargarRegistros;
