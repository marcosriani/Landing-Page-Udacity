(function () {
  // Scroll animation
  const smoothSectionScroll = (target, animationDuration) => {
    const scrollTarget = document.querySelector(target);
    const scrollTargetPosition =
      scrollTarget.getBoundingClientRect().top + window.scrollY - 100;
    const startPosition = window.pageYOffset;
    const distance = scrollTargetPosition - startPosition;
    let startTime = null;

    // EASE FUNCTION FROM http://gizma.com/easing/
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t * t * t + 2) + b;
    };

    const animationScroll = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const runAnimation = ease(
        timeElapsed,
        startPosition,
        distance,
        animationDuration
      );
      window.scrollTo(0, runAnimation);

      if (timeElapsed < animationDuration) {
        requestAnimationFrame(animationScroll);
      }
    };

    requestAnimationFrame(animationScroll);
  };

  //   Selecting all section items
  const allSections = Array.from(document.querySelectorAll('section'));

  // Selecting the ul tag
  const navUl = document.querySelector('#navbar__list');

  allSections.forEach((section, index) => {
    //   creating the internal navigation items
    const li = document.createElement('li');
    const anchorTag = document.createElement('a');
    const linkTextAchorTag = `#section${index + 1}`;

    // setting the attribute and text on the a tag
    anchorTag.setAttribute('href', linkTextAchorTag);
    anchorTag.innerHTML = `Section ${index + 1}`;

    // setting class and adding the a tag inside the li tag
    li.className = `li${index + 1}`;
    li.appendChild(anchorTag);

    // Adding the li inside the ul tag
    navUl.appendChild(li);

    // Eventlistener for menu buttons
    li.addEventListener('click', (event) => {
      event.preventDefault();
      const clickedButtonHref = event.target.getAttribute('href');
      smoothSectionScroll(clickedButtonHref, 1000);
    });

    // Listening to scroll on the page and specially when scrolling over a section
    window.addEventListener('scroll', () => {
      // Checking if section is in the viewport
      const bounding = section.getBoundingClientRect();

      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        anchorTag.style.color = 'red';
        section.classList.add('section-on-focus');
        section.classList.add('your-active-class');
      } else {
        section.classList.remove('section-on-focus');
        section.classList.remove('your-active-class');
        anchorTag.style.color = 'white';
      }
    });

    // Customizing navigation when page is scrolled up and down
    const navMenu = document.querySelector('.navbar__menu');

    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navMenu.style.opacity = '0.7';
      } else {
        navMenu.style.opacity = '1';
      }
      prevScrollpos = currentScrollPos;
    };
  });

  //   Creating a button that is linked to the top of the page
  const footer = document.querySelector('.page__footer');
  const upButton = document.createElement('button');
  const upButtonLink = document.createElement('a');

  upButtonLink.innerHTML = 'Go UP';
  upButton.setAttribute('href', '#main');
  upButton.appendChild(upButtonLink);
  footer.appendChild(upButton);

  upButton.addEventListener('click', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
})();
