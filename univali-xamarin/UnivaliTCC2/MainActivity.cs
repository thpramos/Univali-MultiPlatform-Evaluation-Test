using Android.App;
using Android.Widget;
using Android.OS;
using RestSharp;
using System;
using Refractored.Fab;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Android.Util;
using Android.Gms.Location;
using Android.Support.V4.Content;
using Android;
using Android.Content.PM;
using Android.Views;
using static Android.Views.View;
using Android.Content;
using Android.Gms.Tasks;
using Android.Locations;
using System.Globalization;

namespace UnivaliTCC2
{
    [Activity(Label = "O que há por perto?", MainLauncher = true, Icon = "@android:color/transparent", Theme = "@style/Theme.AppCompat.Light.NoActionBar")]
    public class MainActivity : Activity
    {


        protected const int RequestPermissionsRequestCode = 34;

        /**
         * Provides the entry point to the Fused Location Provider API.
         */
        private FusedLocationProviderClient mFusedLocationClient;

        /**
         * Represents a geographical location.
         */
        public Location mLastLocation;



        public string Tag = typeof(MainActivity).Name;






        ListView ListView = null;
        public static List<Place> Places = new List<Place>();


        public static Place SelectedPlace;

        int count = 1;
        private PlacesAdapter PlacesAdapter;

        public float MyLat = 48.5187f;
        public float MyLng = 27.5986f;


        public DateTime StartGetLocation;


        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);


            ListView = FindViewById<ListView>(Resource.Id.listView1);
            var fab = FindViewById<FloatingActionButton>(Resource.Id.fab);


            fab.Click += delegate 
            {
                StartGetLocation = DateTime.Now;
                GetLastLocation(); 
            };


            mFusedLocationClient = LocationServices.GetFusedLocationProviderClient(this);

            //getList("48.5187", "27.5986");

            PlacesAdapter = new PlacesAdapter(this,Places);
            ListView.TextFilterEnabled = true;
            ListView.Adapter = PlacesAdapter;

            ListView.ItemClick += delegate (object sender, AdapterView.ItemClickEventArgs args)
            {
                SelectedPlace = Places[args.Position];
                StartActivity(typeof(DetailActivity));

            };





        }


        protected override void OnStart()
        {
            base.OnStart();

            if (!CheckPermissions())
            {
                RequestPermissions();
            }
            else
            {
                //GetLastLocation();
            }
        }


        private bool CheckPermissions()
        {
            var permissionState = ContextCompat.CheckSelfPermission(this, Manifest.Permission.AccessCoarseLocation);
            return permissionState == (int)Permission.Granted;
        }

        public void StartLocationPermissionRequest()
        {
            this.RequestPermissions(new[] { Manifest.Permission.AccessCoarseLocation }, RequestPermissionsRequestCode);
        }



        private void RequestPermissions()
        {

               Log.Info(Tag, "Requesting permission");
               StartLocationPermissionRequest();

        }





        private void GetLastLocation()
        {
            mFusedLocationClient.LastLocation.AddOnCompleteListener(new OnCompleteListener { Activity = this });
        }

        public float rad(float x)
        {
            return (float)(x * Math.PI / 180f);
        }



        public float GetDistance(float lat1, float lng1, float lat2, float lng2)
        {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = this.rad(lat2 - lat1);
            var dLong = this.rad(lng2 - lng1);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
              Math.Cos(this.rad(lat1)) * Math.Cos(this.rad(lat2)) *
              Math.Sin(dLong / 2) * Math.Sin(dLong / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var d = R * c;
            return (float)d; // returns the distance in meter
        }




        public void getList(string latitude, string longitude)
        {
            var startGet = DateTime.Now;


            var searchUrl = "https://maps.googleapis.com/maps/api/place/";

            var client = new RestClient(searchUrl);
            var request = new RestRequest("nearbysearch/json", Method.GET);
            request.AddParameter("location", (latitude + "," + longitude)); // adds to POST or URL querystring based on Method
            request.AddParameter("radius", "50000"); // adds to POST or URL querystring based on Method
            request.AddParameter("key", "AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk"); // adds to POST or URL querystring based on Method


            // easy async support
            client.ExecuteAsync(request, response =>
            {
                var endGet = DateTime.Now;
                Log.Debug("TESTXAMARIN", "&TEST&GET_LIST&" + (endGet - startGet).TotalMilliseconds);
                var startPrep = DateTime.Now;

                Places.Clear();
                Dictionary<string, object> responseJson = JsonConvert.DeserializeObject<Dictionary<string, object>>(response.Content);

                foreach (var result in (JContainer)responseJson["results"])
                {
                    Place place = new Place((JContainer)result);
                    place.Distance = (int) GetDistance(place.Lat, place.Lng, MyLat, MyLng);
                    Places.Add(place);
                    var geometry = result["geometry"]["location"]["lat"];
                }

                var endPrep = DateTime.Now;
                Log.Debug("TESTXAMARIN", "&TEST&DATA_PREP_LIST&" + (endPrep - startPrep).TotalMilliseconds);

                RunOnUiThread(() => { 
                    PlacesAdapter.NotifyDataSetChanged();

                });

            });

        }

    }

    public class OnCompleteListener : Java.Lang.Object, IOnCompleteListener
    {
        public MainActivity Activity { get; set; }
        bool firstTime = true;

        public void OnComplete(Task task)
        {
            if (task.IsSuccessful && task.Result != null)
            {
                Activity.mLastLocation = (Location)task.Result;

                Activity.MyLat = (float)Activity.mLastLocation.Latitude;
                Activity.MyLng = (float)Activity.mLastLocation.Longitude;

                var getlocationEnd = DateTime.Now;

                Log.Debug("TESTXAMARIN", "&TEST&GET_LOCATION&" + (getlocationEnd - Activity.StartGetLocation).TotalMilliseconds);

                NumberFormatInfo nfi = new NumberFormatInfo();
                nfi.NumberDecimalSeparator = ".";

                //if (firstTime)
                //{
                //    firstTime = false;
                //    return;
                //}
                Activity.getList(Activity.MyLat.ToString(nfi), Activity.MyLng.ToString(nfi));

            }
            else
            {
                Log.Warn(Activity.Tag, "getLastLocation:exception", task.Exception);
            }
        }
    }

}

