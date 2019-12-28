using System;
using Newtonsoft.Json.Linq;

namespace UnivaliTCC2
{
    public class Place
    {

        public float Lat;
        public float Lng;
        public string Name;
        public int Distance;
        public string PhotoRef;
        public string Id;
        public string PlaceId;

        public Place()
        {

        }

        public Place(JContainer jsonObj){
            try{
                this.Lat = (float)jsonObj["geometry"]["location"]["lat"];
            }catch (Exception ex){}
            try
            {
                this.Lng = (float)jsonObj["geometry"]["location"]["lng"];
            }catch (Exception ex){}

            try
            {
                this.Name = (string)jsonObj["name"];
            }
            catch (Exception ex) { }

            try
            {
                this.Distance = 0;
            }
            catch (Exception ex) { }

            try
            {
                foreach (var item in jsonObj["photos"])
                {
                    this.PhotoRef = (string)item["photo_reference"];
                    break;
                }
            }
            catch (Exception ex) { }

            try
            {
                this.Id = (string)jsonObj["id"];
            }
            catch (Exception ex) { }

            try
            {
                this.PlaceId = (string)jsonObj["place_id"];
            }
            catch (Exception ex) { }

        }

    }
}
