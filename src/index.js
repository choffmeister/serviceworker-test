import axios from 'axios';

const message = document.createElement('div');
message.innerHTML = '';
window.setInterval(async () => {
  const res = await axios.get('/version.txt')
  message.innerText = res.data;
}, 1000)
document.body.appendChild(message);

const update = document.createElement('a')
update.href = '#'
update.innerText = 'Update';
update.style.display = 'none',
  document.body.appendChild(update);

if ('serviceWorker' in navigator) {
  function showUpdate(sw) {
    update.style.display = 'block';
    update.onclick = event => {
      event.preventDefault()
      sw.addEventListener('statechange', () => {
        if (sw.state == 'activated') {
          window.location.reload()
        }
      })
      sw.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(swr => {
      console.log('Service worker registration succeeded')
      window.setInterval(() => {
        if (swr.waiting) {
          showUpdate(swr.waiting)
        }
      }, 1000)
      window.setInterval(() => {
        swr.update().catch(err => {
          console.error('Service worker update failed', err)
        })
      }, 5000)
    }).catch(err => {
      console.error('Service worker registration failed', err);
    });
  })
}
