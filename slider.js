window.onload = async function () {
  const gallery = document.querySelector(".xgallery");
  const previewImage = document.querySelector(".xpreview-img img");
  const previewTitle = document.querySelector(".preview-title");
  const previewContainer = document.querySelector(".xpreview-container");

  // Gallery data Add/Remove Images here
  const galleryData = [
    {
      id: 1,
      src: "./assets/img1.jpg",
      title: "Cosmic Dreams Beyond",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 2,
      src: "./assets/img2.jpg",
      title: "Urban Night Tales",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 3,
      src: "./assets/img3.jpg",
      title: "Silent Echo Through Time",
      subTitle: "Mixed Use & Transport",
      shown: true // Example of a hidden image
    },
    {
      id: 4,
      src: "./assets/img4.jpg",
      title: "Crystal Memory Of Light",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 5,
      src: "./assets/img5.jpg",
      title: "Neon Shadows Never Sleep",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 6,
      src: "./assets/img6.jpg",
      title: "Digital Dawn Breaking Through",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 7,
      src: "./assets/img7.jpg",
      title: "Ethereal Moments In Space",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 8,
      src: "./assets/img8.jpg",
      title: "Lunar Whispers At Night",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 9,
      src: "./assets/img9.jpg",
      title: "Velvet Storm Rising High",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 10,
      src: "./assets/img10.jpg",
      title: "Azure Dreams Never Fade",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 11,
      src: "./assets/img11.jpg",
      title: "Golden Hour Last Forever",
      subTitle: "Mixed Use & Transport",
      shown: true,
    },
    {
      id: 12,
      src: "./assets/img12.jpg",
      title: "Midnight Pulse Through Darkness",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 13,
      src: "./assets/img13.jpg",
      title: "Electric Soul In Motion",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 14,
      src: "./assets/img14.jpg",
      title: "Crystal Vision Beyond Reality",
      subTitle: "Mixed Use & Transport",
      shown: true
    },
    {
      id: 15,
      src: "./assets/img15.jpg",
      title: "Neon Dream Flow",
      subTitle: "Mixed Use & Transport",
      shown: true
    }
  ];

  // Function to preload images
  const preloadImages = async (images) => {
    const promises = images.map((imageData) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageData.src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    return Promise.all(promises);
  };

  // Set initial states
  gsap.set(gallery, {
    opacity: 1
  });

  gsap.set(previewContainer, {
    opacity: 0
  });

  // Create entrance timeline
  const entranceTL = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
    paused: true
  });

  // Remove gallery container animation, only set its initial visibility
  entranceTL.set(gallery, {
    opacity: 1
  });

  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Continue with the rest of your existing code...
  try {
    // Preload images
    await preloadImages(galleryData);

    // Create gallery items
    const totalCircleItems = 150; // Set the desired total number of items
    const activeItems = galleryData.filter(item => item.shown); // Get only the shown items

    for (let i = 0; i < totalCircleItems; i++) {
      const imageData = activeItems[i % activeItems.length]; // Cycle through the active items
      const item = document.createElement("div");
      item.className = "xitem";
      const img = document.createElement("img");
      img.src = imageData.src;
      img.dataset.title = imageData.title;
      img.dataset.subTitle = imageData.subTitle; // Use the new subTitle property
      item.appendChild(img);
      gallery.appendChild(item);
    }

    // Initialize gallery items
    const items = document.querySelectorAll(".xitem");
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    // Add variable to track the active preview image
    let activePreviewSrc = galleryData[0].src;
    let activePreviewTitle = galleryData[0].title;

    // Set initial preview
    updatePreview({
      src: activePreviewSrc,
      dataset: { title: activePreviewTitle, subTitle: galleryData[0].subTitle }
    });

    // Dark mode
    setInterval(() => {
      if (window.top !== window.self) {
        if (document.querySelector("[cz-shortcut-listen='true']").classList.contains("dark-mode")) {
            document.body.classList.add('dark-mode');
        } else {
          if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
          }
        }
      }
    }, 100)

    // Setup items positioning and events
    items.forEach((item, index) => {
      // Initial position
      gsap.set(item, {
        rotationY: 90,
        rotationZ: index * angleIncrement - 90,
        transformOrigin: "50% 400px",
      });

      // Add event listeners
      item.addEventListener("mouseover", function () {
        const imgInsideItem = item.querySelector("img");
        updatePreview(imgInsideItem);

        if (window.innerWidth <= 768) {
          gsap.to(item, {
            x: -20,
            ease: "power2.out",
            duration: 0.5,
          });
        } else {
          gsap.to(item, {
            x: 10,
            z: 10,
            y: 10,
            ease: "power2.out",
            duration: 0.5,
          });
        }
      });

      item.addEventListener("mouseout", function () {
        if (!isMobile()) {
          updatePreview({
            src: activePreviewSrc,
            dataset: { title: activePreviewTitle }
          });
        }
        gsap.to(item, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.out",
          duration: 0.5,
        });
      });

      item.addEventListener("click", function() {
        if (!isMobile()) {
          const imgInsideItem = item.querySelector("img");
          activePreviewSrc = imgInsideItem.src;
          activePreviewTitle = imgInsideItem.dataset.title;
          updatePreview(imgInsideItem);
        }
      });
    });

    // After creating all gallery items and setting up events
    requestAnimationFrame(() => {
      // Ensure DOM is updated
      requestAnimationFrame(() => {
        // Set initial opacity for items
        items.forEach(item => {
          gsap.set(item, { opacity: 0 });
        });

        // Start the entrance animations
        entranceTL.play();

        // Add circular rotation and fade in to all items
        items.forEach((item, index) => {
          // Separate fade and rotation animations for better control
          gsap.to(item, {
            opacity: 1,
            duration: 0.5, // Quick fade in
            ease: "power1.out"
          });

          gsap.to(item, {
            rotationZ: index * angleIncrement - 90 + 360,
            duration: 5, // Changed from 3 to 5 seconds for slower rotation
            ease: "power1.inOut",
          });
        });

        // Fade in preview container - faster
        gsap.to(previewContainer, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2
        });
      });
    });

    // Setup scroll trigger
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (self) => {
        const rotationProgress = self.progress * 360 * 1;
        items.forEach((item, index) => {
          const currentAngle = index * angleIncrement - 90 + rotationProgress;
          gsap.to(item, {
            rotationZ: currentAngle,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      },
    });

  } catch (error) {
    console.error('Error initializing gallery:', error);
  }

  // Helper functions
  function updatePreview(imgElement) {
    previewImage.src = imgElement.src;
    previewTitle.textContent = imgElement.dataset.title;

    // Set the sub-title
    const subTitle = imgElement.dataset.subTitle; // Get the sub-title from the data attribute
    const subTitleElement = document.querySelector('.sub-title'); // Make sure you have this element in your HTML
    if (subTitleElement) {
      subTitleElement.textContent = subTitle; // Update the subtitle
    }
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Add this at the beginning of window.onload
  // Enable smooth scrolling with a custom implementation
  let isScrolling = false;
  let scrollEndTimer = null;

  window.addEventListener('wheel', function(e) {
    if (!isScrolling) {
      isScrolling = true;
      window.scrollTo({
        top: window.pageYOffset + (e.deltaY * 2),
        behavior: 'smooth'
      });
      
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrolling = false;
      }, 66); // Debounce scroll events
    }
  }, { passive: true });

  if (isMobile()) {
    gsap.set(gallery, {
      rotateX: 85,
      rotateY: 0
    });
  }

  document.addEventListener("mousemove", function (event) {
    // Skip all movement on mobile
    if (isMobile()) return;

    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateX = 55 + percentY * 2;
    const rotateY = percentX * 2;

    gsap.to(gallery, {
      duration: 1,
      ease: "power2.out",
      rotateX: rotateX,
      rotateY: rotateY,
      overwrite: "auto",
    });
  });

  // Add scroll handler for mobile devices
  let lastScrollPosition = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    if (!isMobile()) return;
    
    const currentScroll = window.pageYOffset;
    const galleryImages = document.querySelectorAll('.xitem img');
    
    if (Math.abs(currentScroll - lastScrollPosition) > scrollThreshold) {
        const imageIndex = Math.floor(currentScroll / scrollThreshold) % galleryImages.length;
        updatePreview(galleryImages[imageIndex]); // Update both title and subtitle
        lastScrollPosition = currentScroll;
    }
  });

  // Add preview functionality to the preview image
  const previewImg = document.querySelector('.xpreview-img');
  if (previewImg) {
    previewImg.classList.add('preview-image'); // Add the preview-image class
    
    let isExpanded = false;
    let overlay; // Declare overlay variable outside the event listener

    previewImg.addEventListener('click', () => {
      if (!isExpanded) {
        // Expand image
        const rect = previewImg.getBoundingClientRect();
        const scaleX = window.innerWidth * (window.innerWidth >= 768 ? 0.8 : 0.9) / rect.width;
        const scaleY = (window.innerHeight * 0.8) / rect.height;
        const scale = Math.min(scaleX, scaleY);

        // Check if overlay already exists
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'preview-overlay';
          
          // Append overlay to xpreview-container for mobile
          if (window.innerWidth <= 768) {
            const previewContainer = document.querySelector('.xpreview-container');
            previewContainer.insertBefore(overlay, previewImg); // Insert before the preview image
          } else {
            document.body.appendChild(overlay); // Append to body for desktop
          }
        }

        gsap.to(overlay, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.3
        });

        if (window.innerWidth <= 768) {
          // Mobile devices - expand
          document.body.classList.add('preview-open');
          gsap.to(previewImg, {
            top: '50%',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else {
          // Desktop devices - expand
          gsap.to(previewImg, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            scale: scale,
            zIndex: 1000,
            duration: 0.5,
            ease: 'power2.out'
          });
        }

        overlay.addEventListener('click', () => {
          // Animate overlay out
          gsap.to(overlay, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.3,
            onComplete: () => {
              overlay.remove();
              overlay = null; // Reset overlay variable
            }
          });

          if (window.innerWidth <= 768) {
            // Mobile devices - shrink back
            gsap.to(previewImg, {
              top: '20px',
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(previewImg, { clearProps: 'all' });
              }
            });
            
            // Remove the preview-open class when overlay is clicked
            document.body.classList.remove('preview-open');
          } else {
            // Desktop devices - shrink back
            gsap.to(previewImg, {
              scale: 1,
              position: 'fixed',
              top: '50%',
              left: '50%',
              xPercent: -50,
              yPercent: -50,
              zIndex: 200,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(previewImg, { clearProps: 'all' });
              }
            });
          }

          isExpanded = false;
        });
      }

      isExpanded = !isExpanded;
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  });
};

function setupRotation() {}
