//comentario desde GitHub
$(document).ready(function () {
  
  //cuando hago click me lleva a pagina de inicio
  $('#id_link_inicio').click(function(){
    $(location).attr('href', './index.html');
  });

  //cuando hago click me lleva a pagina de registrar usuario
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
        var option = '<option value="' + data[i].name.common + '">' + data[i].name.common + '</option>';
        select.append(option);
      };
          
    },
    error: function() {
      var select = $("#id_cbx_Pais");
      var option = '<option value="">Selecciona un país</option><option value="Argentina">Argentina</option><option value="Brasil">Brasil</option><option value="Canadá">Canadá</option><option value="Chile">Chile</option><option value="Colombia">Colombia</option><option value="Costa Rica">Costa Rica</option><option value="Cuba">Cuba</option><option value="República Dominicana">República Dominicana</option><option value="Ecuador">Ecuador</option><option value="Guatemala">Guatemala</option><option value="Honduras">Honduras</option><option value="México">México</option><option value="Nicaragua">Nicaragua</option><option value="Panamá">Panamá</option><option value="Perú">Perú</option><option value="Estados Unidos">Estados Unidos</option><option value="Uruguay">Uruguay</option><option value="Venezuela">Venezuela</option>';
      select.append(option);
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
      console.log("Error al obtener los datos de la API");
    }
  });

  //cuando hago click en el select provincia se cargan las ciudades
  $("#id_cbx_Provincia").change(function () {
    cargarCiudades($(this).val());
  });

  //cuando hago click en el select pais y si argentina
  //cargo los otros select
  //sino cargo input comunes para agregar manualmente los datos
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
  });


  //Cuando hacemos click en el menu adivinanzas
  $('#id_juego_1').click(function () {
    $(location).attr('href', './juego_1.html');
  });
  
  //Cuando hacemos click en el menu preguntas y respuestas
  $('#id_juego_2').click(function () {
    $(location).attr('href', './juego_2.html');
  });

  //Cuando hacemos click en el boton inicar adivinanzas
  $('#btn_Iniciar_Ad').click(function () {
    let cantidad = 0;
    let juegoAdivina = [];
    let indices = [];
    while (cantidad < 3) {
      let indice = Math.floor(Math.random() * adivinanzas.length);
      if (indices.indexOf(indice) === -1) {
        indices.push(indice);
        juegoAdivina.push(adivinanzas[indice]);
        cantidad++;
      }
    }
    let codigo_preguntas = "";
    for (var i = 0; i < juegoAdivina.length; i++) {
      codigo_preguntas += '<div class="preguntas pb-2">' + juegoAdivina[i].pregunta + '</div>';
      codigo_preguntas += '<div class="ps-3 pb-4">';
      for (var x = 0; x < juegoAdivina[i].respuestas.length; x++) {
        codigo_preguntas += '<div class="form-check">' +
                              '<input class="form-check-input" type="radio" name="p_'+ i +'" id="p_'+ x +'_'+ i +'" value="' + juegoAdivina[i].respuestas[x].correcta + '">' +
                              '<label class="form-check-label" for="p_'+ x +'_'+ i +'">' +
                              juegoAdivina[i].respuestas[x].respuesta +
                              '</label>' +
                            '</div>';
      }
      codigo_preguntas += '</div>';
    }
    $('#btn_Iniciar_Ad').prop('disabled', true);
    $('#id_icon_3, #id_icon_2, #id_icon_1').removeClass('ocultar premioGanador').addClass('premio');
    $('#col_preguntas').html(codigo_preguntas);
    $('#col_mensaje').empty();
    $('input[type="radio"]').prop('disabled', false);
    $('#col_preguntas').removeClass('ocultar');
    $('#col_puntaje').removeClass('ocultar');
  });

  let juegoPregResp = [];
  let i_preg = 0;
  //Cuando hacemos click en el boton inicar preguntas y respuestas
  $('#btn_Iniciar_Preg').click(function () {
    let cantidad = 0;
    juegoPregResp = [];
    let indices = [];
    i_preg = 0;
    while (cantidad < 10) {
      let indice = Math.floor(Math.random() * preguntasRespuestas.length);
      if (indices.indexOf(indice) === -1) {
        indices.push(indice);
        juegoPregResp.push(preguntasRespuestas[indice]);
        cantidad++;
      }
    
    }

    cargarDiv();
    
    $('#btn_Iniciar_Preg').prop('disabled', true);
    $('#id_icon_0').addClass('ocultar');
    $('#id_icon_1').addClass('ocultar');
    $('#id_icon_2').addClass('ocultar');
    $('#id_icon_3').addClass('ocultar');
    $('#id_icon_4').addClass('ocultar');
    $('#id_icon_5').addClass('ocultar');
    $('#id_icon_6').addClass('ocultar');
    $('#id_icon_7').addClass('ocultar');
    $('#id_icon_8').addClass('ocultar');
    $('#id_icon_9').addClass('ocultar');
    $('#id_icon_10').addClass('ocultar');
    $('#col_resultado_respuesta').empty();
    $('input[type="radio"]').prop('disabled', false);
    $('#col_preg_resp').removeClass('ocultar');
    $('#col_puntaje_preg').removeClass('ocultar');
  });

  function cargarDiv() {
    let preguntas_Respuestas = "";

    preguntas_Respuestas += '<div class="preguntas pb-4">' + juegoPregResp[i_preg].pregunta + '</div>';
    preguntas_Respuestas += '<div class="ps-3 pb-4">';

    for (var x = 0; x < juegoPregResp[i_preg].respuestas.length; x++) {
      preguntas_Respuestas += '<div class="form-check pb-2">' +
                                '<input class="form-check-input" type="radio" name="radio_pR" id="radio_pR'+ x +'" value="' + juegoPregResp[i_preg].respuestas[x].correcta + '">' +
                                '<label class="form-check-label" for="radio_pR'+ x +'">' +
                                juegoPregResp[i_preg].respuestas[x].respuesta +
                                '</label>' +
                              '</div>';
    }

    preguntas_Respuestas += '</div>';
    $('#col_preg_resp').html(preguntas_Respuestas);
    $('#col_mensaje_preg').html((i_preg+1) + ' de ' + (juegoPregResp.length));
  }

  //cuando hago click en algun radio de adivinanzas me fijo si en tolas  adivinanzas ya hice click y activo boton fin
  $(document).on('change', 'input[name="p_0"], input[name="p_1"], input[name="p_2"]', function() {
    if ($('input[name="p_0"]').is(':checked') && $('input[name="p_1"]').is(':checked') && $('input[name="p_2"]').is(':checked')) {
      $('#btn_Fin_Ad').removeAttr('disabled');
    }
  });

  //cuando hago click en algun radio de preguntas y respuestas activo boton aceptar
  $(document).on('change', 'input[name="radio_pR"]', function() {
    if ($('input[name="radio_pR"]').is(':checked')) {
      $('#btn_Aceptar_Sig').removeAttr('disabled');
    }
  });

  //Cuando hacemos click en el boton terminar adivinanzas
  $('#btn_Fin_Ad').on('click', function () {
    let resp_1 = parseInt($('input[name="p_0"]:checked').val(), 10) || 0;
    let resp_2 = parseInt($('input[name="p_1"]:checked').val(), 10) || 0;
    let resp_3 = parseInt($('input[name="p_2"]:checked').val(), 10) || 0;

    let sumaAciertos = resp_1 + resp_2 + resp_3;

    switch (sumaAciertos) {
      case 0:
        $('#col_mensaje').html('Lo siento, inténtalo de nuevo.');
        break;
      case 1:
        $('#col_mensaje').html('¡Has acertado una adivinanza!');
        $('#id_icon_1').removeClass('premio').addClass('premioGanador');
        $('#id_icon_3, #id_icon_2').addClass('ocultar');
        break;
      case 2:
        $('#col_mensaje').html('¡Has acertado dos adivinanzas! ¡Muy bien!');
        $('#id_icon_2').removeClass('premio').addClass('premioGanador');
        $('#id_icon_3, #id_icon_1').addClass('ocultar');
        break;
      case 3:
        $('#col_mensaje').html('¡Has acertado todas las adivinanzas! ¡Felicitaciones!');
        $('#id_icon_3').removeClass('premio').addClass('premioGanador');
        $('#id_icon_1, #id_icon_2').addClass('ocultar');
        break;
    }
    $('input[name="p_0"][value="1"]').addClass('correcto');
    $('input[name="p_1"][value="1"]').addClass('correcto');
    $('input[name="p_2"][value="1"]').addClass('correcto');
    $('input[type="radio"]').prop('disabled', true);
    $('#btn_Iniciar_Ad').text('Reiniciar');
    $('#btn_Iniciar_Ad').removeAttr('disabled');
    $('#btn_Fin_Ad').prop('disabled', true);
  });

  //cuando hacemos click en el boton aceptar de preguntas y resouestas
  $('#btn_Aceptar_Sig').on('click', function () {
    let resp_1 = parseInt($('input[name="radio_pR"]:checked').val(), 10) || 0;

    let id_respuesta = $('input[name="radio_pR"][value="1"]').attr('id');
    let respuesta_correcta = $('label[for="' + id_respuesta + '"]').text();
    if (resp_1 === 1) {
      $('#col_resultado_respuesta').html('<div class="text-warning">¡Has acertado, era: <br>' + respuesta_correcta + '.</div><div class="pt-2 fs-5 text-warning">Presiona siguiente para continuar</div>');
      $('#id_estrellas_si').append('<i class="fa-solid fa-star premio_star"></i>');
    } else {
      $('#col_resultado_respuesta').html('<div class="incorrecto">Lo siento, la respuesta correcta era: <br>' + respuesta_correcta + '.</div><div class="pt-2 fs-5 incorrecto">Presiona siguiente para continuar</div>');
      $('#id_estrellas_no').append('<i class="fa-solid fa-star premio_star_no"></i>');
    }

    $('input[name="radio_pR"][value="1"]').addClass('correcto');
    $('input[type="radio"]').prop('disabled', true);

    $('#btn_Siguiente').removeAttr('disabled').removeClass('ocultar');
    $('#btn_Aceptar_Sig').prop('disabled', true).addClass('ocultar');
  });

  //cuando hacemos click en el boton aceptar de preguntas y resouestas
  $('#btn_Siguiente').on('click', function () {
    $('#btn_Siguiente').prop('disabled', true).addClass('ocultar');
    $('#col_resultado_respuesta').empty();
    if (i_preg < (juegoPregResp.length-1)) { //si el indice es menor al total del array sigo cargando preguntas
      i_preg++;
      cargarDiv();
      $('#btn_Aceptar_Sig').removeClass('ocultar');
    } else {// si fue la ultima hago puntuacion
      let cantidadCorrectas = $('#id_estrellas_si svg.premio_star').length;
      $('#id_estrellas_si').empty();
      $('#id_estrellas_no').empty();
      $('#col_mensaje_preg').empty();

      switch (cantidadCorrectas) {
        case 0:
          $('#col_resultado_respuesta').html('<div class="text-warning">0 correctas de 10.</div>');
          $('#id_icon_0').removeClass('ocultar');
          break;
        case 1:
          $('#col_resultado_respuesta').html('<div class="text-warning">1 correctas de 10.</div>');
          $('#id_icon_1').removeClass('ocultar');
          break;
        case 2:
          $('#col_resultado_respuesta').html('<div class="text-warning">2 correctas de 10.</div>');
          $('#id_icon_2').removeClass('ocultar');
          break;
        case 3:
          $('#col_resultado_respuesta').html('<div class="text-warning">3 correctas de 10.</div>');
          $('#id_icon_3').removeClass('ocultar');
          break;
        case 4:
          $('#col_resultado_respuesta').html('<div class="text-warning">5 correctas de 10.</div>');
          $('#id_icon_4').removeClass('ocultar');
          break;
        case 5:
          $('#col_resultado_respuesta').html('<div class="text-warning">5 correctas de 10.</div>');
          $('#id_icon_5').removeClass('ocultar');
          break;
        case 6:
          $('#col_resultado_respuesta').html('<div class="text-warning">6 correctas de 10.</div>');
          $('#id_icon_6').removeClass('ocultar');
          break;
        case 7:
          $('#col_resultado_respuesta').html('<div class="text-warning">7 correctas de 10.</div>');
          $('#id_icon_7').removeClass('ocultar');
          break;
        case 8:
          $('#col_resultado_respuesta').html('<div class="text-warning">Bien! 8 correctas de 10.</div>');
          $('#id_icon_8').removeClass('ocultar');
          break;
        case 9:
          $('#col_resultado_respuesta').html('<div class="text-warning">Muy bien!! 9 correctas de 10.</div>');
          $('#id_icon_9').removeClass('ocultar');
          break;
        case 10:
          $('#col_resultado_respuesta').html('<div class="text-warning">Felicitaciones!!! Las 10 fueron correctas.</div>');
          $('#id_icon_10').removeClass('ocultar');
          break;
      }
      $('#btn_Aceptar_Sig').prop('disabled', true).addClass('ocultar');
      $('#btn_Fin_Preg').removeAttr('disabled').removeClass('ocultar');
    }
  });

 
  //Cuando hacemos click en el boton terminar adivinanzas
  $('#btn_Fin_Preg').on('click', function () {
    $('#btn_Aceptar_Sig').removeClass('ocultar');

    $('#col_preg_resp').addClass('ocultar');
    $('#col_puntaje_preg').addClass('ocultar');

    $('#btn_Iniciar_Preg').text('Reiniciar');
    $('#btn_Iniciar_Preg').removeAttr('disabled');
    $('#btn_Fin_Preg').prop('disabled', true);
    $('#btn_Fin_Preg').addClass('ocultar');
  });

  //cierro sesion al hacer click
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
        $(location).attr('href', './index.html');
      }
    });
  });

  //si estoy en la pagina inicio y hay usuario registrado lo muestro en el menu
  if (window.location.href.indexOf('index.html') > -1) {
    let usuario = localStorage.getItem('usuario')
    if (usuario !== null) {
      $('#id_link_registrate').html('<i class="fa-solid fa-user"></i> ' + usuario);
      $('#id_juego_1, #id_juego_2, #id_link_cerrar').removeClass('ocultar');
    }
  }

  //si estoy en la pagina adivinanzas y hay usuario registrado lo muestro en el menu
  if (window.location.href.indexOf('juego_1.html') > -1) {
    let usuario = localStorage.getItem('usuario')
    if (usuario !== null) {
      $('#id_link_registrate_juego_1').html('<i class="fa-solid fa-user"></i> ' + usuario);
    }
  }

  //si estoy en la pagina preguntas y respuestas y hay usuario registrado lo muestro en el menu
  if (window.location.href.indexOf('juego_2.html') > -1) {
    let usuario = localStorage.getItem('usuario')
    if (usuario !== null) {
      $('#id_link_registrate_juego_1').html('<i class="fa-solid fa-user"></i> ' + usuario);
    }
  }

});


