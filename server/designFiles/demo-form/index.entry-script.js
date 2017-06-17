
function main() {
  $('#verify-button').click(function() {
    $.post({
      url: 'http://localhost:3333/',
      mobile: $('#input-1').val(),
    }).catch(() => {
      alert(111);
    });
  });
}

main();
// const checkedIds = ['submit-button', 'verify-button'];
