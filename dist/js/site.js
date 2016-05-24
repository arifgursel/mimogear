/* ================
// Drawer
// ============= */

function drawer(parameters) {

  var drawerTrigger = document.querySelector(parameters.trigger);

  drawerTrigger.addEventListener('click', activateDrawer, false);

}

function activateDrawer() {

  document.body.classList.toggle('drawer-active');

}

/* ================
// Harmonica
//   http://codepen.io/mimoduo/pen/epZaMq
// ============= */

function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.header);
  var articles = document.querySelectorAll(parameters.content);

  var currentNote = '';

  for (var i = 0; i < headings.length; i++) {
    headings[i].addEventListener('click', toggleNote, false);
  }

  headings[0].click();

  function clearClasses() {

    for (var i = 0; i < headings.length; i++) {
      headings[i].classList.remove('active');
    }

  }

  function assignClasses(currentNote) {

    currentNote.classList.add('active');

  }

  function toggleNote(event) {

    currentNote = event.currentTarget;

    clearClasses();
    assignClasses(currentNote);

  }

}

/* ================
// Lantern
//   http://codepen.io/mimoduo/pen/EPerjv
// ============= */

function lantern(parameters) {

  var lantern = document.querySelector(parameters.container);

  var content = document.createElement('div');
  content.classList.add('lantern-content');
  lantern.appendChild(content);

  var holder = document.createElement('img');
  holder.classList.add('lantern-holder');
  content.appendChild(holder);

  var prev = document.createElement('button');
  prev.addEventListener('click', previousLight, false);
  prev.classList.add('lantern-control', 'lantern-previous');
  prev.innerHTML = '<svg class="symbol symbol-prev"><use xlink:href="' + parameters.prevSymbol + '"></use></svg>';
  content.appendChild(prev);

  var next = document.createElement('button');
  next.addEventListener('click', nextLight, false);
  next.classList.add('lantern-control', 'lantern-next');
  next.innerHTML = '<svg class="symbol symbol-next"><use xlink:href="' + parameters.nextSymbol + '"></use></svg>';
  content.appendChild(next);

  var close = document.createElement('button');
  close.addEventListener('click', removeLight, false);
  close.classList.add('lantern-control', 'lantern-close');
  close.innerHTML = '<svg class="symbol symbol-close"><use xlink:href="' + parameters.closeSymbol + '"></use></svg>';
  content.appendChild(close);

  var lanternLights = document.querySelectorAll('.lantern-light');

  var lightCollection = [];
  var lightIndex = 0;

  for(var i = 0; i < lanternLights.length; i++) {
    lanternLights[i].addEventListener('click', displayLight, false);

    lightCollection[i] = [];
    lightCollection[i].push(
      lanternLights[i].getAttribute('src'),
      lanternLights[i].getAttribute('title')
    );
  }




  function previousLight() {

    if(lightIndex == 0) {
      lightIndex = lightCollection.length - 1;
    } else {
      lightIndex--;
    }

    setLight();

  }

  function nextLight() {

    if(lightIndex == lightCollection.length - 1) {
      lightIndex = 0;
    } else {
      lightIndex++;
    }

    setLight();

  }

  function displayLight(light) {

    grabLight(light);
    setLight();

    lantern.classList.add('display-lantern');

  }

  function removeLight() {

    lantern.classList.remove('display-lantern');

  }

  function grabLight(light) {

    for (i = 0; i < lightCollection.length; i++) {

      if (light.target.getAttribute('src') == lightCollection[i][0]) {
        lightIndex = i;
      }

    }

  }

  function setLight() {

    holder.setAttribute('src', lightCollection[lightIndex][0]);
    holder.setAttribute('alt', lightCollection[lightIndex][1]);
    holder.setAttribute('title', lightCollection[lightIndex][1]);

  }

}

/* ================
// Sail Slide
// ============= */

