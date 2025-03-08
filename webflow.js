// Check if we're on the correct page
if (window.location.pathname === '/doodeli-hoodeli-akindurak') {
  // Add styles dynamically
  document.querySelectorAll("#luxy, .overlay, .nav_outer_wrap, .html-embed-7, div-block-101, #preloader, div:has(#hire-me-block) .div-block-407, div:has(#hire-me-block) .global-settings").forEach(element => element?.remove());
  
  // Add iframe
    // Start Generation Here
  const iframe = document.createElement('iframe');
  iframe.src = 'https://3d-gallery-ecru.vercel.app/';
  const targetDiv = document.querySelector('.div-block-392');
  targetDiv.parentNode.insertBefore(iframe, targetDiv);


  // Custom styles for the iframe
  const style = document.createElement('style');
  style.textContent = `
    body {
        overflow-x: hidden;
        background-color: #faf9f9;
        color: #1c1c1c;
        transition: background-color 0.3s, color 0.3s;
    }
    iframe {
        z-index: 7;
        position: relative;
        margin-top: -100px;
        height: 130vh;
        width: 100vw;
        border: none;
        outline: none;
        box-shadow: none;
        border-radius: 0;
    }
    .nav-men {
        position: relative;
    }
    .div-block-392 {
        margin-top: 0px;
    }
    .men-__outer__wrapper {
        z-index: 8;
    }
    #hire-me-block {
        top: 0;
    }
    /*.mode-toggle {
        display: none;
    }*/
    @media (max-width: 768px) {
        iframe {
            margin-top: 100px;
            height: 100vh;
        }
        .div-block-392 {
            margin-top: 100px;
        }
    }
  `;
  document.head.appendChild(style);
}
