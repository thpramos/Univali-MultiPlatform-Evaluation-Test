const wdio = require("webdriverio");
const mocha = require("mocha");
const chai = require('chai');
const assert = require('chai').assert;


// javascript
const opts = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "8.0",
    deviceName: "Android Emulator",
    app: "~/Downloads/ApiDemos-debug.apk",
    automationName: "UiAutomator2"
  }
};


describe('Create Android session', function () {
    let client;

	before(async function () {
    	client = wdio.remote(opts);
    	const field = await client.$("~TextField1");
		await field.setValue("Hello World!");
		const value = await field.getValue();
  	});


	
	assert.equal(value,"Hello World!");

});


 Recorder
let el4 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.widget.Button");
el4.click();
let el5 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]/android.view.View/android.view.View[2]/android.view.View");
el5.click();
let el6 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.widget.Button");
el6.click();




// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const wdio = require('webdriverio');
const caps = {"deviceName":"231365b007047ece","platformName":"Android","platformVersion":"9","app":"/Users/thiagoramos/Dropbox/app-debug-ionic.apk","automationName":"UiAutomator2"};
const driver = wdio.remote({
  protocol: "http",
  host: "localhost",
  port: 4723,
  path: "/wd/hub",
  desiredCapabilities: caps
});

driver.init()
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.widget.Button")
  .click()
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]/android.view.View/android.view.View[2]/android.view.View")
  .click()
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.widget.Button")
  .click()
  .end();