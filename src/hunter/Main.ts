import MyApplication from './MyApplication';
import AssetsConfigs from './AssetsConfigs';
import BaseApplicationContext from './BaseApplicationContext';
class Main {
	constructor() {
		let i: AssetsConfigs = new AssetsConfigs();
		MyApplication.instance.start(new rigger.RiggerHandler(this, onAppStart), {"entrance": BaseApplicationContext});
		function onAppStart() {
			console.log("all service started");
		}
	}
}
//激活启动类
new Main();
