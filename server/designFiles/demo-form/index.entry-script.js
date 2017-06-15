
function main() {
  $('#verify-button').click(function() {
    $.post({
      url: 'https://apineo.llsapp.com/api/v1/invitations/users/auth_codes',
      mobile: $('#input-1').val(),
    }).catch(() => {
      alert(111);
    });
  });
}

main();
// const checkedIds = ['submit-button', 'verify-button'];
