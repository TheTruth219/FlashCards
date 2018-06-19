const express = require('express');
const router = express.Router();

const { data }= require('../data/flashcardData.json');
const { cards } = data;

router.get("/", (req, res) => {

  const numberOfCards = cards.length;
  const id = Math.floor(Math.random()*numberOfCards);

    res.redirect(`/cards/${id}`);

  });
router.get("/:id", (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const name = req.cookies.username
    if (!side) {
      return res.redirect(`/cards/${id}?side=question`)
    }
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { text, id, side, name };

    if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
    }else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';

    }
    if (name){
      res.render('card', templateData);
    }else{
      res.redirect('/hello');
    };

});




module.exports = router;
