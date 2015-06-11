email						to : '/receiveEmail.groovy'

jabber	chat,	 			to : '/receiveJabberMessage.groovy'
jabber 	presence,			to : '/receiveJabberPresence.groovy'
jabber	subscription, 		to : '/receiveJabberSubscription.groovy'

get 	'/favicon.ico',		redirect : '/assets/favicon.png'
get     '/',				redirect : '/index'
get     '/index',			forward  : '/index.groovy'
get 	'/info',			forward  : '/info.groovy'
get		'/ping',			forward  : '/ping.groovy'
get		'/forbidden',		forward  : '/forbidden.groovy'
all 	'/_ah/warmup',		forward  : '/ping.groovy'

// cron
get 	'/cron/dailyBackup',	forward : '/cron/dailyBackup.groovy'

// session
get  	'/sessions/properties',	forward : '/io/vteial/wyd/web/session/properties.groovy'
post 	'/sessions/login',     	forward : '/io/vteial/wyd/web/session/login.groovy'
get  	'/sessions/logout',    	forward : '/io/vteial/wyd/web/session/logout.groovy'


