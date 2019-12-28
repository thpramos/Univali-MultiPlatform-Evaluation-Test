
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System;
using Android.OS;
using Android.Support.V7.App;
using Android.Support.V7.Widget;
using Android.Views;
using Android.Widget;
using V7Toolbar = Android.Support.V7.Widget.Toolbar;
using Android.Support.Design.Widget;
using Android.App;
using RestSharp;
using Android.Graphics;
using System.Net;
using Newtonsoft.Json;
using Android.Util;
using Newtonsoft.Json.Linq;

namespace UnivaliTCC2
{
    [Activity(Label = "", Theme = "@style/Theme.AppCompat.Light.NoActionBar")]
    public class DetailActivity : AppCompatActivity
    {

        TextView TxtRating;
        LinearLayout LLRating;

        protected override void OnCreate(Bundle savedInstanceState)
        {


            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.Detail);

            TxtRating = FindViewById<TextView>(Resource.Id.txt_rating);
            LLRating = FindViewById<LinearLayout>(Resource.Id.llrating);

            var toolbar = FindViewById<V7Toolbar>(Resource.Id.toolbar);
            var toolbarBottom = FindViewById<V7Toolbar>(Resource.Id.toolbarBottom);

            toolbarBottom.Title = MainActivity.SelectedPlace.Name;;
            toolbarBottom.Subtitle = MainActivity.SelectedPlace.Distance.ToString()+"m";

            SetSupportActionBar(toolbar);
            SupportActionBar.SetDisplayHomeAsUpEnabled(true);
            //SupportActionBar.SetDisplayShowTitleEnabled(true);



            loadBackdrop();
            getDetails();

            //TextView nameTV = FindViewById<TextView>(Resource.Id.txt_name);
            //nameTV.Text = MainActivity.SelectedPlace.Name;
            // Create your application here
        
        
        }


        public void getDetails()
        {
            var startGet = DateTime.Now;

            var searchUrl = "https://maps.googleapis.com/maps/api/place/";

            var client = new RestClient(searchUrl);

            Console.WriteLine("BLAAH");
            var request = new RestRequest("details/json", Method.GET);
            request.AddParameter("placeid", MainActivity.SelectedPlace.PlaceId ); // adds to POST or URL querystring based on Method
            request.AddParameter("fields", "website,rating,price_level,formatted_phone_number"); // adds to POST or URL querystring based on Method
            request.AddParameter("language", "pt"); // adds to POST or URL querystring based on Method
            request.AddParameter("key", "AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk"); // adds to POST or URL querystring based on Method

            // easy async support
            client.ExecuteAsync(request, response =>
            {
                var endGet = DateTime.Now;
                Log.Debug("TESTXAMARIN", "&TEST&GET_DETAILS&" + (endGet - startGet).TotalMilliseconds);
                var startPrep = DateTime.Now;


                Dictionary<string, object> responseJson = JsonConvert.DeserializeObject<Dictionary<string, object>>(response.Content);

                var result = (JContainer)responseJson["result"];



                RunOnUiThread(() => {
                    try { TxtRating.Text = "Avaliação " + (string)result["rating"] + " de 5"; LLRating.Visibility = ViewStates.Visible; } catch (Exception) { }
                    //try { TxtPrice.Text = "Avaliação " + result['rating'] + " de 5"; TxtRating.Visibility = ViewStates.Visible; } catch (Exception) { }
                    //try { TxtRating.Text = "Avaliação " + result['rating'] + " de 5"; TxtRating.Visibility = ViewStates.Visible; } catch (Exception) { }

                    //PlacesAdapter.NotifyDataSetChanged();
                    Console.WriteLine(response.Content);
                    var endPrep = DateTime.Now;
                    Log.Debug("TESTXAMARIN", "&TEST&DATA_PREP_DETAIL&" + (endPrep - startPrep).TotalMilliseconds);

                });

            });

        }


        public override bool OnOptionsItemSelected (IMenuItem item) 
        {
            switch (item.ItemId) {
            case Android.Resource.Id.Home:
                Finish ();
                return true;
            }
            return base.OnOptionsItemSelected (item);
        }

        void loadBackdrop() 
        {
            if (MainActivity.SelectedPlace.PhotoRef == null) { return; }
            var imageView = FindViewById<ImageView> (Resource.Id.backdrop);

            var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + MainActivity.SelectedPlace.PhotoRef + "&key=AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk";

            var imageBitmap = GetImageBitmapFromUrl(photoRef);

            imageView.SetImageBitmap(imageBitmap);
        }
            



        private Bitmap GetImageBitmapFromUrl(string url)
        {
            Bitmap imageBitmap = null;

            using (var webClient = new WebClient())
            {
                var imageBytes = webClient.DownloadData(url);
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    imageBitmap = BitmapFactory.DecodeByteArray(imageBytes, 0, imageBytes.Length);
                }
            }

            return imageBitmap;
        }
    }
}
