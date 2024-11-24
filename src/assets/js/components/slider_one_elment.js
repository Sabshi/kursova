var splide = new Splide( '.two', {
    width: '1170px',
    height: 564,
    perPage: 3,
    focus  : 0,
    omitEnd: true,
    pagination: false,
});
  
splide.on('visible', function (slide) {
    //hides right arrow if last slide visible
    // if (slide.index === splide.length && splide.Components && 
    //     splide.Components.Arrows && splide.Components.Arrows.arrows && splide.Components.Arrows.arrows.next) {
            
            
    //         if (!splide.Components.Arrows.arrows.next.disabled) {
    //             splide.Components.Arrows.arrows.next.disabled = true;
    //         } 
    //         splide.Components.Arrows.arrows.next.style.opacity = 0;
    //     } else {
    //         splide.Components.Arrows.arrows.next.style.opacity = 1;
    //     }
      //hides left arrow if first slide visible
    // console.log();
    // if ((slide.slide.classList.contains('is-active') || slide.slide.classList.contains('is-visible')) && slide.index === 0 || slide.index === 1) {
    //     splide.Components.Arrows.arrows.prev.style.opacity = 0;
    // }
      
    // if ((slide.index === 0) && splide.Components && 
    //     splide.Components.Arrows && splide.Components.Arrows.arrows && splide.Components.Arrows.arrows.prev) {
    //         splide.Components.Arrows.arrows.prev.style.opacity = 0;

    // } else if (slide.index === 2) {
    //     splide.Components.Arrows.arrows.prev.disabled = false;
    //     splide.Components.Arrows.arrows.prev.style.opacity = 1;
    // }
  });

splide.mount();