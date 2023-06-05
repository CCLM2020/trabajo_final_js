//comentario desde GitHub
$(document).ready(function () {
  
  $('#id_link_inicio').click(function(){
    $(location).attr('href', './index.html');
  });

  $('#id_link_registrate').click(function(){
    $(location).attr('href', './registro.html');
  });

  //de usuarios en inicio
  $.ajax({
    url: " https://restcountries.com/v3.1/all",
    method: "GET",
    dataType: "json",
    success: function(data) {
      
      var select = $("#id_cbx_Pais");

      // Ordenar los nombres de los países
      data.sort(function(a, b) {
        var nameA = a.name.common.toUpperCase();
        var nameB = b.name.common.toUpperCase();
        return nameA.localeCompare(nameB);
      });

      //cargo el primero vacio asi me funciona change en select despues
      select.append('<option value=""></option>');

      for (var i = 0; i < data.length; i++) {
        //console.log();    
        var option = '<option value="' + data[i].name.common + '">' + data[i].name.common + '</option>';
            
        select.append(option);
      };
          
    },
    error: function() {
      var select = $("#id_cbx_Pais");
      var option = '<option value="">Selecciona un país</option><option value="Argentina">Argentina</option><option value="Brasil">Brasil</option><option value="Canadá">Canadá</option><option value="Chile">Chile</option><option value="Colombia">Colombia</option><option value="Costa Rica">Costa Rica</option><option value="Cuba">Cuba</option><option value="República Dominicana">República Dominicana</option><option value="Ecuador">Ecuador</option><option value="Guatemala">Guatemala</option><option value="Honduras">Honduras</option><option value="México">México</option><option value="Nicaragua">Nicaragua</option><option value="Panamá">Panamá</option><option value="Perú">Perú</option><option value="Estados Unidos">Estados Unidos</option><option value="Uruguay">Uruguay</option><option value="Venezuela">Venezuela</option>';
      select.append(option);
      /*
      
*/
      //alert("Error al obtener los datos de la API");
    }
  });


  $.ajax({
    url: " https://apis.datos.gob.ar/georef/api/provincias",
    method: "GET",
    dataType: "json",
    success: function(data) {
          
      var select = $("#id_cbx_Provincia");

      //ordenamos el array alfabeticamente.
      data.provincias.sort(function(mayor, menor) {
        return mayor.nombre.localeCompare(menor.nombre);
      });

      //cargo el primero vacio asi me funciona change en select despues
      select.append('<option value=""></option>');

      for (var i = 0; i < data.provincias.length; i++) {
            
        var option = '<option value="' + data.provincias[i].id + '">' + data.provincias[i].nombre + '</option>';
            
        select.append(option);
      };
          
    },
    error: function() {
      alert("Error al obtener los datos de la API");
    }
  });

  $("#id_cbx_Provincia").change(function () {
    cargarCiudades($(this).val());
  });

  $("#id_cbx_Pais").change(function () {
    if ($(this).val() == "Argentina") {
      $('#id_txt_Provincia').addClass('ocultar');
      $('#id_txt_Ciudad').addClass('ocultar');
      $('#id_cbx_Provincia').removeClass('ocultar');
      $('#id_cbx_Ciudad').removeClass('ocultar');
    } else if ($(this).val() == "") {
      $('#id_txt_Provincia').addClass('ocultar');
      $('#id_txt_Ciudad').addClass('ocultar');
      $('#id_cbx_Provincia').addClass('ocultar');
      $('#id_cbx_Ciudad').addClass('ocultar');
    } else {
      $('#id_txt_Provincia').removeClass('ocultar');
      $('#id_txt_Ciudad').removeClass('ocultar');
      $('#id_cbx_Provincia').addClass('ocultar');
      $('#id_cbx_Ciudad').addClass('ocultar');
    };
  });


  //Esta función comprueba los datos requeridos
  function ComprobarDatos() {
    if ($('#id_txt_nombre').val() == "") {
      $('#id_txt_nombre').css("background", "#FDB0AF");
      $('#id_txt_nombre').attr("placeholder", "Falta el nombre del usuario");
      $("#id_txt_nombre").focus();
      return false;
    } else if ($('#id_txt_apellido').val() == "") {
      $('#id_txt_apellido').css("background", "#FDB0AF");
      $('#id_txt_apellido').attr("placeholder", "Falta el apellido del usuario");
      $("#id_txt_apellido").focus();
      return false;
    } else if (!checkEdad('id_txt_edad','span_error_edad')) {
      $('#span_error_edad').removeClass('correo-hide');
      $('#id_txt_edad').css("background", "#FDB0AF");
      $("#id_txt_edad").focus();
      return false;
    } else if ($('#id_txt_correo').val() == "") {
      $('#id_txt_correo').css("background", "#FDB0AF");
      $('#id_txt_correo').attr("placeholder", "Falta ingresar el email");
      $("#id_txt_correo").focus();
      return false;
    } else if (!validarFormatoEmail('id_txt_correo')) {
      $('#span_error_Email').text('Utilice un formato de correo válido (ejemplo: miCorreo@correo.com).');
      $('#span_error_Email').removeClass('correo-hide');
      $('#id_txt_correo').css("background", "#FDB0AF");
      $("#id_txt_correo").focus();
      return false;
    } else if ($('#id_txt_usuario').val() == "") {
      $('#id_txt_usuario').css("background", "#FDB0AF");
      $('#id_txt_usuario').attr("placeholder", "Falta el apellido del usuario");
      $("#id_txt_usuario").focus();
      return false;
    } else if ($('#id_txt_password_1').val() == "") {
      $('#span_error_Pass_A').text('Falta ingresar la contraseña');
      $('#span_error_Pass_A').removeClass('correo-hide');
      $('#id_txt_password_1').css("background", "#FDB0AF");
      $("#id_txt_password_1").focus();
      return false;
    } else if ($('#id_txt_password_2').val() == "") {
      $('#span_error_Pass_B').text('Falta ingresar la contraseña');
      $('#span_error_Pass_B').removeClass('correo-hide');
      $('#id_txt_password_2').css("background", "#FDB0AF");
      $("#id_txt_password_2").focus();
      return false;
    } else if (!comprobarIgualdad('id_txt_password_1','id_txt_password_2')) {
      $('#span_error_Pass_A').text('Las contraseñas son distintas');
      $('#span_error_Pass_A').removeClass('correo-hide');
      $('#id_txt_password_1').css("background", "#FDB0AF");
      $('#id_txt_password_2').css("background", "#FDB0AF");
      $("#id_txt_password_1").focus();
      return false; 
    } else if (!checkPassword('id_txt_password_1','span_error_Pass_A')) {
      $('#span_error_Pass_A').removeClass('correo-hide');
      $('#id_txt_password_1').css("background", "#FDB0AF");
      $('#id_txt_password_2').css("background", "#FDB0AF");
      $("#id_txt_password_1").focus();
      return false;
    } else {
      return true;
    }
  };

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_nombre').keyup(function () {
    if ($('#id_txt_nombre').val() != "") {
      $('#id_txt_nombre').css("background", "#FFFFFF");
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_apellido').keyup(function () {
    if ($('#id_txt_apellido').val() != "") {
      $('#id_txt_apellido').css("background", "#FFFFFF");
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_edad').on('input change', function () {
    if ($('#id_txt_edad').val() != "") {
      $('#id_txt_edad').css("background", "#FFFFFF");
      $('#sspan_error_edad').addClass('correo-hide');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_correo').keyup(function () {
    if ($('#id_txt_correo').val() != "") {
      $('#id_txt_correo').css("background", "#FFFFFF");
      $('#span_error_Email').addClass('correo-hide');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_apellido').keyup(function () {
    if ($('#id_txt_apellido').val() != "") {
      $('#id_txt_apellido').css("background", "#FFFFFF");
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_password_1').keyup(function () {
    if ($('#id_txt_password_1').val() != "") {
      $('#id_txt_password_1').css("background", "#FFFFFF");
      $('#span_error_Pass_A').addClass('correo-hide');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal
  $('#id_txt_password_2').keyup(function () {
    if ($('#id_txt_password_2').val() != "") {
      $('#id_txt_password_2').css("background", "#FFFFFF");
      $('#span_error_Pass_B').addClass('correo-hide');
    }
  });

  //cuando click en el icono ver password dejor ver el texto de contraseña
  $('#id-icono-passA').click(function() {
    var passwordInputA = $('#id_txt_password_1');
    var passwordInputB = $('#id_txt_password_2');
    var passwordType = passwordInputA.attr('type');

    if (passwordType === 'password') {
      passwordInputA.attr('type', 'text');
      passwordInputB.attr('type', 'text');
      $('#id-icono-A').removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
      passwordInputA.attr('type', 'password');
      passwordInputB.attr('type', 'password');
      $('#id-icono-A').removeClass('fa-eye').addClass('fa-eye-slash');
    }
  });

  //Cuando hacemos click en el boton guardarmos
  $('#id_btn_Registrar').click(function () {
    if (ComprobarDatos()) {
      localStorage.setItem("usuario", $('#id_txt_usuario').val());
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario fue registrado',
        showConfirmButton: false,
        timer: 1800,
        customClass: {
          icon: 'h6'
        },
        didOpen: function() {
          setTimeout(function() {
            $(location).attr('href', './index.html');
          }, 2000);
        }
      });
    };
  })
});


$('#id_link_cerrar').click(function () {
  Swal.fire({
    title: 'Salir',
    html: '¿Desea cerrar sesion?',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar!',
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      title: 'fs-4 text-danger',
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-outline-danger me-2',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("usuario");
      $('#id_link_registrate').html('Registrate');
      $('#id_juego_1, #id_juego_2, #id_link_cerrar').addClass('ocultar');
    }
  });
});

if (window.location.href.indexOf('index.html') > -1) {
  let usuario = localStorage.getItem('usuario')
  if (usuario !== null) {
    $('#id_link_registrate').html('<i class="fa-solid fa-user"></i> ' + usuario);
    $('#id_juego_1, #id_juego_2, #id_link_cerrar').removeClass('ocultar');
  }
  
}


function cargarCiudades(id_provincia) {
  $.ajax({
    url: "https://apis.datos.gob.ar/georef/api/municipios?provincia=" + id_provincia + "&campos=id,nombre&max=100",
    method: "GET",
    dataType: "json",
    success: function(data) {
      //console.log(data);
      
      var select = $("#id_cbx_Ciudad");

      //si tiene algo cargado lo borro...
      select.empty();

      //ordenamos el array alfabeticamente.
      data.municipios.sort(function(mayor, menor) {
        return mayor.nombre.localeCompare(menor.nombre);
      });

      //cargo el primero vacio asi me funciona change en select despues
      select.append('<option value=""></option>');

      for (var i = 0; i < data.municipios.length; i++) {
            
        var option = '<option value="' + data.municipios[i].id + '">' + data.municipios[i].nombre + '</option>';
            
        select.append(option);
      };
          
    },
    error: function() {
      alert("Error al obtener los datos de la API");
    }
  });
};

//esta funcion me devuelve verdadero si el formato de un email es valido
function validarFormatoEmail(inputId) {
  var emailInput = $('#' + inputId);
  var email = emailInput.val();

  // Expresión regular para verificar el formato de correo electrónico
  var emailFormato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailFormato.test(email)) {
    return true;
  } else {
    return false;
  }
}

//esta funcion me permite verificar si dos input son iguales las contraseñas
function comprobarIgualdad(inputId_A, inputId_B) {
  let input_A = $('#' + inputId_A);
  let input_B = $('#' + inputId_B);

  input_A =  input_A.val();
  input_B =  input_B.val();

  if (input_A === input_B) {
    return true;
  } else {
    return false;
  };
};

//esta funcion me permite verficar la contraseña cumpla los requisitos de:
//tener al menos 8 caracteres, incluir una combinación de letras (mayúsculas y minúsculas)
//números y caracteres especiales (por ejemplo, !, @, #, $, %)
function checkPassword(inputPass, idSpan) {
  let input = $('#' + inputPass);
  let span = $('#' + idSpan);
  let pass =  input.val();
  
  // Verificar la longitud mínima
  if (pass.length < 8) {
    span.text('La contraseña debe tener al menos 8 caracteres');
    return false;
  }

  // Verificar la combinación de letras (mayúsculas y minúsculas), números y caracteres especiales
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!]).+$/;
  if (!regex.test(pass)) {
    span.text('Se debe incluir letras (mayúsculas y minúsculas), números y caracteres especiales');
    return false;
  }

  return true;
}

//funcion para checkear sea primero un numero y si lo es que este dentro de un rango de edad razonable
function checkEdad(inputEdad, idSpan) {
  let input = $('#' + inputEdad);
  let span = $('#' + idSpan);
  let edad =  input.val();

  if (isNaN(edad)) {
    span.text('No es un número válido');
    return false;
  } else if (edad < 1 || edad > 120 ) {
    span.text('No es una edad válida (de 1 a 120 años)');
    return false;
  } else {
    return true;
  }
}