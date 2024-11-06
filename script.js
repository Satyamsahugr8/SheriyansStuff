function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation() {
    var tl = gsap.timeline();

    gsap.from(`.line h1`, {
        y:150,
        opacity: 0,
        stagger:0.3 
    });
    
    tl.from(`#line1-part1, .line h2`, {
        opacity: 0,
        onStart: function() {
            var h5Timer = document.querySelector('#line1-part1 h5');
            var i = 0;
         
            var iner = setInterval(function() {
                if (i<100) {
                    i++;
                    h5Timer.innerHTML = i;
                } else {
                    clearInterval(iner);
                } 
            }, 20);
        }
    })
    
    tl.to(`.line h4`, {
        animationName: 'animeloader',
        opacity:1
    });
    
    tl.to(`#loader`, {
        opacity: 0,
        duration:0.3,
        delay:2
    });
    
    tl.from(`#page1`, {
        delay:0.2,
        duration:0.5,
        opacity:0,
        y:15,
        ease:Power4
    });
    
    tl.to(`#loader`, {
        display:'none'
    });
    tl.from(`#nav`, {
        opacity:0
    });

    tl.from(`#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1`, {
        y:150,
        stagger:0.2
    });

}

function cursorAnimation() {
    
    // document.addEventListener("mousemove", function (dets) {
    //   gsap.to("#crsr", {
    //     left: dets.x,
    //     top: dets.y,
    //   });
    // });

    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
  
    Shery.makeMagnet("#nav-part2 h4");

    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    var img = document.querySelector("#video-container img");
    videoContainer.addEventListener("mouseenter", function () {
        video.addEventListener("mousemove", function (dets) {
        gsap.to(".mousefollower", {
            opacity: 0
        });
        gsap.to("#video-cursor", {
            left: dets.x - 320,
            y: dets.y - 1,
        });
        });
    });
    
    videoContainer.addEventListener("mouseleave", function () {
        gsap.to(".mousefollower", {
            opacity: 1
        });
        gsap.to("#video-cursor", {
            left: "70%",
            top: "-15%",
        });
    })

    var flag = 0
    video.addEventListener("click", function () {
      if (flag == 0) {
        video.play();
        video.style.opacity = 1;
        img.style.opacity = 0;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-fill"></i>`;
        gsap.to("#video-cursor", {
          scale: 0.5
        })
        flag = 1
      } else {
        video.pause();
        video.style.opacity = 0;
        img.style.opacity = 1;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-fill"></i>`
        gsap.to("#video-cursor", {
          scale: 1
        })
        flag = 0
      }
    })

}

function sheryAnimation() {
    Shery.imageEffect(".image-div", {
      style: 5,
      gooey: true,
      // debug:true,
    });
}

function flagAnimation() {

  document.addEventListener("mousemove", function (dets) {
      gsap.to("#flag", {
        x: dets.x,
        y: dets.y
      })
  })

  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1
    })
  })

  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0
    })
  })

}

locomotiveAnimation();
loadingAnimation();
cursorAnimation();
sheryAnimation();
flagAnimation();