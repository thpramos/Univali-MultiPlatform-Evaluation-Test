require 'spec_helper'

desired_caps = {
  caps: {
    platformName: "Android",
    platformVersion: "9",
    deviceName: "231365b007047ece",
    app: "/Users/thiagoramos/code/univali/apps/app-debug-react.apk",
    automationName: "UiAutomator2"
  },
  appium_lib: {
    sauce_username:   ENV['SAUCE_LABS'] ? ENV['SAUCE_USERNAME'] : nil,
    sauce_access_key: ENV['SAUCE_LABS'] ? ENV['SAUCE_ACCESS_KEY'] : nil,
    wait: 60
  }
}

describe 'Basic React interactions' do

  before(:all) do
    @driver = Appium::Driver.new(desired_caps, false).start_driver
  end

  after(:all) do
    @driver.quit
  end

  it 'should send keys to search box and then check the value' do

    allow = @driver.find_element :id, "com.android.packageinstaller:id/permission_allow_button"
    allow.click

    fab = @driver.find_element :xpath, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]"
    fab.click


    row0 = @driver.find_element :xpath, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]"
    row0.click();

    sleep 3

    expect("Hello world!").to eql 'Hello world!'

  end


end
