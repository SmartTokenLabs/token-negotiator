// Client Components
// Components designed to be dispatched for the client to render.

class ClientComponents {

  components: { button: string; };

  constructor() {
    this.components = {
      button: `
        <button
          onclick="negotiator.tokenButtonHandler()"
          style="height:80px; width:80px; border: 0; background-image: url('${document.location.href}/img/button.svg'); box-shadow: 0 2px 5px 0 #676767; border-radius: 64px; cursor: pointer; z-index: 999; position: relative;">
        </button>
      `,
    }
  }

  get button() {
    return this.components.button;
  }

}

export default ClientComponents;