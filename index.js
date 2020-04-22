const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
module.exports = class Client {
	static async fetchPage(number, spicy=false) {
		let url;
		if(spicy) {
			url = `https://www.viedemerde.fr/epicees?page=${number}`
		} else {
			url = `https://www.viedemerde.fr/?page=${number}`
		}
		const data = await axios.get(url)
		const regex = /<a class="article.+\n.+\n(.*)\n<\/a>/g
		const $ = cheerio.load(data.data)
		const d = []
		const articles = $('.article-link').each((i, article)=>{
			d.push(article.children[article.children.length-1].data)
		})
		return d.map(v=>v.replace('\n','').replace('\n',''))
	}
	static async fetchPages(count, spicy=false) {
		const d = []
		for(let i = 1;i<count;i++) {
			const data = await Client.fetchPage(i, spicy)
			d.push(...data)
		}
		return d
	}
	static async fetchAllPages(spicy=false, data=[], i=1) {
		const d = await Client.fetchPage(i, spicy)
		if(d.length === 0) {
			return data
		} else {
			return Client.fetchAllPages(spicy, [...data, ...d], i+1)
		}
	}
	static async *fetchAllPagesGenerator(spicy=false) {
		let i = 0
		while(true) {
			i++
			const d = await Client.fetchPage(i, spicy)
			if(d.length === 0) break;
			yield d
		}
	}
}
