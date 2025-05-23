// const url = "https://apinodetest-e45k.onrender.com/products";
/*=============================================
Área de arrastre de imágenes
=============================================*/
if ($('#columnasSlide').html() == 0) {
	$('#columnasSlide').css({ 'height': '100px' })
} else {
	$("#columnasSlide").css({ "height": "auto" });

}
/*=============================================
Subir imagen
=============================================*/
$("#columnasSlide").on("dragover", function (e) {
	e.preventDefault();
	e.stopPropagation();
	$("#columnasSlide").css({ "background": "url(images/pattern.jpg)" })
	console.log()
})
/*=====  Subir Imagen  ======*/
/*=============================================
Soltar Imagen
=============================================*/
$("#columnasSlide").on("drop", function (e) {

	e.preventDefault();
	e.stopPropagation();

	$("#columnasSlide").css({ "background": "white" })

	var archivo = e.originalEvent.dataTransfer.files;
	var imagen = archivo[0];

	// Validar tamaño de la imagen
	var imagenSize = imagen.size;

	if (Number(imagenSize) > 2000000) {

		$("#columnasSlide").before('<div class="alert alert-warning alerta text-center">El archivo excede el peso permitido, 200kb</div>')

	}

	else {

		$(".alerta").remove();

	}
	// Validar tipo de la imagen
	var imagenType = imagen.type;

	if (imagenType == "image/jpeg" || imagenType == "image/png") {

		$(".alerta").remove();

	} else {

		$("#columnasSlide").before('<div class="alert alert-warning alerta text-center">El archivo debe ser formato JPG o PNG</div>')

	}
	//Subir imagen al servidor
	if (Number(imagenSize) < 2000000 && imagenType == "image/jpeg" || imagenType == "image/png") {

		var datos = new FormData();
		datos.append("name", imagen.name);
		datos.append("description", "slide");
		datos.append("price", 0);
		datos.append("image", imagen);

		$.ajax({
			url: "https://apinodetest-e45k.onrender.com/products",
			method: "POST",
			data: datos,
			cache: false,
			contentType: false,
			processData: false,
			dataType: "json",
			beforeSend: function () {

				$("#columnasSlide").before('<img src="images/status.gif" id="status">');

			},
			success: function (respuesta) {

				$("#status").remove();

				if (respuesta == 0) {

					$("#columnasSlide").before('<div class="alert alert-warning alerta text-center">La imagen es inferior a 1600px * 600px</div>')

				}

				else {

					$("#columnasSlide").css({ "height": "auto" });

					// Refresh the image list from the database to keep consistency
					getImgSlide();

					$("#ordenarTextSlide").append('<li class="bloqueSlide"><span class="fa fa-times eliminarSlide"></span><img src="' + respuesta.image.secure_url + '" alt="' + respuesta.name + '" class="handleImg" height="220" > </li>');

					swal({
						title: "¡OK!",
						text: "¡La imagen se subió correctamente!",
						type: "success",
						confirmButtonText: "Cerrar",
						closeOnConfirm: false
					},
						function (isConfirm) {
							if (isConfirm) {
								window.location = "slide";
							}
						});

				}

			}

		});

	}
})
/*=============================================
Mostrar Imagen
=============================================*/
const ruta = '#columnasSlide'
mensaje = 'Arrastra aquí tu imagen, tamaño recomendado: 1600px * 600px'
async function getImgSlide() {
	try {
		const response = await fetch("https://apinodetest-e45k.onrender.com/products");
		const products = await response.json();

		const productosDiv = document.querySelector(ruta);
		const ordenarTextDiv = document.querySelector('#ordenarTextSlide');
		productosDiv.innerHTML = ''; // Limpiar contenido previo
		ordenarTextDiv.innerHTML = ''; // Limpiar contenido previo

		products.forEach(product => {
			if (product.description === 'slide') {
				const productElement = document.createElement('li');
				productElement.classList.add('bloqueSlide');
				productElement.innerHTML = `
					<span class="fa fa-times eliminarSlide" data-id="${product._id}" style="cursor:pointer; margin-left: 5px; background-color: red; color: white; padding: 5px; border-radius: 3px;"></span>
					<img src="${product.image.secure_url}" alt="${product.name}" class="handleImg" height="220" >    
                    `;
				productosDiv.appendChild(productElement);

				const ordenarElement = document.createElement('li');
				ordenarElement.classList.add('bloqueSlide');
				ordenarElement.innerHTML = `
					<span class="fa fa-pencil editarSlide" data-id="${product._id}" style="cursor:pointer; margin-right:10px; background-color: blue; color: white; padding: 5px; border-radius: 3px;"></span>
					<span class="fa fa-times eliminarSlide" data-id="${product._id}" style="cursor:pointer; margin-left: 5px; background-color: red; color: white; padding: 5px; border-radius: 3px;"></span>
					<img src="${product.image.secure_url}" alt="${product.name}" class="handleImg" height="220" >    
                    `;
				ordenarTextDiv.appendChild(ordenarElement);
			}
		});
	} catch (error) {
		console.error('Error al obtener productos:', error);
	}
}

