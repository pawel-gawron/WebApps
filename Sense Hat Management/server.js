class server {
	constructor(ip){
		this.protocol = 'http://';
		this.ip = ip + '/';
		this.script = 'Lab_09/temperature_pressure.php?k='; // 'cgi-bin/server/test_signal.py'
		this.signalValue = 0;
	}
	async getTestSignal(sampleNumber) {
    
		await $.get(this.protocol + this.ip + this.script + sampleNumber,  
			(response) => { this.signalValue = response}
		)
		return this.signalValue;
	}
}