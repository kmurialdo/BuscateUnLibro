  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  var app = new Framework7({
      // App root element
      root: '#app',
      // App Name
      name: 'BuscateUnLibro',
      // App id
      id: 'com.myapp.test',
      // Enable swipe panel
      panel: {
          swipe: 'left',
      },
      // Add default routes
      routes: [
          { path: '/index/', url: 'index.html', },
          { path: '/registro/', url: 'registro.html', },
          { path: '/principal/', url: 'principal.html', },
          { path: '/paraescritor/', url: 'paraescritor.html', },
          { path: '/biblioteca/', url: 'biblioteca.html', },
          { path: '/tendencias/', url: 'tendencias.html', },
          { path: '/bp/', url: 'bp.html', },
          { path: '/libro/', url: 'libro.html', },
          { path: '/pgadmin/', url: 'pgadmin.html', },
          { path: '/sumalibros/', url: 'sumalibros.html', },
          { path: '/generarlistas/', url: 'generarlistas.html', },
          { path: '/listas/', url: 'listas.html', },
          { path: '/comprafinal/', url: 'comprafinal.html', },
          { path: '/todos/', url: 'todos.html', },
          { path: '/final/', url: 'final.html', },
          { path: '/miscompras/', url: 'miscompras.html', },
      ]
      // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  /*--------------------------------------------------------------
  VARIABLES GLOBALES
  ---------------------------------------------------------------*/
  var db = firebase.firestore();
  var listasRef = db.collection("tendencias");
  var userRef = db.collection("usuarios");
  var librosRef = db.collection("libros");
  var bibliotecasRef = db.collection("bibliotecas");
  var comprasRef = db.collection("compras");
  var storage = window.localStorage;
  var nombreactual = "";
  var apellidoactual = "";
  var emailactual = "";
  var codAguardar = "";
  var animo = "";
  var persona = "";
  var p1 = "";
  var p2 = "";
  var p3 = "";
  var p4 = "";
  var libroencontrado = "";
  var selList = "";
  var Refquery = "";
  var tendP1 = "";
  var tendP2 = "";
  var tendP3 = "";
  var codAguardar = "";
  var precioE = "";
  var precioA = "";
  var precioP = "";
  var tapa = "";
  var tapanueva = "";
  var tit = "";
  var aut = "";
  var l1 = "";
  var l2 = "";
  var l3 = "";
  var l4 = "";
  var l5 = "";
  var listaAver = "";
  var ind = 0;
  var productoscomprados = [];


  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {

      console.log("Device is ready!");
  });

  // Option 1. Using one 'page:init' handler for all pages
  $$(document).on('page:init', function(e) {




  })

  // Option 2. Using live 'page:init' event handlers for each page

  $$(document).on('page:init', '.page[data-name="index"]', function(e) {
      $$("#ingresar").on('click', fninicio);
      $$("#registro").on('click', fnregistrarse);
      $$("#recupero").on('click', fnrecuperarclave);
  })

  $$(document).on('page:init', '.page[data-name="registro"]', function(e) {
      var url = "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre";
      app.request.json(url, function(datos) {
          for (var i = 0; i < datos.provincias.length; i++) {
              $$("#provreg").append('<option  value="' + datos.provincias[i].nombre + '">' + datos.provincias[i].nombre + '</option>');
          }
      });

      $$("#registrar").on('click', fnregistrado);
  })

  $$(document).on('page:init', '.page[data-name="principal"]', function(e) {
      $$("#pgbiblio").removeClass("activo");
      $$("pghome").addClass("activo");
      $$("pgtendencias").removeClass("activo");
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
      $$("#holauser").append(" " + nombreactual);
      $$("#pgbiblio").on('click', fnAbiblio);
      $$("#pgtendencias").on('click', fnAtendencias);
      $$("#buspersonal").on('click', fnbusP);
      $$("#prichango").on('click', fnCompraFinal);
      $$("#cerrar").on('click', fnCerrar);
      $$("#todotodo").on('click', fntodos);

  })
  $$(document).on('page:init', '.page[data-name="bp"]', function(e) {
      $$(".back").on('click', fnActChango);
      $$("#btnbuscar").on('click', fnbusLibro);
      $$(".imgcaras").on('click', function() { fncaras(this.id) });
      $$(".preg1").on('click', function() { fnpreg1(this.id) });
      $$(".preg2").on('click', function() { fnpreg2(this.id) });
      $$(".preg3").on('click', function() { fnpreg3(this.id) });
      $$(".preg4").on('click', function() { fnpreg4(this.id) });

  })
  $$(document).on('page:init', '.page[data-name="todos"]', function(e) {
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
      $$("#todchango").on('click', fnCompraFinal);
      $$(".back").on('click', fnActChango);
      librosRef.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  console.log(doc.data().titulo + " - " + doc.data().autor);
                  $$("#abuscarlo").append(`
                                <li id="` + doc.id + `" class="item-content searchbar-hide-on-enable" onclick="fnverellibro2(this.id)">
                                    <div class="item-inner">
                                        <div class="item-title">` + doc.data().titulo + ` - ` + doc.data().autor + `</div><span class="item-title oculto"> ` + doc.data().genero + `</span>
                                    </div>
                                </li>
                                                `);

              })
          })

      var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
              search(sb, query, previousQuery) {
                  console.log(query, previousQuery);
              }
          }
      });
      $$(".acomprar").on('click', function() { fnComprar(this.id) });
      $$("#pgbiblio").on('click', fnAbiblio);
      $$("#pgtendencias").on('click', fnAtendencias);
      $$("#pghome").on('click', fnAhome);
  })
  $$(document).on('page:init', '.page[data-name="libro"]', function(e) {
      libroencontrado.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  $$("#imgtapa").attr('src', doc.data().tapa);
                  $$("#titulo").text(doc.data().titulo + " - " + doc.data().autor);
                  $$("#poptitulo").text(doc.data().titulo + " - " + doc.data().autor);
                  $$(".popsinopsis").text(doc.data().sinopsis);
                  $$("#popanio").text("Año: " + doc.data().fecha);
                  $$("#precioaudio").text("$ " + doc.data().precioaudio);
                  $$("#precioebook").text("$ " + doc.data().precioebook);
                  $$("#preciopapel").text("$ " + doc.data().preciopapel);
                  codAguardar = doc.id;
                  precioE = doc.data().precioebook;
                  precioA = doc.data().precioaudio;
                  precioP = doc.data().preciopapel;
                  tapa = doc.data().tapa;
                  tit = doc.data().titulo
                  aut = doc.data().autor
              });
          })
          .catch(function(error) {

              console.log("Error: ", error);

          });
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);

      };
      $$("#pgbiblio").on('click', fnAbiblio);
      $$("#pghome").on('click', fnAhome);
      $$("#pgtendencias").on('click', fnAtendencias);
      $$("#agregarabiblio").on('click', fnaMiBiblio);
      $$(".acomprar").on('click', function() { fnComprar(this.id) });
      $$("#libchango").on('click', fnCompraFinal);


  })
  $$(document).on('page:init', '.page[data-name="biblioteca"]', function(e) {
      $$("#bibpgbiblio").addClass("activo");
      $$("#bibpghome").removeClass("activo");
      $$("#bibpgtendencias").removeClass("activo");
      $$(".back").on('click', fnActChango);
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
      $$("#bibchango").on('click', fnCompraFinal);
      BdeUser = bibliotecasRef.where("usuario", "==", emailactual);
      //console.log(BdeUser);
      BdeUser.get()
          .then(function(querySnapshot) {
              console.log("estoy en el THEN del query")
              $$("#bibliovacia").removeClass("oculto").addClass("visible");
              querySnapshot.forEach(function(doc) {
                  console.log("entre al DOC ")
                  $$("#bibliovacia").removeClass("visible").addClass("oculto");
                  console.log("IDGUARDADO = " + doc.id);
                  libroenbiblio = doc.data().codigodelibro;
                  //fechadeguardado = doc.data().fecha;
                  //console.log(fechadeguardado);
                  console.log(libroenbiblio);
                  librosRef.doc(libroenbiblio).get()
                      .then((doc2) => {
                          if (doc2.exists) {
                              //console.log("Existeeeeeeeeee");
                              //console.log(doc2.data().titulo);
                              $$("#biblioconlibros").append(`<div class="card demo-card-header-pic">
                                            <div style="background-image:url(` + doc2.data().tapa + `)" class="card-header align-items-flex-end">` + doc2.data().titulo + `</div>
                                            <div class="card-content card-content-padding">
                                                <p class="date">Guardado el ` + doc.data().fecha + `</p>
                                            </div>
                                            <div class="card-footer">
                                            <a href="#" id="` + doc.id + `" onclick="fnborrarloguardado(this.id)" class="color-red">Borrar</a><a href="#" id="` + doc2.id + `" onclick="fnverellibro(this.id)" data-popup=".popup-biblio" class="link">Ver más</a></div></div>`);

                          } else {
                              console.log("No existe");
                          }
                      }).catch((error) => {

                          console.log("Error getting document:", error);
                      });


              })
          }).catch(function(err) {
              console.log("Error= " + err);
          })
      $$("#bibpghome").on('click', fnAhome);
      $$("#bibpgtendencias").on('click', fnAtendencias);
      $$(".acomprar").on('click', function() { fnComprar(this.id) });
  })
  $$(document).on('page:init', '.page[data-name="comprafinal"]', function(e) {
      $$(".back").on('click', fnActChango);
      if (localStorage.length == 0) {
          $$('#btncomprafinal').prop('disabled', true)
          $$('#btncomprafinal').removeClass("color-green").addClass("color-gray");
          $$("#compra").removeClass("visible").addClass("oculto");
          $$("#compravacia").removeClass("oculto").addClass("visible");
          $$("#imgcompravacia").on('click', fnAhome);
      } else {
          $$("#compravacia").removeClass("visible").addClass("oculto");
          $$("#compra").removeClass("oculto").addClass("visible");
          $$('#btncomprafinal').prop('disabled', false)
          $$('#btncomprafinal').removeClass("color-gray").addClass("color-green");
          Object.keys(localStorage).forEach(function(key) {
              //console.log(key);
              //console.log(localStorage.getItem(key));
              producto = storage.getItem(key);
              //console.log(key);
              //console.log(producto);
              producto = JSON.parse(producto);
              $$("#productosacomprar").append(`

                    <li>
                        <div class="item-content">
                            <div class="item-media"><span class="cruzimg badge color-red"><i id="` + key + `" onclick="fnborrarCompra(this.id)" class="f7-icons">xmark_circle_fill</i></span><img src="` + producto.tapa + `" width="80" /></div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">` + producto.autor + `</div>
                                    <div class="item-after">$ ` + producto.precio + `</div>
                                </div>
                                <p>` + producto.titulo + `</p>
                                <div class="item-text">` + producto.formato + `</div>
                            </div>
                        </div>
                    </li>
                                            `);
          });
      }

      $$("#btncomprafinal").on('click', fnEnviarCompra);
      $$("#comprashechas").on('click', fnHistorialdeCompras);
  })
  $$(document).on('page:init', '.page[data-name="miscompras"]', function(e) {

      comprasdeUsuario = comprasRef.where("usuario", "==", emailactual);
      comprasdeUsuario.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  //console.log("entré al DOC de MIS COMPRAS - ARRAY = "+JSON.stringify(doc.data()));
                  $$("#historialdecompras").append(`
                                      <div class="card card-outline">
                                          <div class="card-header title">Compra realizada el ` + doc.data().fecha + `</div>
                                          <div class="card-content card-content-padding">
                                            <div class="list media-list">
                                              <ul id="` + doc.id + `">
                                              </ul>
                                            </div>
                                          </div>
                                      </div>
                                      `);
                  //libros=JSON.parse(doc.data().libros);
                  //console.log(libros);
                  for (i = 0; i < doc.data().libros.length; i++) {
                      console.log(doc.data().libros[i]);
                      switch (doc.data().libros[i].formato) {
                          case "e-book":
                              foto = "img/iconebook.png";
                              break
                          case "Audiolibro":
                              foto = "img/iconaudio.png";
                              break
                          case "Libro impreso":
                              foto = "img/iconlibro.png";
                              break
                          default:
                      }

                      $$("#" + doc.id + "").append(`
                            <li>                                        
                              <div class="item-content">
                                <div class="item-media"><img src="` + foto + `" width="44" /></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                        <div class="item-title">` + doc.data().libros[i].titulo + `</div>
                                        </div>
                                        <div class="text-align-left item-subtitle">` + doc.data().libros[i].autor + `</div>
                                    </div>
                              </div>
                            </li>`);
                  }

              })
          }).catch(function(e) {
              console.log("ERROR = " + e);
          });
      $$("#pgbiblio").on('click', fnAbiblio);
      $$("#pgtendencias").on('click', fnAtendencias);
      $$("#pghome").on('click', fnAhome);
  })

  $$(document).on('page:init', '.page[data-name="tendencias"]', function(e) {
      $$("#tenpgbiblio").removeClass("activo");
      $$("#tenpghome").removeClass("activo");
      $$("#tenpgtendencias").addClass("activo");
      $$(".back").on('click', fnActChango);
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
      $$("#tenchango").on('click', fnCompraFinal);


      $$(".back").on('click', fnActChango);
      listasRef.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  $$("#cuerpotendencias").append(`
                    <div id="` + doc.id + `"class="cardtend margin-half" onclick="fnListaCompleta(this.id)">
                      <div class="card-content card-content-padding"><h2>Lo más leído en </h2><h1 class="color-green">` + doc.id + `</h1></div>
                    </div>
                `);

              })
          }).catch(function(e) {
              console.log(e);
          });
      $$("#tenpgbiblio").on('click', fnAbiblio);
      $$("#tenpghome").on('click', fnAhome);

  })
  $$(document).on('page:init', '.page[data-name="listas"]', function(e) {
      console.log("listas");
      $$("#lomasleidoen").html("Lo más leído en " + listaAver);
      $$(".back").on('click', fnActChango);
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
      $$("#listchango").on('click', fnCompraFinal);
      librosRef.doc(l1).get()
          .then(function(doc) {
              console.log(doc.id);
              $$("#imgl1").attr("src", doc.data().tapa);
              $$("#h3l1").html(doc.data().titulo + " - " + doc.data().autor);
          }).catch(function(A) {
              console.log(A);
          });
      librosRef.doc(l2).get()
          .then(function(doc) {
              console.log(doc.id);
              $$("#imgl2").attr("src", doc.data().tapa);
              $$("#h3l2").html(doc.data().titulo + " - " + doc.data().autor);
          }).catch(function(A) {
              console.log(A);
          });
      librosRef.doc(l3).get()
          .then(function(doc) {
              console.log(doc.id);
              $$("#imgl3").attr("src", doc.data().tapa);
              $$("#h3l3").html(doc.data().titulo + " - " + doc.data().autor);
          }).catch(function(A) {
              console.log(A);
          });
      librosRef.doc(l4).get()
          .then(function(doc) {
              console.log(doc.id);
              $$("#imgl4").attr("src", doc.data().tapa);
              $$("#h3l4").html(doc.data().titulo + " - " + doc.data().autor);
          }).catch(function(A) {
              console.log(A);
          });
      librosRef.doc(l5).get()
          .then(function(doc) {
              console.log(doc.id);
              $$("#imgl5").attr("src", doc.data().tapa);
              $$("#h3l5").html(doc.data().titulo + " - " + doc.data().autor);
          }).catch(function(A) {
              console.log(A);
          });
      $$("#lispgbiblio").on('click', fnAbiblio);
      $$("#lispghome").on('click', fnAhome);
      $$("#lispgtendencias").on('click', fnAtendencias);
      $$(".acomprar").on('click', function() { fnComprar(this.id) });
      $$("#l1").on('click', function() { fnverellibro3(this.id) });
      $$("#l2").on('click', function() { fnverellibro3(this.id) });
      $$("#l3").on('click', function() { fnverellibro3(this.id) });
      $$("#l4").on('click', function() { fnverellibro3(this.id) });
      $$("#l5").on('click', function() { fnverellibro3(this.id) });
  })
  $$(document).on('page:init', '.page[data-name="final"]', function(e) {
      $$("#volverainiciar").on('click', fnAhome);
      $$("#finalverhistorial").on('click', fnHistorialdeCompras);
  })
  /*----------------------------------------------
  PÁGINAS ADMIN
  -----------------------------------------------*/
  $$(document).on('page:init', '.page[data-name="pgadmin"]', function(e) {
      $$("#holaadmin").append(" " + nombreactual);
      $$("#adminlibros").on('click', fnAsumar);
      $$("#admintend").on('click', fnAGenerarListas);
      $$("#cerrar").on('click', fnCerrar);

  })
  $$(document).on('page:init', '.page[data-name="sumalibros"]', function(e) {
      $$("#agregar").on('click', fnNuevoLibro);
      $$("#btnGaleria").on('click', fnGaleria);
      $$("#btnCamara").on('click', fnCamara);

  })
  $$(document).on('page:init', '.page[data-name="generarlistas"]', function(e) {
      listasRef.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  $$("#nombrelista").append('<option class="parapuestos" value="' + doc.id + '">' + doc.id + '</option>');
                  $$("#listaAborrar").append('<option value="' + doc.id + '">' + doc.id + '</option>');
                  console.log(doc.id);


              })
          });
      librosRef.get()
          .then(function(querySnapshot2) {
              querySnapshot2.forEach(function(doc2) {
                  $$(".puestos").append('<option value="' + doc2.id + '">' + doc2.data().titulo + ' - ' + doc2.data().autor + '</option>');
              })
          });

      $$("#actualizarlista").on('click', fnActLista);
      $$("#agregarlista").on('click', fnNuevaLista);
      $$("#nombrelista").on('change', function() { fnPuestos(this.value) });
      $$("#borrarlistasheet").on('click', fnSheetBorrar);

  })

  //FUNCIONES
  function fninicio() {
      emailinicio = $$("#ingemail").val();
      claveinicio = $$("#ingclave").val();
      firebase.auth().signInWithEmailAndPassword(emailinicio, claveinicio)
          .then((userCredential) => {
              // Signed in
              //var user = userCredential.user;



              var docRef = userRef.doc(emailinicio);

              docRef.get().then((doc) => {
                  if (doc.exists) {
                      //console.log("Document data:", doc.data());
                      emailactual = doc.id;
                      nombreactual = doc.data().nombre;
                      apellidoactual = doc.data().apellido;
                      perfil = doc.data().tipodeuser;
                      console.log(perfil);
                      switch (perfil) {
                          case "lector":
                              mainView.router.navigate('/principal/');
                              break
                          case "escritor":
                              mainView.router.navigate('/paraescritor/');
                              break
                          case "admin":
                              mainView.router.navigate('/pgadmin/');
                              break
                          default:
                      }
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch((error) => {
                  console.log("Error getting document:", error);
              });

          })
          .catch((error) => {
              console.log(error)
              var errorCode = error.code;
              var errorMessage = error.message;
              //console.log(errorCode);
              switch (errorCode) {
                  case "auth/user-not-found":
                      app.dialog.alert('Email no registrado', 'BuscateUnLibro')
                      break
                  case "auth/wrong-password":
                      app.dialog.alert('Contraseña incorrecta', 'BuscateUnLibro')
                      break
                  default:
              }
          });

  }

  function fnregistrarse() {
      mainView.router.navigate('/registro/');
  }
  /*--
--*/
  function fntodos() {
      mainView.router.navigate('/todos/');
  }


  function fnAbiblio() {
      mainView.router.navigate('/biblioteca/');
  }

  function fnAhome() {
      mainView.router.navigate('/principal/');
      p1 = "";
      p2 = "";
      p3 = "";
      p4 = "";
      animo = "";
  }

  function fnAtendencias() {
      mainView.router.navigate('/tendencias/');
  }

  function fnCerrar() {

      firebase.auth().signOut().then(() => {
          if (perfil == "lector") {
              app.dialog.confirm('Puede que haya más libros esperándote', '¿Deseas salir?', function() {
                  mainView.router.navigate('/index/');
                  app.dialog.close();
              });
          } else {
              app.dialog.confirm('¿Segur@ que deseas salir?', 'BuscateUnLibro', function() {
                  mainView.router.navigate('/index/');
                  app.dialog.close();
              });
          }
      }).catch((error) => {
          // An error happened.
      });


  }

  function fnAindex() {
      mainView.router.navigate('/index/');
  }

  function fnregistrado() {
      nombre = $$("#nombrereg").val();
      apellido = $$("#aperereg").val();
      fechadeN = $$("#fdnreg").val();
      tipodeuser = $$("#userreg").val();
      prov = $$("#provreg").val();
      email = $$("#emailreg").val();
      clave = $$("#clavereg").val();
      if (nombre == "" || apellido == "" || prov == "") {
          console.log('Puede que haya datos incompletos')
          toastdatos = app.toast.create({
              text: "Puede que haya datos incompletos",
              closeButton: true,
          });
          toastdatos.open();

      } else {
          firebase.auth().createUserWithEmailAndPassword(email, clave)
              .then(function() {
                  console.log('logueado');
                  datanuevo = {
                      nombre: nombre,
                      apellido: apellido,
                      fechadenac: fechadeN,
                      tipodeuser: tipodeuser,
                      provincia: prov,
                      email: email,

                  };

                  userRef.doc(email).set(datanuevo);
                  firebase.auth().currentUser.sendEmailVerification()
                      .then(() => {
                          app.dialog.alert('Registro Exitoso! Te hemos enviado un correo para verificar tu cuenta.', 'BuscateUnLibro', function() {
                              mainView.router.navigate('/index/');
                          });
                      })





              })
              .catch(function(error) {
                  console.error(error.code);
                  switch (error.code) {
                      case "auth/invalid-email":
                          app.dialog.alert('Puede que haya un error en el e-mail.', 'BuscateUnLibro')
                          break
                      case "auth/weak-password":
                          app.dialog.alert('La contraseña debe tener al menos 6 (seis) caracteres.', 'BuscateUnLibro')
                          break
                      case "auth/email-already-in-use":
                          app.dialog.alert('El correo electrónico ya se encuentra registrado', 'BuscateUnLibro')
                          break
                      default:
                  }


              });



      }


  }

  function fnbusP() {
      mainView.router.navigate('/bp/');
  }
  /*---------------------------------------------------------
  FUNCIONES BUSQUEDA PERSONAL
  ---------------------------------------------------------*/

  function fncaras(c) {
      cara = c.slice(-1);
      //console.log(cara);
      for (var i = 1; i <= 4; i++) {
          $$("#cara" + i).attr('src', 'img/cara' + i + '.png');
          if (cara == i) {
              $$("#cara" + i).attr('src', 'img/cara' + i + '_t.png')
              animo = parseInt(cara);
          }
      }
      //console.log("ANIMO: "+animo);

  }

  function fnpreg1(a) {
      p1 = a;
      if (a == "e") {
          $$("#e").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#i").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");

      } else {
          $$("#i").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#e").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");
      }
      console.log(p1);
  }

  function fnpreg2(a) {
      p2 = a;
      if (a == "n") {
          $$("#n").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#s").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");

      } else {
          $$("#s").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#n").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");

      }
      console.log(p2);

  }

  function fnpreg3(a) {
      p3 = a;
      if (a == "t") {
          $$("#t").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#f").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");
      } else {
          $$("#f").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#t").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");
      }
      console.log(p3);
  }

  function fnpreg4(a) {
      p4 = a;
      if (a == "p") {
          $$("#p").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#j").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");
      } else {
          $$("#j").removeClass("button-outline").addClass("color-green").addClass("letra").addClass("btnactivo");
          $$("#p").removeClass("color-green").removeClass("letra").addClass("button-outline").removeClass("btnactivo");
      }
      console.log(p4);
  }

  function fnbusLibro() {
      if (animo == "" || p1 == "" || p2 == "" || p3 == "" || p4 == "") {
          toastBuscar = app.toast.create({
              text: 'Puede que haya alguna pregunta sin responder',
              position: 'center',
              closeTimeout: 2000,
          });
          toastBuscar.open();

      } else {
          persona = p1 + p2 + p3 + p4;
          console.log(persona + "  animo: " + animo);
          if (p1 == "e") {
              console.log("E");
              query = librosRef.where("CantPaginas", "<=", "200");
              switch (persona) {
                  case "enfj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "terror").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          default:
                      }
                      break
                  case "enfp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          default:
                      }
                      break
                  case "estj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          default:
                      }
                      break
                  case "esfj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          default:
                      }
                      break
                  case "entj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          default:
                      }
                      break
                  case "entp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          default:
                      }
                      break
                  case "estp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "terror").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          default:
                      }
                      break
                  case "esfp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          default:
                      }
                      break
                  default:
              }
          } else {
              console.log("I");
              var query = librosRef.where("CantPaginas", ">=", "200");
              switch (persona) {
                  case "infj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "terror").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          default:
                      }
                      break
                  case "infp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          default:
                      }
                      break
                  case "istj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          default:
                      }
                      break
                  case "isfj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          default:
                      }
                      break
                  case "intj":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          default:
                      }
                      break
                  case "intp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          default:
                      }
                      break
                  case "istp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "suspenso").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "realista").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "filosofia").limit(1);
                              break
                          default:
                      }
                      break
                  case "isfp":
                      switch (animo) {
                          case 1:
                              libroencontrado = query.where("genero", "==", "realismomagico").limit(1);
                              break
                          case 2:
                              libroencontrado = query.where("genero", "==", "aventura").limit(1);
                              break
                          case 3:
                              libroencontrado = query.where("genero", "==", "romantico").limit(1);
                              break
                          case 4:
                              libroencontrado = query.where("genero", "==", "ensayo").limit(1);
                              break
                          default:
                      }
                      break
                  default:
              }
          }
          //console.log(JSON.stringify(libroencontrado));
          mainView.router.navigate('/libro/');
      }
  }

  /*--------------------------------------------------
  FUNCIONES DE libro.html 
  ---------------------------------------------------*/

  function fnaMiBiblio() { //boton agregar a biblioteca
      var f = new Date();
      fechadehoy = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
      Aguardar = {
          codigodelibro: codAguardar,
          usuario: emailactual,
          fecha: fechadehoy,
      }
      console.log("codigo: " + codAguardar + " USER: " + emailactual + "  fecha: " + fechadehoy + "// VARIABLE F= " + f);
      bibliotecasRef.add(Aguardar)
          .then(function(doc) {
              toastNuevolibro = app.toast.create({
                  text: 'Genial! Ese libro te esperará para cuando lo quieras leer!',
                  icon: '<i class="f7-icons">lightbulb</i>',
                  position: 'center',
                  closeTimeout: 2500,
              });
              toastNuevolibro.open();
          })
          .catch(function(error) {
              console.log("Error: " + error);
          });
  }

  /*---------------------------------------------------
  FUNCIONES biblioteca.html
  ----------------------------------------------------*/
  function fnborrarloguardado(a) {
      console.log("ID a borrar = " + a);
      bibliotecasRef.doc(a).get()
          .then(function(doc) {
              if (doc.exists) {
                  console.log("eeuu =" + doc.data().codigodelibro);
                  librosRef.doc(doc.data().codigodelibro).get()
                      .then(function(doc2) {
                          if (doc2.exists) {
                              app.dialog.confirm('¿Segur@ que querés borrar <strong>' + doc2.data().titulo + '</strong> ?', 'BuscateUnLibro', function() {
                                  bibliotecasRef.doc(a).delete()
                                      .then(function() {
                                          toastNuevolibro = app.toast.create({
                                              text: 'Borrado',
                                              icon: '<i class="f7-icons">checkmark_alt_circle</i>',
                                              position: 'center',
                                              closeTimeout: 1500,
                                          });
                                          toastNuevolibro.open();
                                          console.log("Entró al OK borrar libro");
                                          mainView.router.refreshPage();
                                      }).catch(function() {
                                          console.log("Error: " + error)
                                      });

                              })
                          } else {
                              console.log("DOC2 no existe");
                          }
                      }).catch(function(err) {
                          console.log("Algo pasó = " + err);
                      });
              } else {
                  console.log("No existe");
              }
          }).catch(function(erorrgeneral) {
              console.log("ALGO PASO EN EL GET GRAL = " + erorrgeneral);
          });

  }

  function fnverellibro(b) {
      console.log("Libro a ver = " + b);
      librosRef.doc(b).get()
          .then(function(docl) {
              if (docl.exists) {
                  codAguardar = docl.id;
                  precioE = docl.data().precioebook;
                  precioA = docl.data().precioaudio;
                  precioP = docl.data().preciopapel;
                  tapa = docl.data().tapa;
                  tit = docl.data().titulo;
                  aut = docl.data().autor;
                  $$("#precioebookbib").html("$ " + docl.data().precioebook);
                  $$("#precioaudiobib").html("$ " + docl.data().precioaudio);
                  $$("#preciopapelbib").html("$ " + docl.data().preciopapel);
                  var dynamicPopup = app.popup.create({
                      content: `
                          <div class="block popup">
                            <div class="block display-flex flex-direction-row justify-content-space-between">
                              <h5>` + docl.data().titulo + ` - ` + docl.data().autor + `</h5>
                              <p><a href="#" class="link popup-close">Volver</a></p>
                            </div>
                            <div>
                            <p class="block popsinopsis margin-half">` + docl.data().sinopsis + `</p>
                            </div>
                        <button class="comprar2 button button-fill color-orange sheet-open" data-sheet=".my-sheetbib">Comprar</button>
                          </div>
                        `,
                      // Events
                      on: {
                          open: function(popup) {
                              console.log('Popup open');
                          },
                          opened: function(popup) {
                              console.log('Popup opened');
                          },
                      }
                  });
                  // Events also can be assigned on instance later
                  dynamicPopup.on('close', function(popup) {
                      console.log('Popup close');
                  });
                  dynamicPopup.on('closed', function(popup) {
                      console.log('Popup closed');
                  });

                  //Open dynamic popup
                  dynamicPopup.open();
              } else {
                  console.log("Ver Mas no existe Libro");
              }
          });

  }

  function fnverellibro2(c) {
      console.log("Libro a ver = " + c);
      librosRef.doc(c).get()
          .then(function(docl) {
              if (docl.exists) {
                  codAguardar = docl.id;
                  precioE = docl.data().precioebook;
                  precioA = docl.data().precioaudio;
                  precioP = docl.data().preciopapel;
                  tapa = docl.data().tapa;
                  tit = docl.data().titulo;
                  aut = docl.data().autor;
                  $$("#precioebookTod").html("$ " + docl.data().precioebook);
                  $$("#precioaudioTod").html("$ " + docl.data().precioaudio);
                  $$("#preciopapelTod").html("$ " + docl.data().preciopapel);
                  var dynamicPopup = app.popup.create({
                      content: `
                          <div class="block popup">
                            <div class="block no-margin display-flex flex-direction-row justify-content-space-between">
                              <h5>` + docl.data().titulo + ` - ` + docl.data().autor + `</h5>
                              <p><a href="#" class="link popup-close">Volver</a></p>
                            </div>
                            <div>
                            <p class="block popsinopsis margin-half">` + docl.data().sinopsis + `</p>
                            </div>
                            <div class="block">
                        <button class="button margin-vertical button-fill color-blue" onclick="fnaMiBiblio()">Agregar a Mi Biblioteca</button>
                        <button class="button button-fill color-orange sheet-open" data-sheet=".my-sheetTod">Comprar</button>
                            </div>
                          </div>
                        `,
                      // Events
                      on: {
                          open: function(popup) {
                              console.log('Popup open');
                          },
                          opened: function(popup) {
                              console.log('Popup opened');
                          },
                      }
                  });
                  // Events also can be assigned on instance later
                  dynamicPopup.on('close', function(popup) {
                      console.log('Popup close');
                  });
                  dynamicPopup.on('closed', function(popup) {
                      console.log('Popup closed');
                  });

                  //Open dynamic popup
                  dynamicPopup.open();
              } else {
                  console.log("Ver Mas no existe Libro");
              }
          });


  }

  function fnverellibro3(c) {
      switch (c) {
          case "l1":
              var lt = l1;
              break
          case "l2":
              var lt = l2;
              break
          case "l3":
              var lt = l3;
              break
          case "l4":
              var lt = l4;
              break
          case "l5":
              var lt = l5;
              break
          default:
      }
      console.log("Libro a ver = " + lt);

      librosRef.doc(lt).get()
          .then(function(docl) {
              if (docl.exists) {
                  codAguardar = docl.id;
                  precioE = docl.data().precioebook;
                  precioA = docl.data().precioaudio;
                  precioP = docl.data().preciopapel;
                  tapa = docl.data().tapa;
                  tit = docl.data().titulo;
                  aut = docl.data().autor;
                  $$("#precioebookList").html("$ " + docl.data().precioebook);
                  $$("#precioaudioList").html("$ " + docl.data().precioaudio);
                  $$("#preciopapelList").html("$ " + docl.data().preciopapel);
                  var dynamicPopup = app.popup.create({
                      content: `
                          <div class="block popup">
                            <div class="block no-margin display-flex flex-direction-row justify-content-space-between">
                              <h5>` + docl.data().titulo + ` - ` + docl.data().autor + `</h5>
                              <p><a href="#" class="link popup-close">Volver</a></p>
                            </div>
                            <div>
                            <p class="block popsinopsis margin-half">` + docl.data().sinopsis + `</p>
                            </div>
                            <div class="block">
                        <button class="button margin-vertical button-fill color-blue" onclick="fnaMiBiblio()">Agregar a Mi Biblioteca</button>
                        <button class="button button-fill color-orange sheet-open" data-sheet=".my-sheetList">Comprar</button>
                            </div>
                          </div>
                        `,
                      // Events
                      on: {
                          open: function(popup) {
                              console.log('Popup open');
                          },
                          opened: function(popup) {
                              console.log('Popup opened');
                          },
                      }
                  });
                  // Events also can be assigned on instance later
                  dynamicPopup.on('close', function(popup) {
                      console.log('Popup close');
                  });
                  dynamicPopup.on('closed', function(popup) {
                      console.log('Popup closed');
                  });

                  //Open dynamic popup
                  dynamicPopup.open();
              } else {
                  console.log("Ver Mas no existe Libro");
              }
          });
  }
  /*---------------------------------
  FUNCIONES COMPRAR
  ----------------------------------*/
  function fnActChango() {
      if (localStorage.length == 0) {
          $$(".badchango").addClass("oculto");
      } else {
          $$(".badchango").html(localStorage.length);
      };
  }

  function fnComprar(a) {
      seleccion = a.slice(-1);
      switch (seleccion) {
          case "e": //SI ES EBOOK
              codlocal = codAguardar + "E";
              variabledecompra = {
                  cod: codAguardar,
                  precio: precioE,
                  formato: "e-book",
                  tapa: tapa,
                  titulo: tit,
                  autor: aut,
              };
              $$(".badchango").removeClass("oculto");
              console.log(JSON.stringify(variabledecompra));
              aguardarcompra = JSON.stringify(variabledecompra);
              storage.setItem(codlocal, aguardarcompra);
              break
          case "a": //SI ES AUDIOLIBRO
              codlocal = codAguardar + "A";
              variabledecompra = {
                  cod: codAguardar,
                  precio: precioA,
                  formato: "Audiolibro",
                  tapa: tapa,
                  titulo: tit,
                  autor: aut,
              };
              $$(".badchango").removeClass("oculto");
              console.log(JSON.stringify(variabledecompra));
              aguardarcompra = JSON.stringify(variabledecompra);
              storage.setItem(codlocal, aguardarcompra);
              break
          case "p": //SI ES LIBRO DE PAPEL
              codlocal = codAguardar + "P";
              variabledecompra = {
                  cod: codAguardar,
                  precio: precioP,
                  formato: "Libro impreso",
                  tapa: tapa,
                  titulo: tit,
                  autor: aut,
              };
              $$(".badchango").removeClass("oculto");
              console.log(JSON.stringify(variabledecompra));
              aguardarcompra = JSON.stringify(variabledecompra);
              storage.setItem(codlocal, aguardarcompra);
              break
          default:
      }
      $$(".badchango").html(localStorage.length);
  }

  function fnCompraFinal() {
      mainView.router.navigate('/comprafinal/');
  }

  function fnborrarCompra(ab) {
      //aborrar=ab.slice(-1);
      console.log(ab);
      aborrar = storage.getItem(ab);
      aborrar = JSON.parse(aborrar);
      app.dialog.confirm('¿Segur@ que quieres borrar <strong>' + aborrar.titulo + '</strong> ?', 'Borrar Compra', function() {
          storage.removeItem(ab);
          mainView.router.refreshPage();

      })
  }

  function fnEnviarCompra() {
      var f = new Date();
      fechadehoy = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
      Object.keys(localStorage).forEach(function(key) {
          //console.log(key);
          //console.log(localStorage.getItem(key));
          libroacomprar = storage.getItem(key);
          //console.log(key);
          //console.log(libroacomprar);
          libroacomprar = JSON.parse(libroacomprar);
          prod = {
              "codigo": libroacomprar.cod,
              "formato": libroacomprar.formato,
              "titulo": libroacomprar.titulo,
              "autor": libroacomprar.autor,
          };
          //console.log(prod);
          //prod=JSON.parse(prod); LO COMENTO XQ YA ESTA PARSEADO
          //p = JSON.stringify(prod); NO ES NECESARIO PASARLO A STRING PARA GUARDARLO
          productoscomprados.push(prod);



      });
      //console.log(productoscomprados);
      compra = {
          "fecha": fechadehoy,
          "usuario": emailactual,
          "libros": productoscomprados,
      };
      console.log(JSON.stringify(compra));
      comprasRef.add(compra)
          .then(function(docRef) { // .then((docRef) => {
              console.log("OK! Con el ID: " + docRef.id);
              storage.clear();
              mainView.router.navigate('/final/');
              toastFinal = app.toast.create({
                  text: '¡Gracias!',
                  position: 'center',
                  closeTimeout: 2000,
              });
              toastFinal.open();
          })
          .catch(function(error) { // .catch((error) => {
              console.log("Error: " + error);

          });
  }

  function fnHistorialdeCompras() {
      mainView.router.navigate('/miscompras/');
  }
  /*---------------------------------
  FUNCIONES TENDENCIAXS
  ---------------------------------*/
  function fnListaCompleta(a) {
      listaAver = a;
      listasRef.doc(a).get()
          .then(function(doc) {
              l1 = doc.data().p1;
              l2 = doc.data().p2;
              l3 = doc.data().p3;
              l4 = doc.data().p4;
              l5 = doc.data().p5;
              console.log(l1);
              console.log(l2);
              console.log(l3);
              console.log(l4);
              console.log(l5);
              console.log("aaaaaaaaaaaaa");
              mainView.router.navigate('/listas/');

          }).catch(function(eee) {
              console.log(eee);
          });
  }

  /*--------------------------------------------------
  FUNCIONES ADMIN
  --------------------------------------------------*/
  function fnAsumar() {
      mainView.router.navigate('/sumalibros/');
  }

  function fnApgadmin() {
      mainView.router.navigate('/pgadmin/')
  }

  function fnCamara() {
      // FOTO DESDE CAMARA
      navigator.camera.getPicture(onSuccessCamara, onErrorCamara, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA
      });
  }


  function fnGaleria() {
      navigator.camera.getPicture(onSuccessCamara, onErrorCamara, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      });

  }

  function onSuccessCamara(imageData) {
      $$("#foto").attr("src", imageData);

      getFileObject(imageData, function(fileObject) { //fn1
          var storageRef = firebase.storage().ref();
          var uploadTask = storageRef.child('tapas/' + $$("#nuevocodigo").val() + '.jpg').put(fileObject); //recibe un archivo blob y lo sube al cloud storage
          uploadTask.on('state_changed', function(snapshot) { //promesa que administra o supervisa el estado de la carga cuando cambie el estado de su snapshot, mostrando el estado del snapsht,
              console.log(snapshot); //
          }, function(error) { //funcion de error
              console.log(error);
              app.dialog.alert(error)
          }, function() { //funcion que si todo sale bien:
              uploadTask.snapshot.ref.getDownloadURL().then( //obtengo el url de descarga
                  function(downloadURL) {
                      console.log('el archivo esta disponible en', downloadURL); //Muestro el link
                      tapanueva = downloadURL;
                      app.dialog.alert('Imagen subida')
                      //aca abajo puedo elegir que hacer con mi imagen que ya esta cargada y la puedo manejar a partir de mi download link

                  });
          });
      });


  }
  // lo de abajo se ejecuta en la funcion on succes (es necesario ejecutar solo getFileFbject) dentro del succes
  //toma un blob y un nombre y cambia fecha y nombre, luego devuelve el blob
  var blobToFile = function(blob, name) {
      blob.lastModifiedDate = new Date() //modifica la ultima fecha del blob 
      blob.name = name //modifica el nombre del blob
      return blob
  }
  //A partir de la ubicacion de nuestro file y una funcion (cb) ejecuta getfileBlob (funcion especificada abajo)
  function getFileObject(filePathOrUrl, cb) {
      getFileBlob(filePathOrUrl, function(blob) { //fn2      //llama a la funcion getFileBlob con el url introducido y una funcion que: 
          cb(blobToFile(blob, '' + $$("#nuevocodigo").val() + '.jpg')); //ejecuta nuestro cb (callback) sobre el blob con nombre y fecha cambiada (el nombre sera 'test.jpg')
      });
  };
  //obtiene un file desde el servidor utilizando un url,  lo transfrma a tipo blob y ejecuta una funcion (cb) para luego enviarlo al servidor
  function getFileBlob(url, cb) {
      var xhr = new XMLHttpRequest() //creo una nueva instancia de XMLHttpRequest
      xhr.open('GET', url) //inicializo una peticion asincronica del url al server
      xhr.responseType = "blob" // declaro que el valor del tipo de respuesta es blob (para luego usarlo mas adelante)
      xhr.addEventListener('load', () => { //Le agrego un event listener que cuando cargue  se va a ejecutar 
          cb(xhr.response) //mi cb (callback) con la respuesta del servidor
      })
      xhr.send() //Envia la peticion nuevamente. 
  }
  //Se ejecuta la funcion getfileObject con nuestra imagen y el cb que: 
  /*orden de funcionamiento:
  1. getFileObject(imageData, fn1)    || inserto un url
  2. getFileBlob (url, fn2)           || realizo desde ese url una peticion, me devuelve un blob
  3. fn2                              || ejecuto la funcion 1 con el resultado de:
  4. bloblToFile(blob, test.jpg)      || desde mi blob obtengo un file
  5. fn1                


  /* function onSuccessCamara(imageURI) {
        $$("#foto").attr("src", imageURI);
        // RESTA QUE ESTA FOTO SUBA AL STORAGE…. O HACER OTRA COSA...
        console.log(imageURI)
        var storageRef = firebase.storage().ref();
        var getFileBlob = function(url, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.addEventListener('load', function() {
                cb(xhr.response);
            });
            xhr.send();
        };

        var blobToFile = function(blob, name) {
            blob.lastModifiedDate = new Date();
            blob.name = name;
            return blob;
        };

        var getFileObject = function(filePathOrUrl, cb) {
            getFileBlob(filePathOrUrl, function(blob) {
                cb(blobToFile(blob, 'test.jpg'));
            });
        };

        getFileObject(imageData, function(fileObject) {
            var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

            uploadTask.on('state_changed', function(snapshot) {
                console.log(snapshot);
            }, function(error) {
                console.log(error);
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                // handle image here
            });
        });

    }*/




  function onErrorCamara() {
      console.log('error de camara');
  }


  function fnNuevoLibro() {
      codigo = $$("#nuevocodigo").val();
      titulo = $$("#nuevotitulo").val();
      autor = $$("#nuevoautor").val();
      anio = $$("#nuevoanio").val();
      genero = $$("#nuevogenero").val();
      paginas = $$("#nuevopaginas").val();
      sinopsis = $$("#nuevasinopsis").val();
      precioebook = $$("#pebook").val();
      precioaudio = $$("#paudio").val();
      preciopapel = $$("#ppapel").val();


      if (codigo == "" || titulo == "" || autor == "" || anio == "" || paginas == "" || sinopsis == "" || precioebook == "" || precioaudio == "" || preciopapel == "") {

          toastlibronuevo = app.toast.create({
              text: "Puede que haya datos incompletos",
              closeButton: true,
          });
          toastlibronuevo.open();
      } else {
          datalibro = {
              titulo: titulo,
              autor: autor,
              fecha: anio,
              genero: genero,
              CantPaginas: paginas,
              sinopsis: sinopsis,
              precioebook: precioebook,
              precioaudio: precioaudio,
              preciopapel: preciopapel,
              tapa: tapanueva,
          }

          librosRef.doc(codigo).set(datalibro);
          app.dialog.confirm('¿Deseas cargar otro libro?', 'Carga Exitosa!', function() {
              $$("#nuevocodigo").val("");
              $$("#nuevotitulo").val("");
              $$("#nuevoautor").val("");
              $$("#nuevoanio").val("");
              $$("#nuevopaginas").val("");
              $$("#nuevourl").val("");
              $$("#nuevasinopsis").val("");
              $$("#pebook").val("");
              $$("#paudio").val("");
              $$("#ppapel").val("");
              $$("#foto").attr('src', 'img/admin.png');
              console.log("Entró al OK")
          }, function() {
              mainView.router.navigate('/pgadmin/');
              codigo = "";
              titulo = "";
              autor = "";
              anio = "";
              paginas = "";
              urldecompra = "";
              sinopsis = "";
              precioebook = "";
              precioaudio = "";
              preciopapel = "";
              console.log("Entró al CANCEL")
          })
      }
  }

  function fnAGenerarListas() {
      mainView.router.navigate('/generarlistas/');
  }

  function fnPuestos(a) {
      //console.log("HOOOLAAA");
      //console.log(a);
      selList = a;
      //console.log("SELECT LIST : "+selList);
      if (selList != "") {
          var doclistRef = listasRef.doc(selList);

          doclistRef.get().then((doc) => {
              if (doc.exists) {
                  console.log(doc);
                  $$("#puesto1").val(doc.data().p1)
                  $$("#puesto2").val(doc.data().p2)
                  $$("#puesto3").val(doc.data().p3)
                  $$("#puesto4").val(doc.data().p4)
                  $$("#puesto5").val(doc.data().p5)
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
      }

  }

  function fnNuevaLista() {
      nueva = $$("#nuevalista").val();
      puestosnueva = {
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5: "",
      }
      if (nueva != "") {
          listasRef.doc(nueva).set(puestosnueva)
              .then(function() {
                  console.log("ENtró a THEN");
                  toastNueva = app.toast.create({
                      text: 'Lista Creada',
                      position: 'center',
                      closeTimeout: 2000,
                  });
                  toastNueva.open();
                  mainView.router.refreshPage();
              }).catch(function(error) {
                  console.log("ERROR :" + error);
              });

      } else {
          toastlista = app.toast.create({
              text: "Falta el título de la lista",
              closeButton: true,
          });
          toastlista.open();
      }

  }

  function fnActLista() {
      lista = $$("#nombrelista").val();
      puesto1 = $$("#puesto1").val();
      puesto2 = $$("#puesto2").val();
      puesto3 = $$("#puesto3").val();
      puesto4 = $$("#puesto4").val();
      puesto5 = $$("#puesto5").val();

      if (puesto1 == "" || puesto2 == "" || puesto3 == "" || puesto4 == "" || puesto5 == "") {
          toastpuestos = app.toast.create({
              text: 'Puede que haya algún puesto vacío',
              position: 'center',
              closeTimeout: 2000,
          });
          toastpuestos.open();
      } else {
          listasRef.doc(lista).update({
                  p1: puesto1,
                  p2: puesto2,
                  p3: puesto3,
                  p4: puesto4,
                  p5: puesto5,
              })
              .then(function() {
                  app.dialog.alert('Lista Actualizada', 'BuscateUnLibro');
                  $$("#puesto1").val("");
                  $$("#puesto2").val("");
                  $$("#puesto3").val("");
                  $$("#puesto4").val("");
                  $$("#puesto5").val("");
                  mainView.router.refreshPage();
              }).catch(function(error) {
                  console.log("Error: " + error);
              });
      }
  }

  /*function fnAborrarLista() {
  listasRef.get()
  .then(function(querySnapshot){
      querySnapshot.forEach(function(b){
          
          console.log("borrar "+b.id);
      });
  });        
  }*/
  function fnSheetBorrar() {
      aborrar = $$("#listaAborrar").val();
      if (aborrar != "") {
          app.dialog.confirm('¿Segur@ que quieres borrar <strong>' + aborrar + '</strong> ?', 'Borrar Lista', function() {
              listasRef.doc(aborrar).delete()
                  .then(function() {
                      app.dialog.alert('Lista <strong>' + aborrar + '</strong> borrada con éxito', 'BuscateUnLibro');
                      console.log("Entró al OK borrar");
                      mainView.router.refreshPage();
                  }).catch(function() {
                      console.log("Error: " + error)
                  });

          })
      } else {
          toastBorrar = app.toast.create({
              text: 'No has sellecionado ninguna lista',
              position: 'center',
              closeTimeout: 2000,
          });
          toastBorrar.open();
      }
  }












  function fnrecuperarclave() {
      app.dialog.prompt('Escribe tu correo electrónico', "BuscateUnLibro", function(email) {
          firebase.auth().sendPasswordResetEmail(email)
              .then(() => {
                  app.dialog.alert('Te enviamos un correo para recuperar tu contraseña');
              })
              .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorMessage);
                  switch (errorMessage) {
                      case "The email address is badly formatted.":
                          toastError1 = app.toast.create({
                              text: "Lo ingresado no es un e-mail",
                              closeButton: true,
                          });
                          toastError1.open();
                          break
                      case "There is no user record corresponding to this identifier. The user may have been deleted.":
                          toastError2 = app.toast.create({
                              text: "El e-mail ingresado no se encuentra registrado o verificado.",
                              closeButton: true,
                          });
                          toastError2.open();
                          break
                          default:
                  }
              });

      });
  }