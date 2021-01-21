window.addEventListener('DOMContentLoaded', function onDomLoaded() {
  var $form = document.getElementById("sub-form");
  var $email = document.getElementById("email-input");
  var $getUpdates = document.getElementById("get-updates");
  var $submitBtn = document.getElementById("submit-btn");
  var $successMsg = document.getElementById("success-msg");
  var $successMsgCount = document.getElementById("count");
  var $errorMsg = document.getElementById("error-msg");

  function onFormSubmit(e) {
    e.preventDefault();
    var email = $email.value;
    var getUpdates = $getUpdates.checked;

    if (!email) return;

    $submitBtn.setAttribute("disabled", "true");
    fetch("/sub", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, getUpdates})
    }).then(function (response) {
      return response.json()
    })
      .then(function (json) {
        $submitBtn.removeAttribute("disabled");
        $form.parentNode.removeChild($form);
        if (json.ok) {
          $successMsg.classList.remove('hidden');
          $successMsgCount.innerHTML = $successMsgCount.innerHTML.replace(/{count}/, json.count);
        } else {
          $errorMsg.innerHTML = `<p>${json.message}</p>`
          $errorMsg.classList.remove('hidden');
        }
      });
  }

  $form.addEventListener('submit', onFormSubmit);
});