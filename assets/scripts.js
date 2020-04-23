Vue.component('heading', {
	template: '#heading-template',
	props: ['sections', 'settings'],
	data: function() {
		return {
			nav: this.$root.navigation
		};
	}
});

Vue.component('text-box', {
	template: '#text-box-template',
	props: ['settings'],
	data: function() {
		return {
			text: ''
		};
	}
});

Vue.component('one-col', {
	template: '#one-col-template',
	props: ['sections', 'settings'],
	data: function() {
		return {
		};
	}
});

Vue.component('two-col', {
	template: '#two-col-template',
	props: ['sections', 'settings'],
	data: function() {
		return {
		};
	}
});

Vue.component('container', {
	template: '#container-template',
	props: ['sections', 'settings'],
	data: function() {
		return {
		};
	}
});

new Vue({
	el: '#root',
	data: {
		settings: {
			sitename: 'haulcms',
			baseurl: 'cms.haulnet.xyz',
			enableHighlight: true,
		},
		navigation: [
			{
				name: 'home',
				label: 'Home',
				order: 0,
				href: '/'
			},
			{
				name: 'services',
				label: 'Services',
				order: 1,
				href: '/services'
			},
			{
				name: 'haulnet',
				label: 'Haulnet',
				order: 2,
				href: 'https://haulnet.xyz/',
				isExternal: true,
			}
		],
		widgets: [],
		schemas: {
			'heading' : {
				label: 'Heading',
				group: 'panel'
			},
			'container' : {
				label: 'Container',
				group: 'panel',
				sections: ['content']
			},
			'one-col' : {
				label: 'One Column',
				group: 'panel',
				sections: ['content']
			},
			'two-col' : {
				label: 'Two Column',
				group: 'panel',
				sections: ['left', 'right']
			},
			'text-box' : {
				label: 'Text Box',
				group: 'Text',
				fields: ['text']
			}
		}
	},
	created: function() {
		console.log('[&] CMS LOADING...');
	},
	mounted: function() {
		console.log('[~] CMS LOADED.');

		this.loadWidgets();
	},
	methods: {
		loadWidgets: function() {
			this.widgets.push(this.createWidget({ name: 'heading' }));
			this.widgets.push(this.createWidget({
				name: 'one-col', sections: {
					content: [
						this.createWidget({
							name: 'two-col',
							sections: {
								left: [
									this.createWidget({
										name: 'text-box',
										settings: { text: 'this is my text!' }
									})
								],
								right: [
									this.createWidget({
										name: 'text-box',
										settings: { text: 'this is my text!' }
									})
								]
							}
						})
					]
				}
			}));
		},
		createWidget: function(data) {
			let ws = this.schemas[data.name];
			return {
				name: data.name,
				label: ws.label,
				group: ws.group || 'Custom',
				settings: data.settings || {},
				sections: data.sections || {},
			};
		}
	}
});
