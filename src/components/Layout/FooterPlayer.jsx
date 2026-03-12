function FooterPlayer() {

return (

<div className="bg-white border-t p-4 flex items-center justify-between">

<div>

<p className="font-semibold">
Now Playing
</p>

<p className="text-gray-500 text-sm">
No song selected
</p>

</div>

<div>

<audio controls />

</div>

</div>

);

}

export default FooterPlayer;