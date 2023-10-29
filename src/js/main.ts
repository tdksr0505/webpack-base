import '@/scss/main.scss'
import gsap from 'gsap'

import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// const $ = require('jquery')
if (process.env.NODE_ENV !== 'production') {
  // html hot reload
  require('../index.html')
}
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)

// The start and end positions in terms of the page scroll
// const offsetFromTop = innerHeight * 0.25;
// const pathBB = document.querySelector("#path").getBoundingClientRect();
// const startY = pathBB.top - innerHeight + offsetFromTop;
// const finishDistance = startY + pathBB.height - offsetFromTop;
// the animation to use
$('#refresh').on('click', () => {
  console.log(`click`)
  tl.scrollTrigger.refresh()
  tl.tweenTo(0)
  ScrollTrigger.refresh()
})
window.addEventListener('resize', () => {
  console.log(`resize`)
})
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.wrapper',
    pin: false,
    markers: true, // pin the trigger element while active
    start: '-10% 100%', // when the top of the trigger hits the top of the viewport
    scrub: 1,
    invalidateOnRefresh: true,
  },
})
tl.to('#ball_1', {
  ease: 'none',
  motionPath: {
    path: '#line_1',
    align: '#line_1',
    autoRotate: false,
    alignOrigin: [0.5, 0.5],
  },
}).pause(0.001)
