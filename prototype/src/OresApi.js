import Request from 'superagent';

export const OresApi = {
	getAll: function(cb){
		Request
			.get("https://ores.wikimedia.org/v3/scores/enwiki/?models=damaging&model_info=statistics.thresholds.true")			
			.then( res => {	
				cb(res.body)
			})
			.catch(err => {
				// err.message, err.response
			});
	}
}