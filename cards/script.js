let deck = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=6S,6H,6C,6D"
let id;
let decks = [...document.getElementsByClassName('card')];
let cards = [];
let back = "https://deckofcardsapi.com/static/img/back.png";



function show_image(src, width, height,alt) {
  let img = document.createElement("img");

  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  img.className = "cardimg";

  document.body.appendChild(img);
}



fetch(deck)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        id = data.deck_id
        return id
      })
      .then(id =>
        fetch('https://deckofcardsapi.com/api/deck/'+id+'/shuffle/') 
        .then(response => response.json()) 
        .then(data => (()=>{ console.log(data); return id })())
        .catch(error => console.error('Ошибка:', error))
        )
        .then(id =>
          fetch('https://deckofcardsapi.com/api/deck/'+id+'/draw/?count=4')
          .then(response => response.json()) 
          .then(data => (()=>{ cards = data.cards; console.log(data); return id})())
          .catch(error => console.error('Ошибка:', error))
        )
        .catch(error => console.error('Ошибка:', error));

        function reshuffle(){
          decks[0].style.backgroundImage = `url(${back})`
          decks[1].style.backgroundImage = `url(${back})`
          decks[2].style.backgroundImage = `url(${back})`
          decks[3].style.backgroundImage = `url(${back})`
          
          fetch('https://deckofcardsapi.com/api/deck/'+id+'/shuffle/') 
          .then(response => response.json()) 
          .catch(error => console.error('Ошибка:', error))
          fetch('https://deckofcardsapi.com/api/deck/'+id+'/draw/?count=4')
          .then(response => response.json()) 
          .then(data => (()=>{ cards = data.cards; console.log(data); return id})())
          .catch(error => console.error('Ошибка:', error))
        console.log(cards);
        }
        function rotation(i) {
          decks[i].style.animationName = 'card_animation'
          setTimeout(() => {
            decks[i].style.backgroundImage = `url(${cards[i].image})`
          }, 1300);
        }
          