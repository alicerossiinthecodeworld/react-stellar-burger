import { anchorSauce,anchorFillings, anchorBuns} from "./constants.js";


function scrollToAnchor(anchors) {
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionID = anchor.getAttribute('href');
      document.querySelector(sectionID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

export function scrollToAnchors() {
  scrollToAnchor(anchorSauce);
  scrollToAnchor(anchorFillings)
  scrollToAnchor(anchorBuns)
}