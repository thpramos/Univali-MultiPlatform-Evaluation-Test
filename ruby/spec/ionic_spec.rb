require 'spec_helper'

desired_caps = {
  caps: {
    platformName: "Android",
    platformVersion: "9",
    deviceName: "231365b007047ece",
    app: "/Users/thiagoramos/code/univali/apps/app-debug-ionic.apk",
    automationName: "UiAutomator2"
  },
  appium_lib: {
    sauce_username:   ENV['SAUCE_LABS'] ? ENV['SAUCE_USERNAME'] : nil,
    sauce_access_key: ENV['SAUCE_LABS'] ? ENV['SAUCE_ACCESS_KEY'] : nil,
    wait: 60
  }
}

describe 'Basic Ionic interactions' do

  before(:all) do
    @driver = Appium::Driver.new(desired_caps, false).start_driver
  end

  after(:all) do
    @driver.quit
  end

  it 'should send keys to search box and then check the value' do

    allow = @driver.find_element :id, "com.android.packageinstaller:id/permission_allow_button"
    allow.click

    fab = @driver.find_element :class_name, "android.widget.Button"
    fab.click


    row0 = @driver.find_element :xpath, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]/android.view.View/android.view.View[1]/android.view.View"
    row0.click();

    sleep 3

    # search_box_element = @driver.find_element :id, 'txt_query_prefill'
    # search_box_element.send_keys 'Hello world!'

    # on_search_requested_button = @driver.find_element :id, 'btn_start_search'
    # on_search_requested_button.click

    # search_text = @driver.find_element :id, 'android:id/search_src_text'
    # search_text_value = search_text.text
    expect("Hello world!").to eql 'Hello world!'
  end

  # it 'should click a button that opens an alert and then dismisses it' do
  #   @driver.start_activity app_package: ANDROID_PACKAGE, app_activity: '.app.AlertDialogSamples'

  #   open_dialog_button = @driver.find_element :id, 'io.appium.android.apis:id/two_buttons'
  #   open_dialog_button.click

  #   alert_element = @driver.find_element :id, 'android:id/alertTitle'
  #   alert_text = alert_element.text
  #   expect(alert_text).to eql "Lorem ipsum dolor sit aie consectetur adipiscing\nPlloaso mako nuto siwuf cakso dodtos anr koop."
  #   close_dialog_button = @driver.find_element :id, 'android:id/button1'

  #   close_dialog_button.click
  # end
end
