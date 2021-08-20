// import '@alphawallet/token-negotiator';

const mockTokens = [
  { ticketClass: 'a', ticketId: 'b', devconId: 'c' },
  { ticketClass: 'd', ticketId: 'e', devconId: 'f' },
  { ticketClass: 'g', ticketId: 'h', devconId: 'i' },
  { ticketClass: 'i', ticketId: 'j', devconId: 'k' },
  { ticketClass: 'l', ticketId: 'm', devconId: 'n' },
];

const tokenContainer = document.querySelector('.dvn-tk-outlt .token-container');

// negotiate event recieved.
function negotiate() {
  // mockTokens
  if(mockTokens.length) {
    tokenContainer.innerHTML = mockTokens.map((tokenData, index) => {
      return tokenTemplate(tokenData, index);
    }).join('');
  } else {
    tokenContainer.innerHTML = '<p style="padding: 0 18px">No tokens available.</p>';
  }
}

negotiate();

function tokenTemplate (tokenData, index) {
  return `
    <div class="token">
      <div class="content">
        <img src="./img/button.svg" class="emblem"></img>
        <div class="data">
          <p class="title">Devcon Ticket #${index+1}</p>
          <p class="detail">Discount for Hotels and VIP Section</p>
        </div>
      </div>
      <div class="toggle">
        <input type="checkbox" name="toggle${index+1}" class="mobileToggle" id="toggle${index+1}">
        <label for="toggle${index+1}"></label>
      </div>
    </div>
  `;
}
