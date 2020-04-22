# VDM Wrapper

VDM Wrapper able you to retrieve data from VDM, spicy or classic.

## Install

Install it with npm : npm i vdm-wrapper

Or with yarn : yarn add vdm-wrapper

## Exemples
```js
const vdm = require('vdm-wrapper')

await vdm.fetchPage(50, true) // Retrieve data from page 50, only spicy

await vdm.fetchPages(50, false) // Retrieve the first 50 pages, spicy and classic

await vdm.fetchAllPages(false) // Retrive all the pages spicy and classic

(async ()=>{
	for await (const page of vdm.fetchAllPagesGenerator()) { // Retrieve all the pages with a generator, spicy and classic
		console.log(page)
	}
})()

```

## Documentation

```js
class Client {
	
	static async fetchPage(page_number, spicy=false) // Data from one page
	static async fetchPages(count, spicy=false) // Data from x pages
	static async fetchAllPages(spicy=false) // Data from all pages
	static async *fetchAllPagesGenerator(spicy=false) // Data from all pages but with a generator
}
```