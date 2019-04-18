var	CACHE_NAME	=	'fajar-cache';
var	urlsToCache	=	[
		'.',
		'index.html',
		'styles/main.css',
		'nav.html',
		'pages/about.html',
		'pages/contact.html',
		'pages/galeri.html',
		'pages/home.html',
		'pages/profil.html',
		'css/materialize.css',
		'css/materialize.min.css'
		
];
	//syntax diatas adalah urlsToCache yang didalamnya akan dibuat sebuah variable
	// yang berguna untuk memanggil halaman page dari file tiap program agar bisa
	//tampil saat offline yaitu file html dan gambar
self.addEventListener('install',	function(event)	{
		event.waitUntil(
				caches.open(CACHE_NAME)
				.then(function(cache)	{
						return	cache.addAll(urlsToCache);
				})
		);
});
	//syntax diatas berguna untuk menginstal cache fajar-cache yang kemudian
	//semuah file dari halaman html dan gambar akan menjadi cache dan bisa tampil saat offline

self.addEventListener('fetch',	function(event)	{
		event.respondWith(
				caches.match(event.request)
				.then(function(response)	{
						return	response	||	fetchAndCache(event.request);
				})
		);
});
	//syntax diatas berguna untuk fetch atau menggambil sebuah halaman dari cache
	//agar bisa tampil saat keaadaan offline
	
function	fetchAndCache(url)	{
		return	fetch(url)
		.then(function(response)	{
				//	Check	if	we	received	a	valid	response
				if	(!response.ok)	{
						throw	Error(response.statusText);
				}
return	caches.open(CACHE_NAME)
				.then(function(cache)	{
						cache.put(url,	response.clone());
						return	response;
				});
		})
		.catch(function(error)	{
				console.log('Request	failed:',	error);
				//	You	could	return	a	custom	offline	404	page	here
		});
}

self.addEventListener('install',	function(event)	{
		console.log('Service	worker	installing...');
		self.skipWaiting();
		//	TODO	3.4:	Skip	waiting
		//	syntax diatas adalah sebuah event yang berguna untuk menginstall service worker dan ketika berhasil maka 
		// pada console akan menampilkan output  Service	worker	installing...
});
//	I'm	a	new	service	worker
self.addEventListener('activate',	function(event)	{
		console.log('Service	worker	activating...');
});
		//syntax diatas adalah sebuah event untuk mengaktifkan service worker dan ketika berhasil maka 
		// pada console akan menampilkan output  Service	worker	activating...
		
self.addEventListener('fetch',	function(event)	{
		console.log('Fetching:',	event.request.url);
});
		//syntax diatas adalah sebuah event untuk mengambil data ketika melakukan proses klik pindah
		//dari halaman web lain