function sail(parameters) {

  var sail = {};

  if(parameters === undefined) {
    sail.container = '.sail';
  } else {
    sail.container = parameters.container;
  }

  sail.container = document.querySelectorAll(sail.container);

  if(parameters === undefined) {
    sail.backSymbol = '#arrow-back';
  } else {
    sail.backSymbol = parameters.backSymbol;
  }

  if(parameters === undefined) {
    sail.forwardSymbol = '#arrow-forward';
  } else {
    sail.forwardSymbol = parameters.forwardSymbol;
  }

  for(var i = 0; i < sail.container.length; i++) {
    var sailFragment = document.createDocumentFragment();
    var container = sail.container[i];

    container.directions = document.createElement('nav');
    container.directions.classList.add('sail-directions');
    sailFragment.appendChild(container.directions);

    container.back = document.createElement('button');
    container.back.innerHTML = '<svg class="symbol symbol-sail-direction"><use xlink:href="' + sail.backSymbol + '"></use></svg>';
    container.back.classList.add('sail-direction', 'sail-back');
    container.back.addEventListener('click', sailBack, false);
    container.directions.appendChild(container.back);

    container.forward = document.createElement('button');
    container.forward.innerHTML = '<svg class="symbol symbol-sail-direction"><use xlink:href="' + sail.forwardSymbol + '"></use></svg>';
    container.forward.classList.add('sail-direction', 'sail-forward');
    container.forward.addEventListener('click', sailForward, false);
    container.directions.appendChild(container.forward);

    container.markers = document.createElement('nav');
    container.markers.classList.add('sail-markers');
    sailFragment.appendChild(container.markers);

    for(var x = 0; x < container.children.length; x++) {
      container.key = document.createElement('button');
      container.key.classList.add('sail-key');
      container.key.addEventListener('click', sailTo, false);
      container.markers.appendChild(container.key);
    }

    container.appendChild(sailFragment);

  }

  function sailBack() {

  }

  function sailForward() {

  }

  function sailTo(event) {

  }

}

/* ================
// Swift Slide
//   http://codepen.io/mimoduo/pen/gabWmN
// ============= */

function swift(parameters) {

  var container = document.querySelector(parameters.container);
  var elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);

  var controller = document.createElement('div');
  controller.classList.add('swift-controls');
  container.appendChild(controller);

  var prev = document.createElement('button');
  prev.addEventListener('click', previousSlide, false);
  prev.classList.add('swift-control', 'swift-prev');
  prev.innerHTML = '<svg class="symbol symbol-prev"><use xlink:href="' + parameters.prevSymbol + '"></use></svg>';
  controller.appendChild(prev);

  var next = document.createElement('button');
  next.addEventListener('click', nextSlide, false);
  next.classList.add('swift-control', 'swift-next');
  next.innerHTML = '<svg class="symbol symbol-next"><use xlink:href="' + parameters.nextSymbol + '"></use></svg>';
  controller.appendChild(next);

  var currentSlide = 1;

  var pager = document.createElement('div');
  pager.classList.add('swift-pager');
  container.appendChild(pager);

  var pages = [];

  for (var i = 0; i < elements.length; i++) {

    pages.push(document.createElement('span'));

    pager.appendChild(pages[i]);

    pages[i].addEventListener('click', slide.bind(null, i), false);

  }

  pages[currentSlide].click();

  function clearClasses() {

    for (var i = 0; i < elements.length; i++) {
      pages[i].classList.remove('active');
      elements[i].classList.remove('active');
    }

  }

  function assignClasses(index) {

    pages[index].classList.add('active');
    elements[index].classList.add('active');

  }

  function slide(index) {

    clearClasses();
    assignClasses(index);

  }

  function previousSlide() {

    if(currentSlide === 0) {
      currentSlide = elements.length;
    }

    currentSlide = currentSlide - 1;

    slide(currentSlide);

  }

  function nextSlide() {

    if (currentSlide == elements.length - 1) {
      currentSlide = -1;
    }

    currentSlide = currentSlide + 1;

    slide(currentSlide);

  }

}

/*

  site/main

*/


/* ================
// Main Site Function
// ============= */

site();

function site() {

  drawer({
    trigger: '.drawer-trigger'
  });

  swift({
    container: '.swift-slide',
    elements: 'li',
    prevSymbol: '#arrow-back',
    nextSymbol: '#arrow-forward'
  });

  sail();

  harmonica({
    container: '.harmonica',
    header: '.harmonica-header',
    content: '.harmonica-content'
  });

  lantern({
    container: '.lantern',
    prevSymbol: '#arrow-back',
    nextSymbol: '#arrow-forward',
    closeSymbol: '#close'
  });

}
