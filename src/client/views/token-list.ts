import { AbstractView } from './view-interface'
import { IconView } from './icon-view'
import { logger } from '../../utils'
import {ethers} from "ethers";

export interface TokenListItemInterface {
	tokenIssuerKey: string
	title: string
	index: string
	image: string
	data: any
	fungible: boolean
	decimals?: number
	balance?: string
	symbol?: string
	toggleState: boolean
	hideToggle?: boolean
}

export class TokenList extends AbstractView {
	loadedCount = 0
	numberToLoad = 25
	autoLoadMore = true // TODO: Expose as option?
	interceptObs: IntersectionObserver | undefined

	init() {
		this.viewContainer.addEventListener('click', (e: any) => {
			if (e.target.classList.contains('mobileToggle-tn')) {
				this.tokenToggleSelection()
			} else if (e.target.classList.contains('load-more-btn-tn')) {
				this.loadMoreTokens()
			}
		})
	}

	render(): void {
		this.loadedCount = 0

		this.viewContainer.innerHTML = this.getTokenListItems()

		this.renderIcons()

		if (this.autoLoadMore) {
			let loadMoreElem = this.viewContainer.querySelector('.load-more-tn')

			if (loadMoreElem) {
				if (!this.interceptObs)
					this.interceptObs = new IntersectionObserver(
						(payload) => {
							if (payload[0].isIntersecting) {
								this.loadMoreTokens()
							}
						},
						{ root: this.viewContainer.querySelector('.view-content-tn') },
					)

				this.interceptObs.observe(loadMoreElem)
			}
		}
	}

	getTokenListItems() {
		let html = ''

		let newCount = Math.min(this.loadedCount + this.numberToLoad, this.params.tokens.length)

		for (let i: number = this.loadedCount; i < newCount; i++) {
			html += this.createTokenMarkup(this.params.tokens[i])
		}

		this.loadedCount = newCount

		if (this.loadedCount < this.params.tokens.length) html += this.createLoadMoreMarkup()

		return html
	}

	loadMoreTokens() {
		let loadMoreElem = this.viewContainer.getElementsByClassName('load-more-tn')[0]

		if (this.interceptObs) this.interceptObs.unobserve(loadMoreElem)

		// This is required because updating innerHTML resets the DOM state for previously added elements
		// i.e. tokens that have been selected appear as unselected
		loadMoreElem.insertAdjacentHTML('afterend', this.getTokenListItems())
		loadMoreElem.remove()

		this.renderIcons()

		if (this.interceptObs) {
			loadMoreElem = this.viewContainer.querySelector('.load-more-tn')
			if (loadMoreElem) this.interceptObs.observe(loadMoreElem)
		}
	}

	private renderIcons() {
		for (let elem of this.viewContainer.getElementsByClassName('img-container-tn')) {
			// ignore already rendered icons
			if (elem.querySelector('img')) continue

			let params = {
				src: elem.getAttribute('data-image-src'),
				title: elem.getAttribute('data-token-title'),
			}

			new IconView(elem, params).render()
		}
	}

	// TODO: probably don't need to iterate all inputs.
	tokenToggleSelection() {
		let selectedTokens = this.client.getTokenStore().getSelectedTokens()

		this.viewContainer.querySelectorAll('.mobileToggle-tn').forEach((token: any, index: number) => {
			if (index === 0) {
				selectedTokens[token.dataset.key] = {}
				selectedTokens[token.dataset.key]['tokens'] = []
			}

			if (token.checked === true) {
				let output = JSON.parse(token.dataset.token)

				selectedTokens[token.dataset.key].tokens.push(output)
			}
		})

		logger(2, 'Tokens selected:')
		logger(2, selectedTokens)

		this.client.updateSelectedTokens(selectedTokens)
	}

	createLoadMoreMarkup() {
		return `
            <li class='load-more-tn'>
                <button class="load-more-btn-tn btn-tn">Load More</button>
            </li>
        `
	}

	createTokenMarkup(config: TokenListItemInterface) {
		const { tokenIssuerKey, title, data, index, image, toggleState, hideToggle, balance, fungible, decimals, symbol} = config

		let detail, abrieviated;

		if (!fungible){
			detail = index
			abrieviated = '#' + (index.length > 15 ? index.substring(0, 5) + '...' + index.substring(index.length - 5, index.length) : index)
		} else {
			const balanceTxt = ethers.utils.formatUnits(balance, decimals);

			detail = balanceTxt + " " + symbol;
			abrieviated = (balanceTxt.length > 15 ? balanceTxt.substring(0, 12) + "... " : balanceTxt) + " " + symbol;
		}

		const isChecked = toggleState ? 'checked' : ''

		return (
			`
            <li class='token-tn'>
              <div class="img-container-tn image-tn shimmer-tn" data-image-src="${image ?? ''}" data-token-title="${title}"></div>
              <div class='data-tn'>
                  <p class='token-title-tn'>${title}</p>
                  <p class='detail-tn' title="${detail}">
                  	${abrieviated}
				  </p>
                </div>` +
			(hideToggle
				? ''
				: `<div class='toggle-tn'>
                <input ${isChecked} data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}'
				data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
                <label for='toggle${index}'></label>
              </div>`) +
			`</li>
        `
		)
	}
}
