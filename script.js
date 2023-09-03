const puppeteer = require("puppeteer");
let contador = 0;


(async () => {
    const comentarios = [
        '🐄 ¡Qué contenta como una vaca en el campo!',
        '🌴🏖️ Saludos desde Floripa, ¡como una vaca en la playa!',
        '🐮🌼 Pensando en las vacaciones como una vaca sueña con Floripa.',
        '🏄‍♂️🐄 Surfeando las olas de la vida, al estilo Floripa.',
        '🌞🐮 ¡Disfrutando del sol como una vaca toma el sol en Floripa!',
        '🌺🏄‍♀️ ¡Aloha! Viviendo la vida como una vaca en Floripa.',
        '🌴🐄 Salta de alegría como una vaca en la paradisíaca Floripa.',
        '🏄‍♂️🌊 Capturando momentos increíbles, al igual que Floripa captura corazones.',
        '🏖️🐮 Relajándome en la costa, ¡al estilo Floripa y sus playas!',
        '🌴🌞 Pensando en escapar como una vaca sueña con Floripa.',
        '🏄‍♀️🏄‍♂️ Atrévete a vivir como una vaca que se aventura en las olas de Floripa.',
        '🌼🐄 Flores y risas, ¡igual que las vacas felices en Floripa!',
        '😂🌴 Riendo a carcajadas como una vaca que escucha un chiste en Floripa.',
        '🐄🌊 Saltando de emoción como una vaca en una ola de Floripa.',
        '🌞🐮 Brillando bajo el sol, ¡al igual que Floripa en todo su esplendor!',
        '🏖️🏄‍♀️ Viviendo la buena vida como una vaca en la hermosa Floripa.',
        '🌴🐄 Respirando la brisa fresca de Floripa, como una vaca en la naturaleza.',
        '🐄',
        '🌴🏖️',
        '🐮🌼',
        '🏄‍♂️🐄',
        '🌞🐮',
        '🌺🏄‍♀️',
        '🌴🐄',
        '🏄‍♂️🌊',
        '🏖️🐮',
        '🌴🌞',
        '🏄‍♀️🏄‍♂️',
        '🌼🐄',
        '😂🌴',
        '🐄🌊',
        '🌞🐮',
        '🏖️🏄‍♀️',
        '🌴🐄',
        //iconos de alegría y disfrute, más variedad
        '😁😁😁',
        '😁😁😂',
        '😁😂😁',
        '😁😂😂',
        '😂😁😁',
        '😂😁😂',
        '😂😂😁',
        //de amor
        '😍😍😍',
        '😍😍😘',
        '😍😘😍',
        '😍😘😘',
        //usando otros iconos más peculiares
        '🤩🤩🤩',
        '🤩🤩😍',
        '🤩😍🤩',
        '🤩😍😍',
        '😍🤩🤩',
    ];
        
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://www.instagram.com/accounts/login/');

      // Agregar encabezados para simular el comportamiento de un navegador real
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
        });
  
      const usernameSelector = '#loginForm > div > div:nth-child(1) > div > label > input';
      const passwordSelector = '#loginForm > div > div:nth-child(2) > div > label > input';
  
      await page.waitForSelector(usernameSelector);
      await page.waitForSelector(passwordSelector);
  
      await page.type(usernameSelector, 'USER_NAME'); // Reemplaza con tu usuario
      await page.type(passwordSelector, 'TU-CLAVE-DE-SEGURIDAD'); // Reemplaza con tu contraseña
  
      await page.click('#loginForm > div > div:nth-child(3) > button > div');
      await page.waitForNavigation();
  

      //Vamos a la publicación que queremos comentar
      await page.goto('https://www.instagram.com/p/CqZHkcVpNdt/');
      await page.waitForSelector('textarea');
  
      // Función para agregar un comentario a la publicación
      // Selecciona un comentario al azar de la lista de comentarios lo typea y envia
      async function agregarComentario(page, comentario) {
          await page.type('textarea', comentario);
          await page.keyboard.press('Enter');
          contador = contador + 1;
      }


      // para no incumplir la normas de instagram, se limita a 60 comentarios por hora
      const maxComentariosPorHora = 60;
      const tiempoPorHoraEnMilisegundos = 60 * 60 * 1000; // 1 hora en milisegundos
      const tiempoEntreComentarios = tiempoPorHoraEnMilisegundos / maxComentariosPorHora;
  
      let contadorComentarios = 0;
      let inicioHora = Date.now();

      // Bucle infinito para agregar comentarios
      while (true) {
        const comentario = comentarios[Math.floor(Math.random() * comentarios.length)];
        
        // Si se alcanza el límite de comentarios por hora, se espera hasta que se cumpla una hora
        if (contadorComentarios >= maxComentariosPorHora) {
            const tiempoTranscurrido = Date.now() - inicioHora;
            if (tiempoTranscurrido < tiempoPorHoraEnMilisegundos) {
                const tiempoDeEspera = tiempoPorHoraEnMilisegundos - tiempoTranscurrido;
                await page.waitForTimeout(tiempoDeEspera);
            }
            inicioHora = Date.now();
            contadorComentarios = 0;
        }

        // await para que se espere a que se agregue el comentario osea que se ejecute la función
        // agregarComentario y luego se espere un tiempo aleatorio entre 0 y 1 minuto para volver a empezar el bucle
        await agregarComentario(page, comentario);
        const tiempoDeEspera = tiempoEntreComentarios + Math.random() * 60000; // Agregar variabilidad de hasta 1 minuto
        await page.waitForTimeout(tiempoDeEspera);

        contadorComentarios++;
    }
  
      // Cerrar el navegador al finalizar
      browser.close();

      alert("Se han realizado " + contador + " comentarios");
  })();
  