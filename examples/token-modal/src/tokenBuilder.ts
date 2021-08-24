// ModalComponents
// Components that are designed to be rendered within the modal
import tokenImage from './img/button.svg';

export const tokenBuilder = (data:any, index:number) => {
  debugger;
  return `
      <div class="token">
        <div class="content">
          <svg class="emblem" src=${tokenImage} />
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



export default tokenBuilder;