/*==================================================
ELIMINAR IMAGEN
===================================================*/
$("body").on('click', '.eliminarSlide', function (e) {
	e.preventDefault();
	const idSlide = $(this).data('id');
	const url = "https://apinodetest-e45k.onrender.com/products/";

	$.ajax({
		type: "DELETE",
		url: url + idSlide,
		success: function () {
			console.log("Imagen eliminada");
			// Remove the product element from the DOM
			$(e.target).closest('.bloqueSlide').remove();
		},
		error: function () {
			console.log("Error al eliminar imagen");
		}
	});
});

$("body").on('click', '.editarSlide', function(e) {
	e.preventDefault();
	const idSlide = $(this).data('id');
	const rutaImagen = $(this).find('img').attr('src');
	const name = $(this).find('img').attr('alt');
	const descripction = $(this).data('description');
	const price = $(this).data('price');
	const url = "https://apinodetest-e45k.onrender.com/products/" + idSlide;
	console.log(e)
	// For simplicity, prompt user for new name and description
	$(this).parent().html('<img src="'+rutaImagen+'" class="img-thumbnail"><input type="text" class="form-control" id="enviarTitulo" placeholder="Título" value="'+name+'"><input type="text" class="form-control" id="price" placeholder="Precio" value="'+price+'"><textarea row="5" id="enviarDescripcion" class="form-control" placeholder="Descripción">'+descripction+'</textarea><button class="btn btn-info pull-right" id="guardar'+idSlide+'" style="margin:10px">Guardar</button>');

$("#guardar"+idSlide).click(function(){

		enviarId = idSlide;

		name = $("#enviarTitulo").val();
		description = $("#enviarDescripcion").val();

		var actualizarSlide = new FormData();

		actualizarSlide.append("enviarId",enviarId);
		actualizarSlide.append("name",enviarTitulo);
		actualizarSlide.append("description",enviarDescripcion);

		$.ajax({
			url:"url"+idSlide,
			method: "PUT",
			data: actualizarSlide,
			cache: false,
			contentType: false,
			processData: false,
			dataType:"json",
			success: function(respuesta){
				
				$("#guardar"+idSlide).parent().html('<span class="fa fa-pencil editarSlide" style="background:blue"></span><span>'+respuesta["price"]+'</spand><img src="'+rutaImagen+'" style="float:left; margin-bottom:10px" width="80%"><h1>'+respuesta["name"]+'</h1><p>'+respuesta["descripction"]+'</p>');

				swal({
						title: "¡OK!",
						text: "¡Se han guardado los cambios correctamente!",
						type: "success",
						confirmButtonText: "Cerrar",
						closeOnConfirm: false
						},
						function(isConfirm){
							if (isConfirm){
								window.location = "slide";
							}
						});

			}

		});



	})
});


