using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.Lang;

namespace UnivaliTCC2
{

    public class ViewHolder:Java.Lang.Object
    {
        public TextView textView { get; set; }
        public TextView distance { get; set; }
    }

    public class PlacesAdapter : BaseAdapter
    {
        private Context context;
        public List<Place> data;

        public PlacesAdapter(Context context, List<Place> places){
            this.data = places;
            this.context = context;
        }

        public override int Count{
            get
            {
                return data.Count;
            }
        }
        
        public PlacesAdapter()
        {
        }


        public override Java.Lang.Object GetItem(int position)
        {
            return position;
        }

        public override long GetItemId(int position)
        {
            return position;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            ViewHolder viewHolder;
            if(convertView == null)
            {
                convertView = LayoutInflater.From(context).Inflate(Resource.Layout.list_item, parent,false);
                viewHolder = new ViewHolder();
                viewHolder.textView = convertView.FindViewById<TextView>(Resource.Id.txt_name);
                viewHolder.distance = convertView.FindViewById<TextView>(Resource.Id.txt_distance);
                convertView.Tag = viewHolder;

            }else
            {
                viewHolder = (ViewHolder)convertView.Tag;
            }
            var name = data[position].Name;
            viewHolder.textView.Text = name;
            viewHolder.distance.Text = data[position].Distance.ToString() + "m";
            return convertView;
        } 
    }
}
