


// --- LÓGICA DE VALIDACIÓN (NUEVO) ---
    function toggleAuth(type) {
        const loginForm = document.getElementById('form-login');
        const regForm = document.getElementById('form-register');
        const tabLogin = document.getElementById('tab-login');
        const tabReg = document.getElementById('tab-register');

        if(type === 'login') {
            loginForm.classList.remove('hidden');
            regForm.classList.add('hidden');
            tabLogin.className = "flex-1 py-2 text-sm font-bold rounded-lg bg-white shadow text-blue-600 transition";
            tabReg.className = "flex-1 py-2 text-sm font-bold rounded-lg text-gray-500 transition";
        } else {
            loginForm.classList.add('hidden');
            regForm.classList.remove('hidden');
            tabLogin.className = "flex-1 py-2 text-sm font-bold rounded-lg text-gray-500 transition";
            tabReg.className = "flex-1 py-2 text-sm font-bold rounded-lg bg-white shadow text-blue-600 transition";
        }
    }

    function validateRegister() {
        // 1. Obtener valores
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        const terms = document.getElementById('reg-terms').checked;
        let isValid = true;

        // 2. Resetear errores
        document.querySelectorAll('.input-field').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('visible'));

        // 3. Validar Nombre
        if(name.trim() === "") {
            showError('reg-name', 'err-name');
            isValid = false;
        }

        // 4. Validar Email
        if(!email.includes('@') || !email.includes('.')) {
            showError('reg-email', 'err-email');
            isValid = false;
        }

        // 5. Validar Password
        if(pass.length < 6) {
            showError('reg-pass', 'err-pass');
            isValid = false;
        }

        // 6. Validar Términos
        if(!terms) {
            alert("Debes aceptar los términos y condiciones.");
            isValid = false;
        }

        // 7. Si todo es válido -> Simular llamada API
        if(isValid) {
            const btn = document.getElementById('btn-reg');
            const loader = document.getElementById('loader-reg');
            const btnText = btn.querySelector('span');

            btn.disabled = true;
            btnText.style.display = 'none';
            loader.style.display = 'block';

            // Simular demora de servidor (2 segundos)
            setTimeout(() => {
                document.getElementById('user-name-display').innerText = name.split(' ')[0]; // Usar primer nombre
                router('role-select');
                // Resetear botón
                btn.disabled = false;
                btnText.style.display = 'block';
                loader.style.display = 'none';
            }, 1500);
        }
    }

    function showError(inputId, msgId) {
        document.getElementById(inputId).classList.add('error');
        document.getElementById(msgId).classList.add('visible');
    }
	
	function screenAuth(){
		screen.innerHTML=`
		<div id="screen-auth" class="screen active flex flex-col p-8 bg-white">
			<div class="mt-10 mb-8 text-center">
				<div class="inline-block p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg text-white">
					<i class="fas fa-parking text-4xl"></i>
				</div>
				<h1 class="text-2xl font-bold text-gray-900">Bienvenido a ParqueAndo</h1>
				<p class="text-gray-500 text-sm">Gestiona tu parqueo en Quito fácil y seguro.</p>
			</div>

			<div class="flex bg-gray-100 p-1 rounded-xl mb-6">
				<button id="tab-login" onclick="toggleAuth('login')" class="flex-1 py-2 text-sm font-bold rounded-lg bg-white shadow text-blue-600 transition">Ingresar</button>
				<button id="tab-register" onclick="toggleAuth('register')" class="flex-1 py-2 text-sm font-bold rounded-lg text-gray-500 transition">Registrarse</button>
			</div>

			<div id="form-register" class="hidden animate-fade-in">
				<div class="input-group">
					<input type="text" id="reg-name" class="input-field" placeholder="Nombre Completo">
					<i class="fas fa-user input-icon"></i>
					<p class="error-msg" id="err-name">Ingresa tu nombre completo</p>
				</div>
				<div class="input-group">
					<input type="email" id="reg-email" class="input-field" placeholder="Correo Electrónico">
					<i class="fas fa-envelope input-icon"></i>
					<p class="error-msg" id="err-email">Correo inválido</p>
				</div>
				<div class="input-group">
					<input type="password" id="reg-pass" class="input-field" placeholder="Crear Contraseña (min 6)">
					<i class="fas fa-lock input-icon"></i>
					<p class="error-msg" id="err-pass">La contraseña es muy corta</p>
				</div>
				<div class="flex items-start gap-2 mb-6">
					<input type="checkbox" id="reg-terms" class="mt-1 accent-blue-600">
					<label for="reg-terms" class="text-xs text-gray-500">Acepto los <span class="text-blue-600 font-bold">Términos y Condiciones</span> de ParqueAndo Quito.</label>
				</div>
				<button onclick="validateRegister()" id="btn-reg" class="btn-primary flex justify-center items-center gap-2">
					<span>Crear Cuenta</span>
					<div class="loader" id="loader-reg"></div>
				</button>
			</div>

			<div id="form-login" class="block animate-fade-in">
				<div class="input-group">
					<input type="email" class="input-field" placeholder="Correo Electrónico">
					<i class="fas fa-envelope input-icon"></i>
				</div>
				<div class="input-group">
					<input type="password" class="input-field" placeholder="Contraseña">
					<i class="fas fa-lock input-icon"></i>
				</div>
				<div class="text-right mb-6">
					<a href="#" class="text-xs text-blue-600 font-bold">¿Olvidaste tu contraseña?</a>
				</div>
				<button onclick="screenRoleSelect('role-select')" class="btn-primary">Iniciar Sesión</button>
				
				<div class="relative mt-8 mb-4">
					<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
					<div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500 text-xs">O continúa con</span></div>
				</div>
				<div class="flex gap-4 justify-center">
					<button class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><i class="fab fa-google text-red-500"></i></button>
					<button class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><i class="fab fa-facebook text-blue-600"></i></button>
				</div>
			</div>
		</div>`
		
		navbar.classList.add('hidden');
	}
	function screenRoleSelect(){
		screen.innerHTML=`
		<div id="screen-role-select" class="screen flex flex-col justify-center p-8 bg-blue-600">
			<h2 class="text-3xl font-bold text-white mb-2 text-center">Hola, <span id="user-name-display">Francisco</span></h2>
			<p class="text-blue-100 text-center mb-10">¿Qué deseas hacer hoy?</p>
			<div class="space-y-4">
				<button onclick="screenHomeDrive('driver')" class="bg-white text-blue-600 w-full py-5 rounded-2xl font-bold shadow-lg flex items-center px-6 gap-4 hover:bg-gray-50 transition">
					<div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><i class="fas fa-car"></i></div>
					<div class="text-left"><p class="text-sm text-gray-500 font-normal">Necesito estacionar</p><p class="text-lg">Buscar Parqueadero</p></div>
				</button>
				<button onclick="screenHomeOwner('owner')" class="bg-blue-800 text-white w-full py-5 rounded-2xl font-bold shadow-lg border border-blue-700 flex items-center px-6 gap-4 hover:bg-blue-700 transition">
					<div class="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center"><i class="fas fa-home"></i></div>
					<div class="text-left"><p class="text-sm text-blue-300 font-normal">Tengo un espacio</p><p class="text-lg">Alquilar mi Garaje</p></div>
				</button>
			</div>
			<button onclick="screenAuth('auth')" class="mt-8 text-white/50 text-sm text-center w-full">Cerrar Sesión</button>
		</div>`
		
		navbar.classList.add('hidden');
	}
	function screenHomeDrive(){
		screen.innerHTML=`
		<div id="screen-home-driver" class="scree transparent">
			<div class="map-bg">
				<div class="map-pin" style="top: 35%; left: 25%;" onclick="openDrawer('park1')"><i class="fas fa-dollar-sign"></i> 1.50</div>
				<div class="map-pin" style="top: 50%; left: 65%;" onclick="openDrawer('park2')"><i class="fas fa-dollar-sign"></i> 2.00</div>
			</div>
			<div class="absolute top-12 left-4 right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
				<i class="fas fa-bars text-gray-400 ml-2" onclick="screenRoleSelect('role-select')"></i>
				<input type="text" placeholder="¿A dónde vas?" class="w-full outline-none text-gray-700 font-medium">
			</div>
			<div id="drawer" class="absolute bottom-[80px] left-0 w-full bg-white rounded-t-3xl shadow-2xl p-6 transform translate-y-[120%] transition-transform z-40">
				<div id="drawer-content"></div>
			</div>
		</div>
			`
		navbar.innerHTML=navDriver
		navbar.classList.remove('hidden');
	}
	function screenHomeOwner(){
		screen.innerHTML=`
			   <div id="screen-home-owner" class="scree bg-gray-50">
				<div class="bg-white px-6 pt-12 pb-6 rounded-b-3xl shadow-sm mb-6">
					<h2 class="text-2xl font-bold text-gray-800">Panel de Control</h2>
					<div class="bg-blue-600 text-white p-6 rounded-xl mt-4 shadow-lg">
						<p class="text-blue-100 text-xs uppercase">Ganancias</p>
						<div class="text-4xl font-bold">$124.50</div>
					</div>
				</div>
				<div class="px-6 text-center mt-10">
					<i class="fas fa-tools text-gray-300 text-4xl mb-2"></i>
					<p class="text-gray-400">Funcionalidad completa en V2.0</p>
					<button onclick="screenRoleSelect('role-select')" class="mt-4 text-blue-600 font-bold text-sm">Volver al menú</button>
				</div>
			</div>
		`
		
		screen.innerHTML=`
			<div id="screen-home-owner" class="scree bg-gray-50 pb-24">
        <div class="bg-white px-6 pt-12 pb-6 rounded-b-3xl shadow-sm mb-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Hola, Francisco</h2>
                    <p class="text-sm text-gray-500">Gestor de Espacios</p>
                </div>
                <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-full h-full object-cover">
                </div>
            </div>
            
            <div class="stat-card  bg-blue-600 text-white p-6 rounded-xl mt-4 shadow-lg ">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-blue-100 text-xs uppercase tracking-wider">Ganancias Noviembre</span>
                    <i class="fas fa-chart-line text-blue-200"></i>
                </div>
                <div class="text-4xl font-bold mb-4">$124.50</div>
                <div class="flex gap-3 text-xs">
                    <div class="bg-white/20 px-2 py-1 rounded">Reservas: 12</div>
                    <div class="bg-white/20 px-2 py-1 rounded">Calif: 4.9 <i class="fas fa-star text-yellow-300"></i></div>
                </div>
            </div>
        </div>

        <div class="px-6">
            <div class="flex justify-between items-end mb-4">
                <h3 class="font-bold text-lg text-gray-800">Mis Parqueaderos</h3>
                <button onclick="formOwnerAddParking('owner-add-1')" class="text-blue-600 text-sm font-bold">+ Agregar</button>
            </div>

            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex gap-4">
                <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=200" class="w-20 h-20 rounded-lg object-cover">
                <div class="flex-1">
                    <div class="flex justify-between">
                        <h4 class="font-bold text-gray-800">Garaje Norte #1</h4>
                        <div class="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                    </div>
                    <p class="text-xs text-gray-500 mb-2">Av. Amazonas y Naciones Unidas</p>
                    <div class="flex justify-between items-center">
                        <span class="text-blue-600 font-bold text-sm">$2.00/h</span>
                        <button class="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">Editar</button>
                    </div>
                </div>
            </div>

            <div onclick="formOwnerAddParking('owner-add-1')" class="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-400 transition">
                <i class="fas fa-plus-circle text-2xl mb-2"></i>
                <p class="text-sm font-medium">Publicar nuevo espacio</p>
            </div>
        </div>
    </div>
		`
		
		navbar.innerHTML=navOwner
		 navbar.classList.remove('hidden');
	}
	
	function formOwnerAddParking(){
		let target=document.querySelector("#screen-home-owner")
		let step=0;
		let templateStep={
			0:`<h2 class="text-2xl font-bold mb-2">¿Dónde está ubicado?</h2>
				<p class="text-gray-500 mb-8 text-sm">Los conductores necesitan la dirección exacta para llegar sin problemas.</p>

				<label class="block text-xs font-bold text-gray-700 mb-2 uppercase">Título del anuncio</label>
				<input type="text" class="input-field" placeholder="Ej: Parqueo seguro cerca del Estadio">

				<label class="block text-xs font-bold text-gray-700 mb-2 uppercase">Dirección Principal</label>
				<input type="text" class="input-field" placeholder="Calle principal y número">

				<label class="block text-xs font-bold text-gray-700 mb-2 uppercase">Referencia</label>
				<input type="text" class="input-field" placeholder="Ej: Frente a la farmacia azul">`,
			1:`
				<h2 class="text-2xl font-bold mb-2">Detalles y Fotos</h2>
				<p class="text-gray-500 mb-6 text-sm">Muestra seguridad y confianza.</p>

				<div class="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl h-40 flex flex-col items-center justify-center text-blue-400 mb-6 cursor-pointer">
					<i class="fas fa-camera text-3xl mb-2"></i>
					<p class="text-sm font-medium">Subir fotos</p>
				</div>

				<h3 class="font-bold text-sm mb-3">Características</h3>
				<div class="grid grid-cols-2 gap-3 mb-8">
					<div class="border p-3 rounded-lg flex items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
						<i class="fas fa-video text-gray-400"></i> <span class="text-sm">Cámaras</span>
					</div>
					<div class="border p-3 rounded-lg flex items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
						<i class="fas fa-umbrella text-gray-400"></i> <span class="text-sm">Techado</span>
					</div>
					<div class="border p-3 rounded-lg flex items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
						<i class="fas fa-user-shield text-gray-400"></i> <span class="text-sm">Guardia</span>
					</div>
					<div class="border p-3 rounded-lg flex items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
						<i class="fas fa-door-open text-gray-400"></i> <span class="text-sm">Control Remoto</span>
					</div>
				</div>
		
			`,
			2:`
				<h2 class="text-2xl font-bold mb-2">Precio por Hora</h2>
				<p class="text-gray-500 mb-8 text-sm">Tú decides cuánto ganar. El promedio en tu zona es $1.50.</p>

				<div class="flex items-center justify-center mb-10">
					<button class="w-12 h-12 rounded-full bg-gray-100 text-xl font-bold text-gray-600" onclick="adjustPrice(-0.25)">-</button>
					<div class="mx-6 text-center">
						<span class="text-5xl font-bold text-gray-800" id="display-price">$1.50</span>
						<p class="text-gray-400 text-sm mt-1">USD / hora</p>
					</div>
					<button class="w-12 h-12 rounded-full bg-gray-100 text-xl font-bold text-gray-600" onclick="adjustPrice(0.25)">+</button>
				</div>

				<div class="bg-yellow-50 p-4 rounded-xl flex gap-3 mb-8">
					<i class="fas fa-lightbulb text-yellow-500 mt-1"></i>
					<p class="text-xs text-yellow-800 leading-relaxed">
						Recomendamos iniciar con un precio competitivo para obtener tus primeras 5 estrellas rápidamente.
					</p>
				</div>

				<button onclick="messageOwnerSuccess('owner-success')" class="btn-primary bg-green-600 shadow-green-200">Publicar Espacio</button>
			`
		}
		let continuar=()=>{
			let count=Object.keys(templateStep).length
			
			btnContinuar.classList.remove('hidden')
			
			if((step+1) ===(count))btnContinuar.classList.add('hidden')
			if(step >=(count)){
				
				return
			}
		
			form.innerHTML=templateStep[step]
			barStatusSteps.className=`h-full bg-blue-600 w-${step+1}/3`
			
			numStatusSteps.innerHTML=step+1
			step=step+1
		}
		let regresar=()=>{
			step=step-1
			if(!step){
				screenHomeOwner()
				return
			}
			form.innerHTML=templateStep[step-1]
			barStatusSteps.className=`h-full bg-blue-600 w-${step}/3`
			numStatusSteps.innerHTML=step			
			btnContinuar.classList.remove('hidden')
		}
		target.innerHTML=`
		<div id="screen-owner-add-1" class="scree bg-white p-6 pt-12">
			<div class="flex items-center gap-4 mb-8">
				<button name="btn-arrow-left" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><i class="fas fa-arrow-left"></i></button>
				<div class="h-1 bg-gray-100 flex-1 rounded-full overflow-hidden">
					<div id="bar-status-steps" class=""></div>
				</div>
				<span class="text-xs font-bold text-gray-400"><span id="num-status-steps"></span>/3</span>
			</div>
			<section class="form">
				
			</section>
			<div class="mt-8">
				<button name="btn-continuar" class="btn-primary">Continuar <i class="fas fa-arrow-right ml-2"></i></button>
			</div>
		</div>
			`
		
		let form=target.querySelector('.form')
		let btnArrowLeft=target.querySelector('[name="btn-arrow-left"]')
		let btnContinuar=target.querySelector('[name="btn-continuar"]')
		let barStatusSteps=target.querySelector("#bar-status-steps")
		let numStatusSteps=target.querySelector("#num-status-steps")
		
		btnArrowLeft.addEventListener('click',(e)=>{
			e.preventDefault()
			regresar()
		},false)
		
		btnContinuar.addEventListener('click',(e)=>{
			e.preventDefault()
			continuar()
		},false)
		
		continuar()
		
	}
	
	function messageOwnerSuccess(){
		screen.innerHTML=`<div id="screen-owner-success" class="screen flex flex-col items-center justify-center p-8 bg-white text-center">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <i class="fas fa-check text-5xl text-green-500"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2 text-gray-800">¡Publicado!</h2>
        <p class="text-gray-500 mb-8">Tu parqueadero ahora es visible para miles de conductores en Quito.</p>
        <button onclick="screenHomeOwner('home-owner')" class="btn-primary">Ir a mi Panel</button>
    </div>`
	}
    // --- LÓGICA DE NAVEGACIÓN ---
	const screen=document.querySelector('#app-main')
	const navbar = document.querySelector('#navbar');
	
    const navDriver = `
        <div class="nav-item active" onclick="router('home-driver')"><i class="fas fa-search-location"></i>Explorar</div>
        <div class="nav-item"><i class="fas fa-ticket-alt"></i>Reservas</div>
        <div class="nav-item" onclick="screenRoleSelect('role-select')"><i class="fas fa-user"></i>Perfil</div>`;
    
    const navOwner = `
        <div class="nav-item active" onclick="screenHomeOwner('home-owner')"><i class="fas fa-chart-pie"></i>Panel</div>
        <div class="nav-item"><i class="fas fa-list"></i>Espacios</div>
        <div class="nav-item" onclick="screenRoleSelect('role-select')"><i class="fas fa-user-tie"></i>Perfil</div>`;
	
    function router(screenName) {
        document.querySelectorAll('.screen').forEach(el => {
            el.classList.remove('active');
            if(el.id !== 'screen-home-driver') el.style.display = 'none';
        });

       
        navbar.classList.add('hidden'); // Default hidden

        if(screenName === 'home-driver') {
            document.getElementById('screen-home-driver').style.display = 'block';
            document.getElementById('screen-home-driver').classList.add('active');
            navbar.innerHTML = navDriver;
            navbar.classList.remove('hidden');
        } else if(screenName === 'home-owner') {
            document.getElementById('screen-' + screenName).style.display = 'block';
            document.getElementById('screen-' + screenName).classList.add('active');
            navbar.innerHTML = navOwner;
            navbar.classList.remove('hidden');
        } else {
            const target = document.getElementById('screen-' + screenName);
            target.style.display = 'flex'; // Flex para auth y role-select
            if(screenName.includes('home')) target.style.display = 'block';
            target.classList.add('active');
        }
    }

    function setRole(role) {
        if(role === 'driver') router('home-driver');
        else router('home-owner');
    }

    // Mock Data para el mapa
    const parkings = {
        'park1': { title: "Edificio Shyris Center", price: "$1.50", address: "Av. Shyris y Portugal", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200" },
        'park2': { title: "Casa Familia Pérez", price: "$2.00", address: "Eloy Alfaro N34", img: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=200" }
    };

    function openDrawer(id) {
        const p = parkings[id];
        document.getElementById('drawer-content').innerHTML = `
            <div class="flex gap-4 mb-4">
                <img src="${p.img}" class="w-20 h-20 rounded-lg object-cover">
                <div><h3 class="font-bold">${p.title}</h3><p class="text-xs text-gray-500">${p.address}</p><p class="text-blue-600 font-bold">${p.price}/h</p></div>
            </div>
            <button class="btn-primary">Reservar</button>
            <button onclick="document.getElementById('drawer').style.transform='translateY(120%)'" class="mt-2 w-full text-xs text-gray-400">Cerrar</button>
        `;
        document.getElementById('drawer').style.transform = 'translateY(0)';
    }

    // Iniciar en Auth
   // router('auth');
   screenAuth(screen)