function cargarCiudades(id_provincia) {
  $.ajax({
    url: "https://apis.datos.gob.ar/georef/api/municipios?provincia=" + id_provincia + "&campos=id,nombre&max=100",
    method: "GET",
    dataType: "json",
    success: function(data) {
      
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
      console.log("Error al obtener los datos de la API");
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

let adivinanzas = [
  {
      pregunta: 'Blanco por dentro, verde por fuera, si quieres que te lo diga, espera.',
      respuestas: [
          { respuesta: "El coco", "correcta": 1 },
          { respuesta: "La manzana", "correcta": 0 },
          { respuesta: "El kiwi", "correcta": 0 }
      ]
  },
  {
      pregunta: "Dos en la calle van sobrando, dos en la casa están faltando.",
      respuestas: [
          { respuesta: "Los pies", "correcta": 0 },
          { respuesta: "Los zapatos", "correcta": 0 },
          { respuesta: "Los pantalones", "correcta": 1 }
      ]
  },
  {
      pregunta: "Si me nombra no existo, ¿quién soy?",
      respuestas: [
          { respuesta: "La nada", "correcta": 1 },
          { respuesta: "La sombra", "correcta": 0 },
          { respuesta: "El vacío", "correcta": 0 }
      ]
  },
  {
      pregunta: "Entra al agua y no se moja. ¿Qué es?",
      respuestas: [
          { respuesta: "El pez", "correcta": 0 },
          { respuesta: "El sol", "correcta": 1 },
          { respuesta: "El barco", "correcta": 0 }
      ]
  },
  {
      pregunta: "Aunque soy negro como el carbón, soy más valioso que el oro.",
      respuestas: [
          { respuesta: "La oscuridad", "correcta": 0 },
          { respuesta: "El petróleo", "correcta": 0 },
          { respuesta: "El diamante", "correcta": 1 }
      ]
  },
  {
      pregunta: "Sube por el monte sin ser planta, baja al valle sin ser agua.",
      respuestas: [
          { respuesta: "La nube", "correcta": 0 },
          { respuesta: "La niebla", "correcta": 1 },
          { respuesta: "El río", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene dientes y no puede masticar, tiene cabeza y no puede pensar.",
      respuestas: [
          { respuesta: "Un peine", "correcta": 1 },
          { respuesta: "Un cepillo de dientes", "correcta": 0 },
          { respuesta: "Un lápiz", "correcta": 0 }
      ]
  },
  {
      pregunta: "En el cielo me encuentro, pero no soy estrella. En el nido me hago, pero no soy pájaro.",
      respuestas: [
          { respuesta: "El avión", "correcta": 0 },
          { respuesta: "La luna", "correcta": 0 },
          { respuesta: "La nube", "correcta": 1 }
      ]
  },
  {
      pregunta: "Dura toda la vida y se acaba en un momento.",
      respuestas: [
          { respuesta: "El amor", "correcta": 0 },
          { respuesta: "El tiempo", "correcta": 0 },
          { respuesta: "El suspiro", "correcta": 1 }
      ]
  },
  {
      pregunta: "Si me buscas, no me encuentras. Si me encuentras, no me conoces. ¿Qué soy?",
      respuestas: [
          { respuesta: "La felicidad", "correcta": 0 },
          { respuesta: "El misterio", "correcta": 0 },
          { respuesta: "El silencio", "correcta": 1 }
      ]
  },
  {
      pregunta: "Siempre va para adelante, pero nunca da un paso. ¿Qué es?",
      respuestas: [
          { respuesta: "El tiempo", "correcta": 1 },
          { respuesta: "La velocidad", "correcta": 0 },
          { respuesta: "El camino", "correcta": 0 }
      ]
  },
  {
      pregunta: "Es algo duro y firme, pero cuando se lo calienta se vuelve líquido. ¿Qué es?",
      respuestas: [
          { respuesta: "La mantequilla", "correcta": 0 },
          { respuesta: "El hielo", "correcta": 0 },
          { respuesta: "El hierro", "correcta": 1 }
      ]
  },
  {
      pregunta: "Siempre sube y nunca baja, si lo tocas te quemas. ¿Qué es?",
      respuestas: [
          { respuesta: "El fuego", "correcta": 1 },
          { respuesta: "El sol", "correcta": 0 },
          { respuesta: "La lava", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene un ojo y no puede ver, tiene agua y no puede beber. ¿Qué es?",
      respuestas: [
          { respuesta: "El pez", "correcta": 0 },
          { respuesta: "El mapa", "correcta": 1 },
          { respuesta: "El reloj", "correcta": 0 }
      ]
  },
  {
      pregunta: "Conmigo se escribe, pero no se lee. ¿Qué soy?",
      respuestas: [
          { respuesta: "La tinta", "correcta": 1 },
          { respuesta: "El papel", "correcta": 0 },
          { respuesta: "La pluma", "correcta": 0 }
      ]
  },
  {
      pregunta: "Es más poderoso que Dios. Es más maligno que el diablo. Los pobres lo tienen. Los ricos lo necesitan. Si lo comes, morirás. ¿Qué es?",
      respuestas: [
          { respuesta: "Nada", "correcta": 1 },
          { respuesta: "El amor", "correcta": 0 },
          { respuesta: "El dinero", "correcta": 0 }
      ]
  },
  {
      pregunta: "Es de día cuando llego y de noche me voy. ¿Qué soy?",
      respuestas: [
          { respuesta: "La luz", "correcta": 0 },
          { respuesta: "La sombra", "correcta": 1 },
          { respuesta: "El viento", "correcta": 0 }
      ]
  },
  {
      pregunta: "De día se enciende y de noche se apaga. ¿Qué es?",
      respuestas: [
          { respuesta: "El sol", "correcta": 0 },
          { respuesta: "La luna", "correcta": 1 },
          { respuesta: "Las estrellas", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene forma de aguja y no cose, tiene forma de llave y no abre.",
      respuestas: [
          { respuesta: "La aguja magnética", "correcta": 0 },
          { respuesta: "La llave de paso", "correcta": 0 },
          { respuesta: "La jeringa", "correcta": 1 }
      ]
  },
  {
      pregunta: "Tiene dientes y no puede morder, tiene cabeza y no puede pensar.",
      respuestas: [
          { respuesta: "Un peine", "correcta": 1 },
          { respuesta: "Un cepillo de dientes", "correcta": 0 },
          { respuesta: "Un lápiz", "correcta": 0 }
      ]
  },
  {
      pregunta: "En el día no se ve, en la noche se enciende. ¿Qué es?",
      respuestas: [
          { respuesta: "El fuego", "correcta": 0 },
          { respuesta: "La estrella", "correcta": 1 },
          { respuesta: "El sol", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene corazón y no está vivo, tiene una corona y no es rey.",
      respuestas: [
          { respuesta: "La piña", "correcta": 1 },
          { respuesta: "El melón", "correcta": 0 },
          { respuesta: "La sandía", "correcta": 0 }
      ]
  },
  {
      pregunta: "Vuela sin alas, llora sin ojos. ¿Qué es?",
      respuestas: [
          { respuesta: "La nube", "correcta": 0 },
          { respuesta: "El viento", "correcta": 0 },
          { respuesta: "El suspiro", "correcta": 1 }
      ]
  },
  {
      pregunta: "Siempre sube y nunca baja, siempre entra y nunca sale. ¿Qué es?",
      respuestas: [
          { respuesta: "La edad", "correcta": 1 },
          { respuesta: "El agua", "correcta": 0 },
          { respuesta: "El fuego", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene ojos y no puede ver, tiene agua y no puede beber. ¿Qué es?",
      respuestas: [
          { respuesta: "El pez", "correcta": 0 },
          { respuesta: "El mapa", "correcta": 1 },
          { respuesta: "El reloj", "correcta": 0 }
      ]
  },
  {
      pregunta: "Es redonda como una luna, pero nunca está en el cielo.",
      respuestas: [
          { respuesta: "La moneda", "correcta": 1 },
          { respuesta: "La pelota", "correcta": 0 },
          { respuesta: "La pizza", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene escamas y no es pez, tiene corona y no es rey.",
      respuestas: [
          { respuesta: "La piña", "correcta": 1 },
          { respuesta: "El melón", "correcta": 0 },
          { respuesta: "La sandía", "correcta": 0 }
      ]
  },
  {
      pregunta: "En el cielo me encuentro, pero no soy estrella. En el nido me hago, pero no soy pájaro.",
      respuestas: [
          { respuesta: "El avión", "correcta": 0 },
          { respuesta: "La luna", "correcta": 0 },
          { respuesta: "La nube", "correcta": 1 }
      ]
  },
  {
      pregunta: "Tiene dientes y no puede masticar, tiene cabeza y no puede pensar. ¿Qué es?",
      respuestas: [
          { respuesta: "Un peine", "correcta": 1 },
          { respuesta: "Un cepillo de dientes", "correcta": 0 },
          { respuesta: "Un lápiz", "correcta": 0 }
      ]
  },
  {
      pregunta: "En el día se enciende y de noche se apaga. ¿Qué es?",
      respuestas: [
          { respuesta: "El sol", "correcta": 0 },
          { respuesta: "La luna", "correcta": 1 },
          { respuesta: "Las estrellas", "correcta": 0 }
      ]
  },
  {
      pregunta: "Si me buscas, no me encuentras. Si me encuentras, no me conoces. ¿Qué soy?",
      respuestas: [
          { respuesta: "La felicidad", "correcta": 0 },
          { respuesta: "El misterio", "correcta": 0 },
          { respuesta: "El silencio", "correcta": 1 }
      ]
  },
  {
      pregunta: "Sube por el monte sin ser planta, baja al valle sin ser agua.",
      respuestas: [
          { respuesta: "La nube", "correcta": 0 },
          { respuesta: "La niebla", "correcta": 1 },
          { respuesta: "El río", "correcta": 0 }
      ]
  },
  {
      pregunta: "Aunque soy negro como el carbón, soy más valioso que el oro.",
      respuestas: [
          { respuesta: "La oscuridad", "correcta": 0 },
          { respuesta: "El petróleo", "correcta": 0 },
          { respuesta: "El diamante", "correcta": 1 }
      ]
  },
  {
      pregunta: "Entra al agua y no se moja. ¿Qué es?",
      respuestas: [
          { respuesta: "El pez", "correcta": 0 },
          { respuesta: "El sol", "correcta": 1 },
          { respuesta: "El barco", "correcta": 0 }
      ]
  },
  {
      pregunta: "Tiene ojos y no puede ver, tiene agua y no puede beber. ¿Qué es?",
      respuestas: [
          { respuesta: "El pez", "correcta": 0 },
          { respuesta: "El mapa", "correcta": 1 },
          { respuesta: "El reloj", "correcta": 0 }
      ]
  },
  {
      pregunta: "Conmigo se escribe, pero no se lee. ¿Qué soy?",
      respuestas: [
          { respuesta: "La tinta", "correcta": 1 },
          { respuesta: "El papel", "correcta": 0 },
          { respuesta: "La pluma", "correcta": 0 }
      ]
  }
];

let preguntasRespuestas = [
  {
      pregunta: "¿Cuál es la capital de Francia?",
      respuestas: [
          { respuesta: "Madrid", "correcta": 0 },
          { respuesta: "París", "correcta": 1 },
          { respuesta: "Roma", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Quién pintó La Mona Lisa?",
      respuestas: [
          { respuesta: "Pablo Picasso", "correcta": 0 },
          { respuesta: "Leonardo da Vinci", "correcta": 1 },
          { respuesta: "Vincent van Gogh", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el río más largo del mundo?",
      respuestas: [
          { respuesta: "Amazonas", "correcta": 1 },
          { respuesta: "Nilo", "correcta": 0 },
          { respuesta: "Misisipi", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el océano más grande del mundo?",
      respuestas: [
          { respuesta: "Océano Índico", "correcta": 0 },
          { respuesta: "Océano Atlántico", "correcta": 0 },
          { respuesta: "Océano Pacífico", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿En qué año comenzó la Segunda Guerra Mundial?",
      respuestas: [
          { respuesta: "1939", "correcta": 1 },
          { respuesta: "1945", "correcta": 0 },
          { respuesta: "1914", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es la montaña más alta del mundo?",
      respuestas: [
          { respuesta: "Monte Everest", "correcta": 1 },
          { respuesta: "Monte Kilimanjaro", "correcta": 0 },
          { respuesta: "Monte Aconcagua", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el metal más preciado?",
      respuestas: [
          { respuesta: "Platino", "correcta": 0 },
          { respuesta: "Oro", "correcta": 1 },
          { respuesta: "Plata", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el país más grande del mundo en términos de superficie?",
      respuestas: [
          { respuesta: "China", "correcta": 0 },
          { respuesta: "Estados Unidos", "correcta": 0 },
          { respuesta: "Rusia", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿Cuál es la lengua más hablada del mundo?",
      respuestas: [
          { respuesta: "Español", "correcta": 0 },
          { respuesta: "Inglés", "correcta": 0 },
          { respuesta: "Chino mandarín", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿En qué continente se encuentra Egipto?",
      respuestas: [
          { respuesta: "África", "correcta": 1 },
          { respuesta: "Asia", "correcta": 0 },
          { respuesta: "Europa", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el instrumento musical de viento más antiguo?",
      respuestas: [
          { respuesta: "Trompeta", "correcta": 0 },
          { respuesta: "Flauta", "correcta": 1 },
          { respuesta: "Saxofón", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es la moneda oficial de Japón?",
      respuestas: [
          { respuesta: "Yen", "correcta": 1 },
          { respuesta: "Euro", "correcta": 0 },
          { respuesta: "Dólar", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es la ciudad italiana famosa por su canal?",
      respuestas: [
          { respuesta: "Roma", "correcta": 0 },
          { respuesta: "Venecia", "correcta": 1 },
          { respuesta: "Florencia", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el país de origen de la pizza?",
      respuestas: [
          { respuesta: "Italia", "correcta": 1 },
          { respuesta: "Francia", "correcta": 0 },
          { respuesta: "Estados Unidos", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es la fórmula química del agua?",
      respuestas: [
          { respuesta: "H2O", "correcta": 1 },
          { respuesta: "CO2", "correcta": 0 },
          { respuesta: "NaCl", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el símbolo químico del oro?",
      respuestas: [
          { respuesta: "Ag", "correcta": 0 },
          { respuesta: "Au", "correcta": 1 },
          { respuesta: "Fe", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el planeta más cercano al sol?",
      respuestas: [
          { respuesta: "Venus", "correcta": 0 },
          { respuesta: "Mercurio", "correcta": 1 },
          { respuesta: "Marte", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el proceso de conversión de un gas en líquido?",
      respuestas: [
          { respuesta: "Evaporación", "correcta": 0 },
          { respuesta: "Condensación", "correcta": 1 },
          { respuesta: "Solidificación", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el autor de la obra 'Don Quijote de la Mancha'?",
      respuestas: [
          { respuesta: "Miguel de Cervantes", "correcta": 1 },
          { respuesta: "Gabriel García Márquez", "correcta": 0 },
          { respuesta: "William Shakespeare", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el océano más pequeño del mundo?",
      respuestas: [
          { respuesta: "Océano Índico", "correcta": 0 },
          { respuesta: "Océano Atlántico", "correcta": 0 },
          { respuesta: "Océano Ártico", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿Cuál es el país con la mayor población del mundo?",
      respuestas: [
          { respuesta: "Estados Unidos", "correcta": 0 },
          { respuesta: "India", "correcta": 0 },
          { respuesta: "China", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿Cuál es la ciudad conocida como 'La Ciudad Eterna'?",
      respuestas: [
          { respuesta: "Atenas", "correcta": 0 },
          { respuesta: "Roma", "correcta": 1 },
          { respuesta: "París", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el río más largo de América del Norte?",
      respuestas: [
          { respuesta: "Río Misisipi", "correcta": 0 },
          { respuesta: "Río Colorado", "correcta": 0 },
          { respuesta: "Río Misisipi-Misuri", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿Cuál es el continente más poblado del mundo?",
      respuestas: [
          { respuesta: "África", "correcta": 0 },
          { respuesta: "Asia", "correcta": 1 },
          { respuesta: "Europa", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el país con la forma de gobierno de monarquía parlamentaria más antigua?",
      respuestas: [
          { respuesta: "Reino Unido", "correcta": 1 },
          { respuesta: "Japón", "correcta": 0 },
          { respuesta: "Canadá", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el desierto más grande del mundo?",
      respuestas: [
          { respuesta: "Desierto del Sahara", "correcta": 1 },
          { respuesta: "Desierto de Gobi", "correcta": 0 },
          { respuesta: "Desierto de Atacama", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el país con la mayor cantidad de islas?",
      respuestas: [
          { respuesta: "Filipinas", "correcta": 0 },
          { respuesta: "Indonesia", "correcta": 1 },
          { respuesta: "Maldivas", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es la montaña más alta de América del Norte?",
      respuestas: [
          { respuesta: "Monte Rainier", "correcta": 0 },
          { respuesta: "Monte McKinley", "correcta": 0 },
          { respuesta: "Monte Denali", "correcta": 1 }
      ]
  },
  {
      pregunta: "¿Cuál es el país con la mayor cantidad de premios Nobel?",
      respuestas: [
          { respuesta: "Estados Unidos", "correcta": 1 },
          { respuesta: "Reino Unido", "correcta": 0 },
          { respuesta: "Alemania", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el compuesto químico principal en el aire?",
      respuestas: [
          { respuesta: "Dióxido de carbono", "correcta": 0 },
          { respuesta: "Nitrógeno", "correcta": 1 },
          { respuesta: "Oxígeno", "correcta": 0 }
      ]
  },
  {
      pregunta: "¿Cuál es el autor de la obra 'Romeo y Julieta'?",
      respuestas: [
          { respuesta: "William Shakespeare", "correcta": 1 },
          { respuesta: "Miguel de Cervantes", "correcta": 0 },
          { respuesta: "Gabriel García Márquez", "correcta": 0 }
      ]
  }
];