(function () {
  const listElements = document.querySelectorAll('.menu__item--show');
  const list = document.querySelector('.menu__links');
  const menu = document.querySelector('.menu__hamburguer');
  const ham = document.querySelector('.ham');
  const barras = document.querySelectorAll('.ham span');

  // Función para conectar la billetera de Binance Smart Chain
  async function connectWallet() {
    if (typeof window.BinanceChain !== 'undefined') {
      try {
        await window.BinanceChain.requestAccounts();
        const bsc = new BinanceChain.BinanceChainConnector();
        // Ahora puedes interactuar con la billetera de Binance Smart Chain utilizando el objeto 'bsc'
        console.log('Billetera de Binance Smart Chain conectada:', bsc);

        // Realiza acciones relacionadas con la billetera de Binance Smart Chain según tus necesidades
      } catch (error) {
        console.error('Error al conectar la billetera de Binance Smart Chain:', error);
      }
    } else {
      console.error('La billetera de Binance Smart Chain no está instalada o no se encuentra disponible.');
    }
  }

  // Agregar evento 'click' para conectar la billetera
  menu.addEventListener('click', connectWallet);

  const addClick = () => {
    listElements.forEach(element => {
      element.addEventListener('click', () => {
        let subMenu = element.children[1];
        let height = 0;
        element.classList.toggle('menu__item--active');
        if (subMenu.clientHeight === 0) {
          height = subMenu.scrollHeight;
        }
        subMenu.style.height = `${height}px`;
      });
    });
  }

  const deleteStyleHeight = () => {
    listElements.forEach(element => {
      if (element.children[1].getAttribute('style')) {
        element.children[1].removeAttribute('style');
        element.classList.remove('menu__item--active');
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      deleteStyleHeight();
      if (list.classList.contains('menu__links--show')) {
        list.classList.remove('menu__links--show');
      }
    } else {
      addClick();
    }
  });

  if (window.innerWidth <= 800) {
    addClick();
  }

})();
