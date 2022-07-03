

export class IconView {

	viewContainer: any;
	params: any = {};

	constructor(viewContainer: any, params: any) {
		this.viewContainer = viewContainer;
		this.params = params;
	}


	render(): void {

		let src = this.params.src;
		let image;

		if (src && src !== "undefined"){

			// Create image elements and add onload/onerror events
			image = document.createElement('img');
			image.loading = "lazy";
			image.addEventListener('load', (e: Event)=>{
				this.onLoad(e);
			});
			image.addEventListener('error', (e: Event)=>{
				this.onError(e);
			});
			image.src = src;

		} else {
			image = this.createAvatar();
			this.viewContainer.classList.remove('shimmer-tn');
		}

		this.viewContainer.appendChild(image);

	}

	onLoad(_e: Event){
		this.viewContainer.classList.remove('shimmer-tn');
	}

	onError(_e: Event){
		this.viewContainer.innerHTML = "";
		this.viewContainer.appendChild(this.createAvatar());
		this.viewContainer.classList.remove('shimmer-tn');
	}

	private createAvatar(){
		let image = document.createElement('img');

		image.src = this.generateAvatar(this.params.title);

		return image;
	}

	private generateAvatar(text: string) {

		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		canvas.width = 200;
		canvas.height = 200;

		if (!context)
			return "";

		context.fillStyle = this.getRandomBackgroundColor();
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.font = "bold 100px 'Arial', sans-serif";
		context.fillStyle = "#fff";
		context.textAlign = "center";
		context.textBaseline = "middle";

		let words = text.split(" ");
		let initials = "";

		for (let i=0; initials.length < 2 && i < words.length; i++){
			let chars = words[i].split('');
			if (chars.length)
				initials += chars[0].toUpperCase();
		}

		context.fillText(initials, canvas.width / 2, canvas.height / 2);

		return canvas.toDataURL("image/png");
	}

	private getRandomBackgroundColor(){
		return "#0029a7";
	}
}