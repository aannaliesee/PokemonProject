// Get the header and footer templates
fetch('templates/header.html')
      .then(response => response.text())
      .then(html => document.querySelector('header').innerHTML = html);

    fetch('templates/footer.html')
      .then(response => response.text())
      .then(html => document.querySelector('footer').innerHTML = html);