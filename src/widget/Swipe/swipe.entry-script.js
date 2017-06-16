import Swipe from 'swipejs';

// TODO: should support __IS_NODE__ ?
$('[data-swipe-options]').each(function () {
  const swipeOptionsJSON = $(this).attr('data-swipe-options');
  let options = {};
  try {
    options = JSON.parse(swipeOptionsJSON);
  } catch (e) {
    console.error(e);
  }

  new Swipe(this, options); // eslint-disable-line no-new
});

